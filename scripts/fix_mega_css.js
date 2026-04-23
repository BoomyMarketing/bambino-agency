#!/usr/bin/env node
/**
 * Inject mega-menu CSS + JS into pages that have mega-menu HTML
 * but are missing the CSS/JS definitions.
 * Targets: root *.html, blog/*.html, industries/*.html, ca/*.html, us/*.html
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const MEGA_CSS = `
    /* MEGA MENU */
    .nav-has-mega { position: relative; }
    .nav-mega-toggle { display: flex !important; align-items: center; gap: 0.4rem; cursor: pointer; }
    .nav-mega-toggle svg { transition: transform 0.2s ease; flex-shrink: 0; }
    .nav-has-mega.active .nav-mega-toggle svg { transform: rotate(180deg); }
    .mega-menu {
      display: none;
      position: fixed;
      top: 62px;
      left: 0; right: 0;
      background: var(--bg, #F9F9F5);
      border-top: 2px solid var(--orange, #FF4D00);
      box-shadow: 0 8px 40px rgba(0,0,0,0.13);
      z-index: 998;
      padding: 2rem 0 1.5rem;
    }
    .nav-has-mega.active .mega-menu { display: block; animation: megaFadeIn 0.16s ease; }
    @keyframes megaFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
    .mega-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1.5rem 1.2rem; }
    .mega-col { }
    .mega-cat { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--orange, #FF4D00); margin-bottom: 0.45rem; margin-top: 0; line-height: 1.4; }
    .mega-col a { display: block; font-size: 0.81rem; color: var(--text, #1a1a1a); padding: 0.16rem 0; transition: color 0.15s; font-weight: 400; line-height: 1.5; }
    .mega-col a:hover { color: var(--orange, #FF4D00); }
    .mega-col a::after { display: none !important; }
    .mega-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1.2rem; padding-top: 0.9rem; border-top: 1px solid var(--border, #e5e5e0); }
    .mega-all { font-size: 0.84rem; font-weight: 600; color: var(--green, #034C3C); }
    .mega-all:hover { color: var(--orange, #FF4D00); }
    .mega-all::after { display: none !important; }
    .mega-cta { font-size: 0.81rem; font-weight: 700; background: var(--orange, #FF4D00); color: #fff !important; padding: 0.45rem 1.1rem; border-radius: 100px; transition: background 0.15s; }
    .mega-cta:hover { background: #e64500 !important; }
    .mega-cta::after { display: none !important; }
    @media (max-width: 960px) { .mega-menu { display: none !important; } }`;

const MEGA_JS = `
(function(){
  var megaParent = document.querySelector('.nav-has-mega');
  var megaToggle = document.querySelector('.nav-mega-toggle');
  if (megaToggle && megaParent) {
    megaToggle.addEventListener('click', function(e) {
      e.preventDefault();
      var isActive = megaParent.classList.toggle('active');
      megaToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    document.addEventListener('click', function(e) {
      if (!megaParent.contains(e.target)) {
        megaParent.classList.remove('active');
        megaToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        megaParent.classList.remove('active');
        megaToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();`;

// Directories to check (direct children only, not recursive for top-level)
const TARGETS = [
  // root-level html files
  ...fs.readdirSync(ROOT)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(ROOT, f)),
  // blog/index.html only
  path.join(ROOT, 'blog', 'index.html'),
  // industries/*.html
  ...fs.existsSync(path.join(ROOT, 'industries'))
    ? fs.readdirSync(path.join(ROOT, 'industries'))
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(ROOT, 'industries', f))
    : [],
  // ca/*.html
  ...fs.existsSync(path.join(ROOT, 'ca'))
    ? fs.readdirSync(path.join(ROOT, 'ca'))
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(ROOT, 'ca', f))
    : [],
  // us/*.html
  ...fs.existsSync(path.join(ROOT, 'us'))
    ? fs.readdirSync(path.join(ROOT, 'us'))
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(ROOT, 'us', f))
    : [],
];

let updated = 0, skipped = 0, problems = [];

for (const fp of TARGETS) {
  if (!fs.existsSync(fp)) continue;

  let content;
  try { content = fs.readFileSync(fp, 'utf-8'); } catch(e) { problems.push(fp + ': read error'); continue; }

  // Only process pages that have mega-menu HTML
  if (!content.includes('nav-has-mega')) { skipped++; continue; }

  // Skip if already has mega CSS
  if (content.includes('.mega-menu {') || content.includes('.mega-menu{')) { skipped++; continue; }

  // Inject CSS before </style>
  if (!content.includes('</style>')) { problems.push(path.basename(fp) + ': no </style>'); continue; }
  content = content.replace('</style>', MEGA_CSS + '\n  </style>');

  // Inject JS before </body> — use IIFE, don't duplicate existing mega JS
  if (!content.includes('megaParent.classList.toggle')) {
    content = content.replace('</body>', `<script>${MEGA_JS}\n</script>\n</body>`);
  }

  try { fs.writeFileSync(fp, content, 'utf-8'); } catch(e) { problems.push(path.basename(fp) + ': write error'); continue; }

  console.log(`  ✓ ${path.relative(ROOT, fp)}`);
  updated++;
}

console.log(`\n✅ Done. Updated: ${updated}, Skipped: ${skipped}, Problems: ${problems.length}`);
if (problems.length) problems.forEach(p => console.log('  ✗ ' + p));
