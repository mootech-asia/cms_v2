#!/usr/bin/env node
'use strict';
// Behavior (Playwright) verification for factory/win100/'s vanilla JS layer.
// Usage: node scripts/serve-factory.js win100 &   (or any static server on PORT)
//        node scripts/verify-factory-win100-behavior.js
'use strict';
const { chromium } = require('playwright');
const path = require('path');

const PORT = process.env.PORT || 4173;
const BASE = process.env.FACTORY_VERIFY_BASE || `http://localhost:${PORT}`;
const EXEC = process.env.PLAYWRIGHT_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ROOT = path.join(__dirname, '..', 'factory', 'win100');
const PAGES = [
  'about', 'account-record', 'account', 'betting-record',
  'change-nickname', 'change-password', 'deposit-record', 'deposit', 'fish',
  'hot-games', 'index', 'live', 'mini-games', 'personal-info', 'profit-loss',
  'promotion', 'security', 'slot', 'sport', 'support', 'ui-kit',
  'withdrawal-record', 'withdrawal',
];

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail: detail || '' });
}

async function blockExternal(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.indexOf(BASE) === -1 && url.indexOf('file://') !== 0) {
      return route.abort();
    }
    return route.continue();
  });
}

// "Failed to load resource" entries are the browser's own network-layer log
// (not a console.* call, not a JS bug) — external <img> tags (Pexels) are
// expected to fail in offline/sandboxed environments. Real JS errors are
// still caught via pageerror and other console.error text.
function collectErrors(page) {
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    if (/Failed to load resource/.test(msg.text())) return;
    errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(String((err && err.message) || err)));
  return errors;
}

async function run() {
  const browser = await chromium.launch({ executablePath: EXEC });

  // ---- 1. console error sweep, all 24 pages ----
  for (const p of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    try {
      await page.goto(BASE + '/' + p + '.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(200);
    } catch (e) {
      errors.push('goto failed: ' + e.message);
    }
    record('console:' + p, errors.length === 0, errors.slice(0, 3).join(' | '));
    await page.close();
  }
  console.log('console sweep done');

  // ---- 2. P0 smoke: theme (6 skins) ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    const keys = await page.evaluate(() => window.WIN100_DATA.THEME_KEYS);
    let allOk = keys.length === 6;
    const applied = [];
    for (const key of keys) {
      await page.click('button[aria-label="Switch skin"]');
      await page.waitForSelector('.dd-panel [data-skin-option="' + key + '"]', { timeout: 3000 });
      await page.click('.dd-panel [data-skin-option="' + key + '"]');
      await page.waitForTimeout(50);
      const themeAttr = await page.getAttribute('html', 'data-theme');
      const stored = await page.evaluate(() => { try { return localStorage.getItem('win100-static-skin'); } catch (e) { return null; } });
      const ok = themeAttr === key && stored === key;
      applied.push(key + '=' + (ok ? 'ok' : 'FAIL(' + themeAttr + ')'));
      if (!ok) allOk = false;
    }
    record('smoke:theme-6-skins', allOk && errors.length === 0, applied.join(', '));
    await page.close();
  }
  console.log('theme smoke done');

  // ---- 3. P0 smoke: banner next/prev/dots ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    const before = await page.getAttribute('.campaign-hero', 'data-campaign');
    await page.$eval('.campaign-hero-arrow--next', (el) => el.click());
    await page.waitForTimeout(100);
    const afterNext = await page.getAttribute('.campaign-hero', 'data-campaign');
    await page.$eval('.campaign-hero-arrow--prev', (el) => el.click());
    await page.waitForTimeout(100);
    const afterPrev = await page.getAttribute('.campaign-hero', 'data-campaign');
    const dotCount = await page.$$eval('.campaign-hero-dot', (els) => els.length);
    await page.$eval('.campaign-hero-dot:nth-child(3)', (el) => el.click());
    await page.waitForTimeout(100);
    const afterDot = await page.getAttribute('.campaign-hero', 'data-campaign');
    const ok = before !== afterNext && afterPrev === before && dotCount === 4 && afterDot !== afterPrev;
    record('smoke:banner-next-prev-dots', ok && errors.length === 0,
      'before=' + before + ' afterNext=' + afterNext + ' afterPrev=' + afterPrev + ' dots=' + dotCount + ' afterDot=' + afterDot);
    await page.close();
  }
  console.log('banner smoke done');

  // ---- 4. P0 smoke: tab switching (MiniGamesGrid + generic .mode-tabs) ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    const firstTitleBefore = await page.textContent('#games-panel-mini h3');
    await page.click('#games-tab-slot');
    await page.waitForTimeout(100);
    const slotSelected = await page.getAttribute('#games-tab-slot', 'aria-selected');
    const slotPanel = await page.$('#games-panel-slot');
    const firstTitleAfter = slotPanel ? await slotPanel.$eval('h3', (el) => el.textContent) : null;
    const miniGamesOk = slotSelected === 'true' && !!slotPanel && firstTitleAfter !== firstTitleBefore && firstTitleAfter === 'Gates of Olympus';

    await page.goto(BASE + '/deposit.html', { waitUntil: 'domcontentloaded' });
    const gatewayBtns = await page.$$('.mode-tabs > button');
    await gatewayBtns[1].click();
    await page.waitForTimeout(50);
    const secondActive = await gatewayBtns[1].evaluate((el) => el.classList.contains('active'));
    const firstStillActive = await gatewayBtns[0].evaluate((el) => el.classList.contains('active'));
    const visibleMethods = await page.$$eval('.payment-tabs > button', (els) => els.filter((e) => getComputedStyle(e).display !== 'none').length);
    const modeTabsOk = secondActive && !firstStillActive && visibleMethods === 3;

    const ok = miniGamesOk && modeTabsOk;
    record('smoke:tab-switch', ok && errors.length === 0,
      'miniGames(slotSelected=' + slotSelected + ',title=' + firstTitleAfter + ') deposit(activeSwap=' + (secondActive && !firstStillActive) + ',methods=' + visibleMethods + ')');
    await page.close();
  }
  console.log('tab smoke done');

  // ---- 5. P0 smoke: AuthModal open/close + login bypass ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    await page.click('header button:has-text("登入")');
    await page.waitForSelector('[data-auth-overlay]', { timeout: 3000 });
    const titleText = await page.textContent('[data-auth-overlay] h3');
    await page.click('[data-auth-close]');
    await page.waitForTimeout(50);
    const closedAfterX = (await page.$('[data-auth-overlay]')) === null;

    await page.click('header button:has-text("登入")');
    await page.waitForSelector('[data-auth-overlay]');
    await page.click('[data-auth-overlay]', { position: { x: 5, y: 5 } });
    await page.waitForTimeout(50);
    const closedAfterBackdrop = (await page.$('[data-auth-overlay]')) === null;

    await page.click('header button:has-text("登入")');
    await page.waitForSelector('[data-auth-overlay]');
    await page.click('[data-auth-submit]');
    await page.waitForTimeout(100);
    const closedAfterLoginBypass = (await page.$('[data-auth-overlay]')) === null;
    const loggedInUiShown = await page.locator('header a[href="account.html"]:has-text("meqomcao")').count();

    const ok = titleText === '登入' && closedAfterX && closedAfterBackdrop && closedAfterLoginBypass && loggedInUiShown > 0;
    record('smoke:auth-modal-open-close-bypass', ok && errors.length === 0,
      'title=' + titleText + ' xClose=' + closedAfterX + ' backdropClose=' + closedAfterBackdrop + ' loginBypassClose=' + closedAfterLoginBypass + ' loggedInUi=' + loggedInUiShown);
    await page.close();
  }
  console.log('auth smoke done');

  // ---- 6. bonus: nav dd-panel hover + mobile menu open ----
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto(BASE + '/index.html', { waitUntil: 'domcontentloaded' });
    const sportsLink = page.locator('nav a:has-text("體育")');
    await sportsLink.hover();
    await page.waitForTimeout(250);
    const ddVisible = await page.evaluate(() => {
      var panels = document.querySelectorAll('.dd-panel');
      for (var i = 0; i < panels.length; i++) {
        if (getComputedStyle(panels[i]).display !== 'none' && panels[i].textContent.indexOf('BTI') !== -1) return true;
      }
      return false;
    });
    await page.setViewportSize({ width: 400, height: 800 });
    await page.click('button[aria-label="Menu"]');
    await page.waitForTimeout(100);
    const mobileMenuOpen = (await page.$('[data-mobile-overlay]')) !== null;
    record('bonus:dd-panel-hover+mobile-menu', ddVisible && mobileMenuOpen && errors.length === 0, 'dd=' + ddVisible + ' mobileMenu=' + mobileMenuOpen);
    await page.close();
  }
  console.log('bonus smoke done');

  await browser.close();

  // ---- 7. file:// direct open of index.html ----
  {
    const browser2 = await chromium.launch({ executablePath: EXEC });
    const page = await browser2.newPage();
    await blockExternal(page);
    const errors = collectErrors(page);
    await page.goto('file://' + path.join(ROOT, 'index.html'), { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const themeOk = await page.evaluate(() => !!window.WIN100_DATA && document.documentElement.getAttribute('data-theme') === 'win100');
    const before = await page.getAttribute('.campaign-hero', 'data-campaign');
    await page.$eval('.campaign-hero-arrow--next', (el) => el.click());
    await page.waitForTimeout(100);
    const after = await page.getAttribute('.campaign-hero', 'data-campaign');
    await page.click('#games-tab-live');
    await page.waitForTimeout(100);
    const liveSelected = await page.getAttribute('#games-tab-live', 'aria-selected');
    record('file://:index-console', errors.length === 0, errors.slice(0, 3).join(' | '));
    record('file://:index-smoke', themeOk && before !== after && liveSelected === 'true',
      'themeOk=' + themeOk + ' bannerChanged=' + (before !== after) + ' liveTab=' + liveSelected);
    await browser2.close();
  }
  console.log('file:// done');

  // ---- print OK/FAIL table ----
  let failCount = 0;
  const lines = results.map((r) => {
    if (!r.ok) failCount++;
    var status = r.ok ? 'OK  ' : 'FAIL';
    return status + '  ' + r.name + (r.detail ? '   (' + r.detail + ')' : '');
  });
  console.log('=== RESULTS ===');
  console.log(lines.join('\n'));
  console.log('---');
  console.log((results.length - failCount) + '/' + results.length + ' passed');
  process.exit(failCount > 0 ? 1 : 0);
}

run();
