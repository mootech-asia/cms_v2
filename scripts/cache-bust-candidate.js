#!/usr/bin/env node
/*
 * cache-bust-candidate.js — stamp production asset refs with a content hash.
 *
 * Why: factory/win100/ pages reference assets/js/site.js, assets/css/global.css,
 * etc. with bare relative paths so the source stays hand-written and `open
 * index.html` works locally. Bare paths have no version, so GitHub Pages / mobile
 * browsers / CDNs keep serving stale site.js/global.css after a deploy — the
 * recurring "使用者看不到更新" pain documented in docs/HANDOFF-2026-07-22-pm.md.
 *
 * This runs only on the assembled candidate (.candidate), never on the source
 * tree, appending ?v=<sha256[:8]> to each local asset ref. When a file's bytes
 * change its hash changes and the browser refetches; unchanged files keep their
 * cache. Themes are loaded at runtime by site.js (not via <link>), so their line
 * is stamped too. Idempotent: refs that already carry ?v= are skipped.
 *
 * Usage: node scripts/cache-bust-candidate.js [candidateDir=.candidate]
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = process.argv[2] || '.candidate';
const sha8 = (buf) => crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`cache-bust: candidate dir not found: ${root}`);
  process.exit(1);
}

// 1) Runtime theme CSS: site.js builds `themes/<key>.css` hrefs dynamically, so
//    stamp that one line with a combined hash of every theme file. Done first so
//    site.js reaches its final bytes before its own hash is computed in step 2.
const themesDir = path.join(root, 'themes');
let themeStamp = null;
if (fs.existsSync(themesDir)) {
  const h = crypto.createHash('sha256');
  for (const f of fs.readdirSync(themesDir).sort()) {
    if (f.endsWith('.css')) h.update(fs.readFileSync(path.join(themesDir, f)));
  }
  themeStamp = h.digest('hex').slice(0, 8);
  const siteJs = path.join(root, 'assets', 'js', 'site.js');
  if (fs.existsSync(siteJs)) {
    const before = fs.readFileSync(siteJs, 'utf8');
    const after = before.replace(
      /link\.href = 'themes\/' \+ key \+ '\.css';/,
      `link.href = 'themes/' + key + '.css?v=${themeStamp}';`
    );
    if (after !== before) fs.writeFileSync(siteJs, after);
  }
}

// 2) HTML-referenced local assets: append each file's own content hash.
const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
const assetRefRe = /(src|href)="(assets\/[^"?]+\.(?:css|js))"/g;
// Any local asset ref, stamped or not — used only to tell "broken assembly"
// (zero refs anywhere) apart from "already stamped" (idempotent re-run).
const anyAssetRefRe = /(src|href)="assets\/[^"]+\.(?:css|js)(\?[^"]*)?"/g;
const hashCache = new Map();
const fileHash = (rel) => {
  if (hashCache.has(rel)) return hashCache.get(rel);
  const p = path.join(root, rel);
  const h = fs.existsSync(p) ? sha8(fs.readFileSync(p)) : null;
  hashCache.set(rel, h);
  return h;
};

let rewrites = 0;
let seen = 0;
for (const f of htmlFiles) {
  const p = path.join(root, f);
  const html = fs.readFileSync(p, 'utf8');
  seen += (html.match(anyAssetRefRe) || []).length;
  const out = html.replace(assetRefRe, (m, attr, rel) => {
    const h = fileHash(rel);
    if (!h) return m;
    rewrites++;
    return `${attr}="${rel}?v=${h}"`;
  });
  if (out !== html) fs.writeFileSync(p, out);
}

console.log(
  `cache-bust: stamped ${rewrites} asset refs (${seen} present) across ${htmlFiles.length} pages; ` +
    `theme stamp ${themeStamp || 'n/a'}`
);
if (seen === 0) {
  console.error('cache-bust: no asset refs found at all — refusing (assembly likely broken).');
  process.exit(1);
}
