const assert = require('node:assert/strict');
const test = require('node:test');
const handler = require('../api/contact');
const recaptchaConfigHandler = require('../api/recaptcha-config');

const SITE_ORIGIN = 'https://bambinoagency.com';
const SITE_HOSTNAME = 'bambinoagency.com';
let ipCounter = 10;

function createResponse() {
  return {
    statusCode: 200,
    body: undefined,
    headers: {},
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}

test('only exposes the public reCAPTCHA site key', () => {
  const originalProjectId = process.env.RECAPTCHA_PROJECT_ID;
  const originalSiteKey = process.env.RECAPTCHA_SITE_KEY;
  const originalApiKey = process.env.RECAPTCHA_API_KEY;
  process.env.RECAPTCHA_PROJECT_ID = 'test-project';
  process.env.RECAPTCHA_SITE_KEY = 'public-site-key';
  process.env.RECAPTCHA_API_KEY = 'private-api-key';
  const response = createResponse();

  try {
    recaptchaConfigHandler({}, response);
  } finally {
    if (originalProjectId == null) delete process.env.RECAPTCHA_PROJECT_ID;
    else process.env.RECAPTCHA_PROJECT_ID = originalProjectId;
    if (originalSiteKey == null) delete process.env.RECAPTCHA_SITE_KEY;
    else process.env.RECAPTCHA_SITE_KEY = originalSiteKey;
    if (originalApiKey == null) delete process.env.RECAPTCHA_API_KEY;
    else process.env.RECAPTCHA_API_KEY = originalApiKey;
  }

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { enabled: true, siteKey: 'public-site-key' });
  assert.equal(response.headers['Cache-Control'], 'no-store');
  assert.doesNotMatch(JSON.stringify(response.body), /private-api-key|test-project/);
});

async function submit(body, options = {}) {
  const response = createResponse();
  const originalFetch = global.fetch;
  const originalProjectId = process.env.RECAPTCHA_PROJECT_ID;
  const originalSiteKey = process.env.RECAPTCHA_SITE_KEY;
  const originalApiKey = process.env.RECAPTCHA_API_KEY;
  let sendCalls = 0;
  let verifyCalls = 0;
  let verificationBody;

  if (options.recaptcha) {
    process.env.RECAPTCHA_PROJECT_ID = 'test-project';
    process.env.RECAPTCHA_SITE_KEY = 'test-site-key';
    process.env.RECAPTCHA_API_KEY = 'test-api-key';
  } else {
    delete process.env.RECAPTCHA_PROJECT_ID;
    delete process.env.RECAPTCHA_SITE_KEY;
    delete process.env.RECAPTCHA_API_KEY;
  }

  global.fetch = async (url, fetchOptions) => {
    if (String(url).includes('recaptchaenterprise.googleapis.com')) {
      verifyCalls += 1;
      verificationBody = JSON.parse(fetchOptions.body);
      if (options.verificationError) throw new Error('reCAPTCHA unavailable');
      return {
        ok: options.verificationHttpOk !== false,
        status: options.verificationHttpOk === false ? 503 : 200,
        json: async () => options.verificationResult || {
          tokenProperties: {
            valid: true,
            action: 'contact',
            hostname: SITE_HOSTNAME,
          },
          riskAnalysis: { score: 0.9 },
        },
      };
    }

    sendCalls += 1;
    return {
      ok: true,
      status: 200,
      json: async () => ({ id: 'test-email' }),
    };
  };

  const headers = {
    origin: options.origin ?? SITE_ORIGIN,
    'x-forwarded-for': `198.51.100.${ipCounter++}`,
    'user-agent': 'contact-test',
  };
  if (options.noOrigin) delete headers.origin;

  try {
    await handler({ method: 'POST', body, headers }, response);
  } finally {
    global.fetch = originalFetch;
    if (originalProjectId == null) delete process.env.RECAPTCHA_PROJECT_ID;
    else process.env.RECAPTCHA_PROJECT_ID = originalProjectId;
    if (originalSiteKey == null) delete process.env.RECAPTCHA_SITE_KEY;
    else process.env.RECAPTCHA_SITE_KEY = originalSiteKey;
    if (originalApiKey == null) delete process.env.RECAPTCHA_API_KEY;
    else process.env.RECAPTCHA_API_KEY = originalApiKey;
  }

  return { response, sendCalls, verifyCalls, verificationBody };
}

test('accepts a normal existing-form submission', async () => {
  const { response, sendCalls } = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    service: 'SEO',
    message: 'We need help growing qualified traffic.',
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { success: true });
  assert.equal(sendCalls, 1);
  assert.equal(response.headers['Access-Control-Allow-Origin'], SITE_ORIGIN);
});

test('does not reject a legitimate Russian-language enquiry', async () => {
  const { response, sendCalls } = await submit({
    name: 'Иван Петров',
    email: 'ivan@company.ca',
    service: 'SEO',
    message: 'Нужна помощь с продвижением компании в Google.',
  });

  assert.equal(response.statusCode, 200);
  assert.equal(sendCalls, 1);
});

test('rejects the Russian gambling-link spam before email', async () => {
  const { response, sendCalls } = await submit({
    name: 'mostbet_tmKI',
    email: 'qegfzaixvKI@zvukovoe-oborudovanie12.ru',
    service: 'marketing',
    message: 'Скачать mostbet https://mostbet-rfd.com.kg',
  });

  assert.equal(response.statusCode, 400);
  assert.equal(sendCalls, 0);
});

test('rejects honeypot and oversized submissions', async () => {
  const honeypot = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    contact_company: 'bot-filled',
  });
  const oversized = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    message: 'x'.repeat(5001),
  });

  assert.equal(honeypot.response.statusCode, 400);
  assert.equal(honeypot.sendCalls, 0);
  assert.equal(oversized.response.statusCode, 400);
  assert.equal(oversized.sendCalls, 0);
});

test('rejects requests from an unrelated browser origin', async () => {
  const { response, sendCalls } = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
  }, { origin: 'https://attacker.example' });

  assert.equal(response.statusCode, 403);
  assert.equal(sendCalls, 0);
});

test('requires a reCAPTCHA token when production settings exist', async () => {
  const { response, sendCalls, verifyCalls } = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
  }, { recaptcha: true });

  assert.equal(response.statusCode, 400);
  assert.equal(sendCalls, 0);
  assert.equal(verifyCalls, 0);
});

test('accepts a normal lead after successful reCAPTCHA assessment', async () => {
  const { response, sendCalls, verifyCalls, verificationBody } = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    recaptcha_token: 'valid-test-token',
  }, { recaptcha: true });

  assert.equal(response.statusCode, 200);
  assert.equal(sendCalls, 1);
  assert.equal(verifyCalls, 1);
  assert.equal(verificationBody.event.token, 'valid-test-token');
  assert.equal(verificationBody.event.expectedAction, 'contact');
});

test('rejects invalid and lowest-score reCAPTCHA assessments', async () => {
  const invalid = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    recaptcha_token: 'invalid-token',
  }, {
    recaptcha: true,
    verificationResult: { tokenProperties: { valid: false } },
  });
  const lowestScore = await submit({
    name: 'Jane Smith',
    email: 'jane@company.com',
    recaptcha_token: 'low-score-token',
  }, {
    recaptcha: true,
    verificationResult: {
      tokenProperties: { valid: true, action: 'contact', hostname: SITE_HOSTNAME },
      riskAnalysis: { score: 0.1 },
    },
  });

  assert.equal(invalid.response.statusCode, 400);
  assert.equal(invalid.sendCalls, 0);
  assert.equal(lowestScore.response.statusCode, 400);
  assert.equal(lowestScore.sendCalls, 0);
});

test('does not lose a normal lead during a reCAPTCHA outage', async () => {
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    const { response, sendCalls, verifyCalls } = await submit({
      name: 'Jane Smith',
      email: 'jane@company.com',
      recaptcha_token: 'valid-test-token',
    }, { recaptcha: true, verificationError: true });

    assert.equal(response.statusCode, 200);
    assert.equal(sendCalls, 1);
    assert.equal(verifyCalls, 1);
  } finally {
    console.error = originalConsoleError;
  }
});
