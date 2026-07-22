const SITE_LABEL = 'Bambino Agency';
const FROM_EMAIL = 'Bambino Agency <leads@boomymarketing.com>';
const TO_EMAILS  = ['boomymarketing.com@gmail.com', 'evgeniygalyas@gmail.com'];
const RESEND_URL = 'https://api.resend.com/emails';
const RECAPTCHA_ACTION = 'contact';
const RECAPTCHA_MIN_SCORE = 0.3;
const ALLOWED_ORIGINS = new Set([
  'https://bambinoagency.com',
  'https://www.bambinoagency.com',
]);
const ALLOWED_HOSTNAMES = new Set(['bambinoagency.com', 'www.bambinoagency.com', 'localhost']);
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map();

function isAllowedOrigin(origin) {
  return !origin || ALLOWED_ORIGINS.has(origin);
}

function getClientIp(req) {
  const forwardedFor = req.headers?.['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor) return forwardedFor.split(',')[0].trim();
  return req.headers?.['x-real-ip'] || 'unknown';
}

function isRateLimited(ip, now) {
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const attempts = (requestLog.get(ip) || []).filter((timestamp) => timestamp > cutoff);
  if (attempts.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  attempts.push(now);
  requestLog.set(ip, attempts);
  return false;
}

function looksLikeRandomToken(value) {
  const token = value.trim();
  if (token.length < 14 || /\s/.test(token) || !/^[a-z0-9]+$/i.test(token)) return false;
  let caseChanges = 0;
  for (let index = 1; index < token.length; index += 1) {
    if (/[a-z]/.test(token[index - 1]) && /[A-Z]/.test(token[index])) caseChanges += 1;
  }
  return caseChanges >= 3;
}

function isObviousSpam({ name, email, message }) {
  const emailName = email.split('@')[0] || '';
  const linkCount = (message.match(/(?:https?:\/\/|www\.)\S+/gi) || []).length;
  const gamblingPromo = /(?:mostbet|1xbet|casino|казино|ставк[аи]|букмекер|промокод)/i.test(`${name} ${email} ${message}`);
  const generatedEmailName = looksLikeRandomToken(emailName)
    || (emailName.length >= 12 && /^[a-z0-9]+(?:\.[a-z0-9]+){3,}$/i.test(emailName));
  if (linkCount >= 4 || /<\/?a\b[^>]*>/i.test(message) || (gamblingPromo && linkCount >= 1)) return true;
  return looksLikeRandomToken(name) && generatedEmailName && looksLikeRandomToken(message);
}

function getRecaptchaConfig() {
  const projectId = process.env.RECAPTCHA_PROJECT_ID || '';
  const siteKey = process.env.RECAPTCHA_SITE_KEY || '';
  const apiKey = process.env.RECAPTCHA_API_KEY || '';
  return { enabled: Boolean(projectId && siteKey && apiKey), projectId, siteKey, apiKey };
}

async function verifyRecaptcha(token, ip, userAgent) {
  const { enabled, projectId, siteKey, apiKey } = getRecaptchaConfig();
  if (!enabled) return true;
  if (!token) return false;

  const event = { token, siteKey, expectedAction: RECAPTCHA_ACTION };
  if (ip && ip !== 'unknown') event.userIpAddress = ip;
  if (userAgent) event.userAgent = userAgent;

  try {
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event }),
      },
    );
    if (!response.ok) {
      console.error(`reCAPTCHA verification unavailable: HTTP ${response.status}`);
      return true;
    }
    const result = await response.json();
    const properties = result.tokenProperties || {};
    if (!properties.valid || properties.action !== RECAPTCHA_ACTION) return false;
    if (!ALLOWED_HOSTNAMES.has(properties.hostname)) return false;
    const score = result.riskAnalysis?.score;
    return typeof score !== 'number' || score >= RECAPTCHA_MIN_SCORE;
  } catch (error) {
    console.error('reCAPTCHA verification unavailable:', error.message);
    return true;
  }
}

module.exports = async (req, res) => {
  const origin = req.headers?.origin;
  if (!isAllowedOrigin(origin)) return res.status(403).json({ error: 'Invalid request origin' });
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const pick = (...keys) => { for (const k of keys) { const v = body[k]; if (v != null && String(v).trim() !== '') return String(v).trim(); } return ''; };
  const joinName = (a, b) => [a, b].filter(Boolean).join(' ').trim();

  const name = pick('name', 'full_name', 'fullName')
    || joinName(pick('firstName'), pick('lastName'))
    || joinName(pick('first_name'), pick('last_name'))
    || joinName(pick('fname'), pick('lname'));

  const email   = pick('email');
  const phone   = pick('phone', 'tel');
  const service = pick('service');
  const message = pick('message', 'goals', 'note', 'notes');
  const city    = pick('city', 'location');
  const company = pick('company', 'business', 'companyName');
  const website = pick('website', 'url', 'site');
  const budget  = pick('budget', 'monthly_budget', 'monthlyBudget');
  const source  = pick('source', 'page_url', 'referrer');
  const consent = pick('consent', 'gdpr');
  const recaptchaToken = pick('g-recaptcha-response', 'recaptcha_token');
  const honeypot = pick('contact_company');

  if (honeypot
    || name.length < 1 || name.length > 120
    || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || phone.length > 50 || service.length > 120 || message.length > 5000
    || city.length > 100 || company.length > 150 || website.length > 300
    || budget.length > 100 || source.length > 300
    || isObviousSpam({ name, email, message })) {
    return res.status(400).json({ error: 'Please complete the form with valid details.' });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp, Date.now())) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' });
  }

  if (!await verifyRecaptcha(recaptchaToken, clientIp, req.headers?.['user-agent'])) {
    return res.status(400).json({ error: 'Please complete the security check.' });
  }

  const subject = `🔥 NEW LEAD [${SITE_LABEL}]${service ? ` — ${service}` : ''}${city ? ` in ${city}` : ''}`;
  const lines = [
    `NEW LEAD — ${SITE_LABEL}`,
    '='.repeat(40),
    `Name:    ${name}`,
    `Email:   ${email}`,
  ];
  if (phone)   lines.push(`Phone:   ${phone}`);
  if (company) lines.push(`Company: ${company}`);
  if (website) lines.push(`Website: ${website}`);
  if (city)    lines.push(`City:    ${city}`);
  if (service) lines.push(`Service: ${service}`);
  if (budget)  lines.push(`Budget:  ${budget}`);
  if (consent) lines.push(`Consent: ${consent}`);
  if (source)  lines.push(`Source:  ${source}`);
  lines.push('', 'Message:', message || '—', '', '='.repeat(40), `Time: ${new Date().toISOString()}`);
  const text = lines.join('\n');

  const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<pre style="font-family:system-ui,Segoe UI,monospace;white-space:pre-wrap;font-size:14px">${escapeHtml(text)}</pre>`;

  let result;
  try {
    const r = await fetch(RESEND_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAILS,
        reply_to: email,
        subject,
        text,
        html,
      }),
    });
    const data = await r.json().catch(() => ({}));
    result = { ok: r.ok, status: r.status, data };
  } catch (err) {
    result = { ok: false, error: err.message };
  }

  console.log(`Contact form [${SITE_LABEL}] result:`, JSON.stringify(result));

  if (!result.ok) {
    return res.status(500).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
};
