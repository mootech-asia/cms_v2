#!/usr/bin/env node
'use strict';
/*
 * Regenerate factory/win100/'s structure+CSS from a fresh Nuxt `generate` output.
 * main no longer carries the Nuxt app (frontend/ lives on branch 工程師框架版本),
 * so this script expects that branch checked out separately, e.g.:
 *
 *   git worktree add ../cms_system_v2-frontend 工程師框架版本
 *   cd ../cms_system_v2-frontend/frontend && npm ci && NUXT_APP_BASE_URL=/ npm run generate
 *   node scripts/build-factory-win100.js ../cms_system_v2-frontend/frontend/.output/public
 *
 * Only overwrites page markup, CSS, and copied assets — assets/js/site.js and
 * assets/js/data.js (the hand-written behavior layer) are left untouched.
 */
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const SRC = process.argv[2] || process.env.FACTORY_BUILD_SRC;
if (!SRC) {
  console.error('Usage: node scripts/build-factory-win100.js <path-to-frontend/.output/public>');
  process.exit(1);
}
const THEMES_SRC = process.env.FACTORY_BUILD_THEMES_SRC || path.join(SRC, '..', '..', 'app', 'assets', 'css', 'themes');
const OUT = path.join(REPO_ROOT, 'factory', 'win100');

const SLUGS = [
  'about', 'account', 'account-record', 'betting-record',
  'change-nickname', 'change-password', 'deposit', 'deposit-record', 'fish',
  'hot-games', 'live', 'mini-games', 'personal-info', 'profit-loss', 'promotion',
  'security', 'slot', 'sport', 'support', 'ui-kit', 'withdrawal', 'withdrawal-record',
];
const PAGES = [{ slug: '', out: 'index.html' }, ...SLUGS.map((s) => ({ slug: s, out: `${s}.html` }))];
const KNOWN_SLUGS = new Set(PAGES.map((p) => p.slug));

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function readSrc(slug) {
  const file = slug === '' ? path.join(SRC, 'index.html') : path.join(SRC, slug, 'index.html');
  return fs.readFileSync(file, 'utf8');
}

function stripScripts(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
}
function stripNonCssLinks(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => (/rel="stylesheet"/i.test(tag) ? tag : ''));
}
function stripComments(html) {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}
function stripDataV(html) {
  return html.replace(/\sdata-v-[a-zA-Z0-9]+(="[^"]*")?/g, '');
}

const cssRefs = new Set();
const externalRefs = new Set();
let usesLogo = false;
let backofficeLinkCount = 0;

function rewritePaths(html) {
  html = html.replace(/(<link\b[^>]*href=")\/_nuxt\/([^"]+)(")/gi, (m, pre, file, post) => {
    cssRefs.add(file);
    return `${pre}assets/css/${file}${post}`;
  });

  html = html.replace(/(["(])\/_external\/([^"')]+)(["')])/g, (m, pre, rel, post) => {
    externalRefs.add(rel);
    return `${pre}_external/${rel}${post}`;
  });

  html = html.replace(/(["(])\/logo\.png(["')])/g, (m, pre, post) => {
    usesLogo = true;
    return `${pre}logo.png${post}`;
  });

  // defensive: any tag linking into backoffice (/admin, /studio) -> '#' + data-backoffice
  html = html.replace(
    /(<[a-zA-Z][a-zA-Z0-9-]*\b[^>]*)\shref="\/(?:admin|studio)(?:[^"]*)?"([^>]*>)/gi,
    (m, before, after) => {
      backofficeLinkCount++;
      return `${before} href="#" data-backoffice${after}`;
    }
  );

  // internal page links: href="/" or href="/<slug>" (+ optional ?query / #hash)
  html = html.replace(/\bhref="\/([a-z0-9-]*)((?:[?#][^"]*)?)"/gi, (m, slug, extra) => {
    if (!KNOWN_SLUGS.has(slug)) return m; // leave untouched if not one of the 24 known pages
    const target = slug === '' ? 'index.html' : `${slug}.html`;
    return `href="${target}${extra}"`;
  });

  return html;
}

function injectBehaviorScripts(html) {
  return html.replace(
    '</body>',
    '<script src="assets/js/data.js"></script><script src="assets/js/site.js"></script></body>'
  );
}

// --- main ---
ensureDir(OUT);
const report = { pages: [], cssFiles: [], externalFiles: [], logoUsed: false, backofficeLinksFound: 0, errors: [] };

for (const { slug, out } of PAGES) {
  try {
    let html = readSrc(slug);
    html = stripScripts(html);
    html = stripNonCssLinks(html);
    html = stripComments(html);
    html = stripDataV(html);
    html = rewritePaths(html);
    html = injectBehaviorScripts(html);
    fs.writeFileSync(path.join(OUT, out), html, 'utf8');
    report.pages.push(out);
  } catch (e) {
    report.errors.push(`${out}: ${e.message}`);
  }
}
report.backofficeLinksFound = backofficeLinkCount;
report.logoUsed = usesLogo;

ensureDir(path.join(OUT, 'assets/css'));
for (const file of cssRefs) {
  fs.copyFileSync(path.join(SRC, '_nuxt', file), path.join(OUT, 'assets/css', file));
  report.cssFiles.push(file);
}

for (const rel of externalRefs) {
  const destPath = path.join(OUT, '_external', rel);
  ensureDir(path.dirname(destPath));
  fs.copyFileSync(path.join(SRC, '_external', rel), destPath);
  report.externalFiles.push(rel);
}

if (usesLogo) {
  fs.copyFileSync(path.join(SRC, 'logo.png'), path.join(OUT, 'logo.png'));
}

ensureDir(path.join(OUT, 'themes'));
const themeFiles = [];
for (const f of fs.readdirSync(THEMES_SRC)) {
  fs.copyFileSync(path.join(THEMES_SRC, f), path.join(OUT, 'themes', f));
  themeFiles.push(f);
}
report.themeFiles = themeFiles;

// NOTE: assets/js/site.js and assets/js/data.js are the hand-written behavior
// layer — intentionally never touched here. Create empty placeholders only if
// wholly absent (e.g. a from-scratch regenerate into an empty OUT dir).
ensureDir(path.join(OUT, 'assets/js'));
for (const f of ['site.js', 'data.js']) {
  const p = path.join(OUT, 'assets/js', f);
  if (!fs.existsSync(p)) fs.writeFileSync(p, `// ${f} placeholder — behavior layer not yet (re)implemented.\n`, 'utf8');
}

console.log('BUILD DONE');
console.log('pages:', report.pages.length, 'cssFiles:', report.cssFiles.length, 'externalFiles:', report.externalFiles.length, 'logoUsed:', report.logoUsed, 'backofficeLinksFound:', report.backofficeLinksFound, 'errors:', report.errors.length);
if (report.errors.length) console.log(report.errors.join('\n'));
