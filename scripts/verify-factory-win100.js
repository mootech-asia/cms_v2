#!/usr/bin/env node
'use strict';
// Structural verification for factory/win100/ (no browser needed — DOM/text
// assertions only, per CLAUDE.md 截圖鐵則: prefer assertions over screenshots).
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'factory', 'win100');
const SLUGS = [
  'about', 'account', 'account-record', 'betting-record',
  'change-nickname', 'change-password', 'deposit', 'deposit-record', 'fish',
  'hot-games', 'live', 'mini-games', 'personal-info', 'profit-loss', 'promotion',
  'security', 'slot', 'sport', 'support', 'ui-kit', 'withdrawal', 'withdrawal-record',
];
const EXPECTED_PAGES = ['index.html', ...SLUGS.map((s) => `${s}.html`)];

let fails = [];
let oks = [];
function check(name, ok, detail) {
  if (ok) oks.push(name);
  else fails.push(`${name}${detail ? ' :: ' + detail : ''}`);
}

// 1. 24 pages exist
const missing = EXPECTED_PAGES.filter((f) => !fs.existsSync(path.join(OUT, f)));
check('23 pages exist', missing.length === 0, missing.join(', '));

// gather all files for existence-checking of referenced assets
function walk(dir, base = dir, acc = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.add(path.relative(base, full));
  }
  return acc;
}
const allFiles = walk(OUT);

let scriptTagIssues = [];
let nuxtResidue = [];
let leadingSlashIssues = [];
let dataVResidue = [];
let commentResidue = [];
let themeAttrIssues = [];
let missingAssets = [];
let backofficeIssues = [];

for (const page of EXPECTED_PAGES) {
  const full = path.join(OUT, page);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, 'utf8');

  // 2. script tags: every <script> must be a local, relative src (no inline framework payloads)
  const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  const badScripts = scripts.filter((s) => !/^<script src="assets\/js\/[a-zA-Z0-9_-]+\.js"><\/script>$/.test(s));
  if (badScripts.length) scriptTagIssues.push(`${page}: ${badScripts.length} non-conforming script tag(s)`);

  // 3. no /_nuxt residue
  if (html.includes('/_nuxt')) nuxtResidue.push(page);

  // 4. no internal href/src starting with a single leading slash (exclude protocol-relative //)
  const leadingSlash = html.match(/\b(?:href|src)="\/(?!\/)[^"]*"/g) || [];
  if (leadingSlash.length) leadingSlashIssues.push(`${page}: ${leadingSlash.slice(0, 5).join(' | ')}`);

  // data-v- residue
  if (/data-v-[a-zA-Z0-9]+/.test(html)) dataVResidue.push(page);

  // Vue/SSR comment residue
  if (/<!--/.test(html)) commentResidue.push(page);

  // theme attrs on <html>
  const htmlTag = (html.match(/<html\b[^>]*>/) || [''])[0];
  const hasTheme = /data-theme="[^"]*"/.test(htmlTag) && /class="[^"]*dark-mode[^"]*"/.test(htmlTag);
  if (!hasTheme) themeAttrIssues.push(`${page}: ${htmlTag}`);

  // referenced local resources exist (relative, non-external, non-anchor)
  const refs = new Set();
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) refs.add(m[1]);
  for (const ref of refs) {
    if (!ref || ref === '#' || ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('//')) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!allFiles.has(clean)) missingAssets.push(`${page}: ${ref}`);
  }

  // backoffice links must be neutralized if present
  for (const m of html.matchAll(/<[a-zA-Z][a-zA-Z0-9-]*\b[^>]*href="([^"]*)"[^>]*>/g)) {
    if (/\/(admin|studio)(\/|$|\?)/.test(m[1]) && !html.includes('data-backoffice')) {
      backofficeIssues.push(`${page}: ${m[1]}`);
    }
  }
}

check('script tags: local relative src only', scriptTagIssues.length === 0, scriptTagIssues.slice(0, 10).join(' || '));
check('no /_nuxt residue', nuxtResidue.length === 0, nuxtResidue.join(', '));
check('no leading-slash internal href/src', leadingSlashIssues.length === 0, leadingSlashIssues.slice(0, 10).join(' || '));
check('no data-v-* residue', dataVResidue.length === 0, dataVResidue.join(', '));
check('no Vue/SSR HTML comment residue', commentResidue.length === 0, commentResidue.join(', '));
check('<html> keeps theme class/data-theme', themeAttrIssues.length === 0, themeAttrIssues.slice(0, 5).join(' || '));
check('all referenced local assets exist', missingAssets.length === 0, missingAssets.slice(0, 15).join(' || '));
check('admin/studio links neutralized (or absent)', backofficeIssues.length === 0, backofficeIssues.join(', '));

console.log('=== VERIFY SUMMARY ===');
for (const o of oks) console.log('OK   -', o);
for (const f of fails) console.log('FAIL -', f);
console.log(`\n${fails.length === 0 ? 'OK' : 'FAIL'} (${oks.length} passed, ${fails.length} failed)`);
process.exit(fails.length === 0 ? 0 : 1);
