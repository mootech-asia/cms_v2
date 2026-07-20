/**
 * WIN100 factory static site — vanilla JS behaviour layer.
 *
 * Plain global script (no ESM, no fetch, no bundler) — works via http server
 * AND file://. Reads seed data from window.WIN100_DATA (assets/js/data.js,
 * must be loaded before this file). Behaviour spec ported from frontend/ Vue
 * components (AppHeader, AppBanner, MiniGamesGrid, VendorBrowser, AuthModal,
 * useMemberPage, useCarousel, useCountdownTabs, app/utils/themes.ts) —
 * frontend/ itself was only read, never modified.
 *
 * Every init function defensively checks for its target markup before acting,
 * so the same site.js can be included unmodified on all 24 pages.
 */
(function () {
  'use strict';

  var D = window.WIN100_DATA || {};

  /* ============================== utils ================================ */

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) el.addEventListener(ev, fn, opts); }
  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function iconSvg(name, cls) {
    var d = (D.ICONS || {})[name] || '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' + (cls ? ' class="' + cls + '"' : '') + '>' + d + '</svg>';
  }
  function pageName() {
    var seg = (location.pathname.split('/').pop() || 'index.html');
    return seg.replace(/\.html?$/, '') || 'index';
  }
  function isActivePage(href) {
    var target = href.replace(/\.html$/, '');
    var cur = pageName();
    return target === 'index' ? cur === 'index' : cur === target;
  }
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  /* =============================== theme ================================ */
  /* frontend/app/utils/themes.ts THEME_KEYS/THEME_LABELS + app/app.vue
     (<html data-theme>) + components/SkinSwitcher.vue. entry.*.css already
     bundles all 6 skins as [data-theme=X] rules, so flipping the attribute
     alone fully re-skins the page; the dynamic <link> swap below is kept too
     so the 6 themes/*.css files are genuinely (if redundantly) wired in, as
     a safety net if that bundle ever falls out of sync with the source files. */

  var THEME_STORAGE_KEY = 'win100-static-skin';
  var THEME_LINK_ID = 'win100-skin-link';

  function updateSkinUI(key) {
    $all('[data-skin-option]').forEach(function (el) {
      var active = el.getAttribute('data-skin-option') === key;
      el.classList.toggle('font-bold', active);
      el.classList.toggle('text-primary', active);
      el.classList.toggle('font-normal', !active);
      el.classList.toggle('text-ink-2', !active);
    });
  }

  function applyTheme(key, persist) {
    var keys = D.THEME_KEYS || ['win100'];
    if (keys.indexOf(key) === -1) key = keys[0];
    document.documentElement.setAttribute('data-theme', key);
    var link = document.getElementById(THEME_LINK_ID);
    if (!link) {
      link = document.createElement('link');
      link.id = THEME_LINK_ID;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
    link.href = 'themes/' + key + '.css';
    if (persist !== false) {
      try { window.localStorage.setItem(THEME_STORAGE_KEY, key); } catch (e) { /* storage unavailable */ }
    }
    updateSkinUI(key);
  }

  function buildSkinPanelHtml() {
    var keys = D.THEME_KEYS || [];
    var labels = D.THEME_LABELS || {};
    return keys.map(function (k) {
      return '<div class="cursor-pointer whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm hover:bg-surface-deep" data-skin-option="' + k + '">' + escapeHtml(labels[k] || k) + '</div>';
    }).join('');
  }

  function initSkinSwitchers() {
    $all('button[aria-label="Switch skin"]').forEach(function (btn) {
      var wrap = btn.parentElement;
      var panel = null, backdrop = null;
      function close() {
        if (panel) { panel.remove(); panel = null; }
        if (backdrop) { backdrop.remove(); backdrop = null; }
      }
      function open() {
        backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 z-[999]';
        on(backdrop, 'click', close);
        wrap.appendChild(backdrop);
        panel = document.createElement('div');
        panel.className = 'dd-panel right-0';
        panel.innerHTML = buildSkinPanelHtml();
        wrap.appendChild(panel);
        updateSkinUI(document.documentElement.getAttribute('data-theme') || 'win100');
        $all('[data-skin-option]', panel).forEach(function (opt) {
          on(opt, 'click', function () { applyTheme(opt.getAttribute('data-skin-option')); close(); });
        });
      }
      on(btn, 'click', function (e) {
        e.stopPropagation();
        if (panel) close(); else open();
      });
    });
  }

  function initTheme() {
    var saved = null;
    try { saved = window.localStorage.getItem(THEME_STORAGE_KEY); } catch (e) { /* ignore */ }
    applyTheme(saved || document.documentElement.getAttribute('data-theme') || 'win100', false);
    initSkinSwitchers();
  }

  /* ============================ locale switcher =========================== */
  /* components/LanguageSwitcher.vue + composables/useLocale.ts. Only the zh
     copy actually baked into these static pages was ported to data.js (see
     data.js file header) — full runtime translation is out of scope for this
     static build, so picking a non-zh option here surfaces the same "not in
     this static preview" notice already used for backoffice links, rather
     than silently pretending to translate the page. The trigger button itself
     (globe icon + current short label + chevron, wrapped in a `.relative`
     div) has no unique id/class in the baked HTML, so it's matched the same
     defensive way other structural triggers in this file are: by its exact
     rendered content. */

  function buildLocalePanelHtml() {
    var locales = D.LOCALES || [];
    return locales.map(function (l) {
      var active = l.code === 'zh';
      return '<div class="cursor-pointer whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm hover:bg-surface-deep' +
        (active ? ' font-bold text-primary' : ' font-normal text-ink-2') + '" data-locale-option="' + l.code + '">' +
        escapeHtml(l.label) + '</div>';
    }).join('');
  }

  function initLocaleSwitcher() {
    $all('button').forEach(function (btn) {
      var span = btn.querySelector('span');
      if (!span || span.textContent.trim() !== '中文') return;
      if ($all('svg', btn).length < 2) return;
      var wrap = btn.parentElement;
      var panel = null, backdrop = null;
      function close() {
        if (panel) { panel.remove(); panel = null; }
        if (backdrop) { backdrop.remove(); backdrop = null; }
      }
      function open() {
        backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 z-[999]';
        on(backdrop, 'click', close);
        wrap.appendChild(backdrop);
        panel = document.createElement('div');
        panel.className = 'dd-panel right-0';
        panel.innerHTML = buildLocalePanelHtml();
        wrap.appendChild(panel);
        $all('[data-locale-option]', panel).forEach(function (opt) {
          on(opt, 'click', function () {
            close();
            if (opt.getAttribute('data-locale-option') !== 'zh') {
              window.alert((D.T || {}).notAvailable || '此靜態預覽尚未包含此內容');
            }
          });
        });
      }
      on(btn, 'click', function (e) {
        e.stopPropagation();
        if (panel) close(); else open();
      });
    });
  }

  /* ============================ nav dd-panel ============================= */
  /* AppHeader.vue hover dropdown (Sports/Live) — already server-rendered via
     v-show (style="display:none"), only needs show/hide wiring. */

  function initNavDropdowns() {
    $all('nav .relative').forEach(function (wrap) {
      var panel = $('.dd-panel', wrap);
      if (!panel) return;
      var timer = null;
      function show() { if (timer) clearTimeout(timer); panel.style.display = ''; }
      function hide() { timer = setTimeout(function () { panel.style.display = 'none'; }, 160); }
      on(wrap, 'mouseenter', show);
      on(wrap, 'mouseleave', hide);
      on(wrap, 'click', function (e) {
        if (e.target.closest('.dd-panel')) return;
        panel.style.display === 'none' ? show() : hide();
      });
    });
  }

  /* ============================ mobile menus ============================= */

  function mobileLoggedInBlockHtml() {
    var T = D.T || {};
    return (
      '<div class="flex items-center gap-4">' +
      '<div class="w-12 h-12 min-[400px]:w-14 min-[400px]:h-14 rounded-full bg-g-primary text-on-primary flex items-center justify-center flex-shrink-0">' + iconSvg('user', 'w-7 h-7') + '</div>' +
      '<div class="min-w-0"><div class="flex items-center gap-3"><span class="text-ink text-lg min-[400px]:text-xl font-bold truncate">meqomcao</span><span class="bg-g-primary text-on-primary text-xs min-[400px]:text-sm font-bold px-2.5 py-1 rounded-full leading-none">VIP1</span></div>' +
      '<div class="mt-1 text-sm min-[400px]:text-base font-semibold whitespace-nowrap"><span class="text-ink-3">' + escapeHtml(T.accountBalance) + ': </span><span class="text-primary">₩1,000,000,000</span></div>' +
      '<div class="text-sm min-[400px]:text-base font-semibold"><span class="text-ink-3">' + escapeHtml(T.accountPoints) + ': </span><span class="text-primary">0.00</span></div></div></div>' +
      '<a href="account.html" class="mt-3 block text-center rounded-lg bg-g-primary text-on-primary text-sm font-bold" style="padding:10px 18px;text-decoration:none">' + escapeHtml(T.accountView) + '</a>'
    );
  }

  function navLinksHtml() {
    return (D.NAV_LINKS || []).map(function (l) {
      var active = isActivePage(l.href);
      return '<a href="' + l.href + '" class="mx-6 min-h-0 flex items-center gap-4 rounded-xl px-6 text-[17px] min-[400px]:text-[20px] font-semibold transition-colors ' +
        (active ? 'bg-g-primary text-on-primary' : 'text-ink-2 hover:text-ink') +
        '" style="text-decoration:none" data-mobile-nav-link>' + iconSvg(l.icon, 'w-6 h-6 flex-shrink-0') + '<span>' + escapeHtml(l.label) + '</span></a>';
    }).join('');
  }

  function buildAppHeaderMobileMenu() {
    var links = D.NAV_LINKS || [];
    var T = D.T || {};
    var bottom = authState.loggedIn ? mobileLoggedInBlockHtml() : (
      '<button style="display:block;width:100%;text-align:left;padding:12px 14px;background:none;border:0;color:#fff;cursor:pointer;font-weight:600;font-size:15px" data-mobile-login>' + escapeHtml(T.login) + '</button>' +
      '<button class="btn-primary w-full" style="padding:12px 14px;font-size:15px;margin-top:4px" data-mobile-register>' + escapeHtml(T.register) + '</button>'
    );
    return (
      '<div class="fixed inset-0 z-[10001]" style="background:rgba(0,0,0,.6)" data-mobile-overlay>' +
      '<div class="absolute inset-0 flex flex-col overflow-hidden bg-surface pb-16">' +
      '<div class="flex justify-between items-center h-[76px] min-[400px]:h-[92px] px-6 border-b border-line-soft flex-shrink-0">' +
      '<img src="logo.png" alt="Casino Logo" class="h-12 mix-blend-lighten">' +
      '<button class="text-ink-2 hover:text-ink" aria-label="Close menu" data-mobile-close>' + iconSvg('x', 'w-7 h-7') + '</button></div>' +
      '<nav class="grid flex-1 min-h-0 py-2" style="grid-template-rows:repeat(' + links.length + ',minmax(0,1fr))">' + navLinksHtml() + '</nav>' +
      '<div class="mx-6 py-3 border-t border-line flex-shrink-0" data-mobile-bottom>' + bottom + '</div>' +
      '</div></div>'
    );
  }

  function buildMemberHeaderMobileMenu() {
    var links = D.NAV_LINKS || [];
    return (
      '<div class="fixed inset-0 z-[10001]" style="background:rgba(0,0,0,.6)" data-mobile-overlay>' +
      '<div class="absolute inset-0 flex flex-col overflow-hidden bg-surface pb-16">' +
      '<div class="flex justify-between items-center h-[76px] min-[400px]:h-[92px] px-6 border-b border-line-soft flex-shrink-0">' +
      '<img src="logo.png" alt="Casino Logo" class="h-12 mix-blend-lighten">' +
      '<button class="text-ink-2 hover:text-ink" aria-label="Close menu" data-mobile-close>' + iconSvg('x', 'w-7 h-7') + '</button></div>' +
      '<nav class="grid flex-1 min-h-0 py-2" style="grid-template-rows:repeat(' + links.length + ',minmax(0,1fr))">' + navLinksHtml() + '</nav>' +
      '<div class="mx-6 py-3 border-t border-line flex-shrink-0">' + mobileLoggedInBlockHtml() + '</div>' +
      '</div></div>'
    );
  }

  var mobileOverlayRoot = null;
  function closeMobileOverlay() { if (mobileOverlayRoot) { mobileOverlayRoot.remove(); mobileOverlayRoot = null; } }
  function openMobileOverlay(html) {
    closeMobileOverlay();
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    mobileOverlayRoot = wrap.firstElementChild;
    document.body.appendChild(mobileOverlayRoot);
    on(mobileOverlayRoot, 'click', function (e) { if (e.target === mobileOverlayRoot) closeMobileOverlay(); });
    on(mobileOverlayRoot.querySelector('[data-mobile-close]'), 'click', closeMobileOverlay);
    $all('[data-mobile-nav-link]', mobileOverlayRoot).forEach(function (a) { on(a, 'click', closeMobileOverlay); });
    on(mobileOverlayRoot.querySelector('[data-mobile-login]'), 'click', function () { closeMobileOverlay(); openAuth('login'); });
    on(mobileOverlayRoot.querySelector('[data-mobile-register]'), 'click', function () { closeMobileOverlay(); openAuth('register'); });
  }

  function initHeaderMobileMenus() {
    $all('header').forEach(function (header) {
      var hamburgerBtn = header.querySelector('button[aria-label="Menu"]');
      if (!hamburgerBtn) return;
      var isAppHeader = !!header.querySelector('[aria-label="Switch skin"]');
      on(hamburgerBtn, 'click', function () {
        openMobileOverlay(isAppHeader ? buildAppHeaderMobileMenu() : buildMemberHeaderMobileMenu());
      });
    });
  }

  /* MemberMenuDrawer.vue — mobile bottom nav "Browse" button (left drawer) */

  function buildMemberDrawerHtml() {
    var links = D.MEMBER_MENU_LINKS || [];
    var curParent = pageName() === 'change-nickname' ? 'account.html' : null;
    var rows = links.map(function (l) {
      var active = isActivePage(l.href) || (curParent === l.href);
      return '<a href="' + l.href + '" class="mmd-row' + (active ? ' active' : '') + '">' + iconSvg(l.icon, 'mmd-icon') + '<span>' + escapeHtml(l.label) + '</span></a>';
    }).join('');
    return (
      '<div class="mmd-overlay" data-mmd-overlay>' +
      '<div class="mmd-panel">' +
      '<div class="mmd-head"><span>Menu</span><button type="button" aria-label="Close menu" data-mmd-close>' + iconSvg('x', 'w-6 h-6') + '</button></div>' +
      '<nav class="mmd-links" style="grid-template-rows:repeat(' + links.length + ',minmax(0,1fr))">' + rows + '</nav>' +
      '</div></div>'
    );
  }

  var memberDrawerRoot = null;
  function closeMemberDrawer() { if (memberDrawerRoot) { memberDrawerRoot.remove(); memberDrawerRoot = null; } }
  function openMemberDrawer() {
    closeMemberDrawer();
    var wrap = document.createElement('div');
    wrap.innerHTML = buildMemberDrawerHtml();
    memberDrawerRoot = wrap.firstElementChild;
    document.body.appendChild(memberDrawerRoot);
    on(memberDrawerRoot, 'click', function (e) { if (e.target === memberDrawerRoot) closeMemberDrawer(); });
    on(memberDrawerRoot.querySelector('[data-mmd-close]'), 'click', closeMemberDrawer);
    $all('.mmd-row', memberDrawerRoot).forEach(function (a) { on(a, 'click', closeMemberDrawer); });
  }

  function initMobileBottomNav() {
    var browseLabel = (D.T || {}).browse || '瀏覽';
    var browseBtn = $all('nav.md\\:hidden button').filter(function (b) {
      return (b.textContent || '').replace(/\s+/g, '') === browseLabel;
    })[0];
    on(browseBtn, 'click', openMemberDrawer);
  }

  /* ============================== auth modal ============================= */
  /* AuthModal.vue — Teleport'd, v-if so absent from the static DOM entirely;
     built on demand. Login has no validation in the source app either (dev
     bypass): submit just flips loggedIn and closes. */

  var AUTH_FIELDS = {
    login: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', eye: true },
    ],
    register: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', eye: true },
      { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', eye: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
      { name: 'realname', label: 'Real Name', type: 'text', placeholder: 'Enter your real name' },
      { name: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter your mobile number' },
    ],
    forgot: [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    ],
  };
  var AUTH_TITLES = { login: 'Login', register: 'Register', forgot: 'Forgot Password' };
  var authState = { loggedIn: false };

  function authFieldError(name, values) {
    var raw = values[name] || '';
    var v = raw.trim();
    switch (name) {
      case 'username':
        if (!v) return 'Please enter your username.';
        if (v.length < 3 || v.length > 16) return 'Username must be 3-16 characters.';
        return '';
      case 'password':
        if (raw.length < 5 || raw.length > 16) return 'Length must be 5-16 characters.';
        return '';
      case 'confirm':
        if (raw !== values.password) return 'The two passwords do not match.';
        return '';
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(v)) return 'Please enter a valid email address.';
        return '';
      case 'realname':
        if (!v) return 'Please enter your real name.';
        return '';
      case 'mobile':
        if (!/^\+?[0-9][0-9 -]{6,14}$/.test(v)) return 'Please enter a valid mobile number.';
        return '';
    }
    return '';
  }

  var authRoot = null;

  function closeAuth() {
    if (authRoot) { authRoot.remove(); authRoot = null; }
    document.removeEventListener('keydown', onAuthKeydown);
  }
  function onAuthKeydown(e) { if (e.key === 'Escape') closeAuth(); }

  function authBodyHtml(mode) {
    var fields = AUTH_FIELDS[mode] || AUTH_FIELDS.login;
    var fieldsHtml = fields.map(function (f) {
      return (
        '<label class="mb-2 block text-body font-semibold text-ink-2">' + f.label + '</label>' +
        '<div class="relative mb-4">' +
        '<input data-field="' + f.name + '" type="' + f.type + '" placeholder="' + f.placeholder + '" class="a-input' + (f.eye ? ' pr-11' : '') + '">' +
        (f.eye ? '<button type="button" data-eye="' + f.name + '" class="absolute right-3 top-1/2 flex -translate-y-1/2 border-0 bg-transparent p-0 text-ink-3">' + iconSvg('eye') + '</button>' : '') +
        '</div>' +
        '<p data-error="' + f.name + '" class="-mt-2.5 mb-3 text-note text-danger" hidden></p>'
      );
    }).join('');
    return (
      fieldsHtml +
      (mode === 'login'
        ? '<div class="-mt-0.5 mb-[18px] flex items-center justify-between text-body"><label class="flex cursor-pointer items-center gap-2 text-ink-3"><input type="checkbox" class="accent-primary">Remember me</label><a class="a-link font-semibold" data-auth-goto="forgot">Forgot Password?</a></div>'
        : '') +
      '<button class="a-btn" type="button" data-auth-submit>' + (mode === 'register' ? 'Next Step' : mode === 'forgot' ? 'Send Reset Link' : 'Login') + '</button>' +
      (mode === 'login' ? '<p class="mb-0.5 mt-4 text-center text-body text-ink-3">Don’t have an account? <a class="a-link" data-auth-goto="register">Register</a></p>'
        : mode === 'register' ? '<p class="mb-0.5 mt-4 text-center text-body text-ink-3">Already have an account? <a class="a-link" data-auth-goto="login">Login</a></p>'
        : '<p class="mb-0.5 mt-4 text-center text-body text-ink-3">Remember your password? <a class="a-link" data-auth-goto="login">Back to Login</a></p>')
    );
  }

  function authResetSentHtml() {
    return (
      '<p class="mb-1.5 mt-2 text-center text-[15px] font-semibold text-primary">Reset link sent</p>' +
      '<p class="mb-5 text-center text-body text-ink-3">If the account exists, password reset instructions have been sent to your email.</p>' +
      '<button class="a-btn" type="button" data-auth-goto="login">Back to Login</button>'
    );
  }

  function applyLoggedInHeaderUI() {
    var T = D.T || {};
    $all('header').forEach(function (header) {
      var loginBtn = $all('button', header).filter(function (b) { return (b.textContent || '').trim() === T.login; })[0];
      var registerBtn = $all('button', header).filter(function (b) { return (b.textContent || '').trim() === T.register; })[0];
      if (!loginBtn || !registerBtn) return;
      var bar = loginBtn.parentElement;
      var html =
        '<a href="account.html" class="flex text-ink-2 hover:text-ink transition-colors" aria-label="Account">' + iconSvg('user', 'w-5 h-5') + '</a>' +
        '<a href="account.html" class="flex items-center gap-3 text-ink-2 hover:text-ink transition-colors whitespace-nowrap">' +
        '<span class="text-ink-2 font-semibold">' + escapeHtml(T.accountId) + ':</span>' +
        '<span class="text-ink font-semibold">meqomcao</span>' +
        '<span class="bg-g-primary text-on-primary text-sm font-bold px-3 py-1 rounded-full leading-none">VIP1</span></a>' +
        '<span class="h-5 w-px bg-line"></span>' +
        '<a href="account.html" class="flex items-center gap-2 whitespace-nowrap hover:opacity-90 transition-opacity">' +
        '<span class="text-ink-3 font-semibold">' + escapeHtml(T.accountBalance) + ':</span><span class="text-ink font-bold">₩1,000,000,000</span>' +
        '<span class="text-ink-3 font-semibold ml-2">' + escapeHtml(T.accountPoints) + ':</span><span class="text-ink font-bold">0.00</span></a>' +
        '<button type="button" class="flex text-ink-2 hover:text-ink transition-colors" data-logout aria-label="' + escapeHtml(T.logout) + '">' + iconSvg('log-out', 'w-5 h-5') + '</button>';
      loginBtn.remove();
      registerBtn.remove();
      bar.insertAdjacentHTML('afterbegin', html);
      on(bar.querySelector('[data-logout]'), 'click', function () { location.reload(); });
    });
  }

  function bindAuthBody(mode) {
    $all('[data-auth-goto]', authRoot).forEach(function (a) {
      on(a, 'click', function (e) { e.preventDefault(); openAuth(a.getAttribute('data-auth-goto')); });
    });
    $all('[data-eye]', authRoot).forEach(function (btn) {
      on(btn, 'click', function () {
        var input = authRoot.querySelector('[data-field="' + btn.getAttribute('data-eye') + '"]');
        if (!input) return;
        var showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        btn.classList.toggle('text-primary', !showing);
      });
    });
    var submitBtn = authRoot.querySelector('[data-auth-submit]');
    on(submitBtn, 'click', function () {
      if (mode === 'login') {
        authState.loggedIn = true;
        closeAuth();
        applyLoggedInHeaderUI();
        return;
      }
      var fields = AUTH_FIELDS[mode] || [];
      var values = {};
      fields.forEach(function (f) {
        var input = authRoot.querySelector('[data-field="' + f.name + '"]');
        values[f.name] = input ? input.value : '';
      });
      var ok = true;
      fields.forEach(function (f) {
        var msg = authFieldError(f.name, values);
        var errEl = authRoot.querySelector('[data-error="' + f.name + '"]');
        var inputEl = authRoot.querySelector('[data-field="' + f.name + '"]');
        if (msg) { ok = false; }
        if (errEl) { errEl.textContent = msg; errEl.hidden = !msg; }
        if (inputEl) inputEl.classList.toggle('input-ui-invalid', !!msg);
      });
      if (!ok) return;
      if (mode === 'forgot') {
        var body = authRoot.querySelector('[data-auth-body]');
        body.innerHTML = authResetSentHtml();
        bindAuthBody(mode);
        return;
      }
      authState.loggedIn = true;
      closeAuth();
      applyLoggedInHeaderUI();
    });
  }

  function openAuth(mode) {
    closeAuth();
    var title = AUTH_TITLES[mode] || 'Login';
    var wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-scrim/70 px-4 py-6" data-auth-overlay>' +
      '<div class="relative m-auto w-full max-w-[400px] rounded-2xl border border-line-soft bg-surface shadow-2xl">' +
      '<div class="flex items-center justify-between border-b border-line-soft px-[22px] py-[18px]">' +
      '<h3 class="m-0 text-lg font-bold text-ink">' + title + '</h3>' +
      '<button type="button" data-auth-close class="border-0 bg-transparent p-0 text-[22px] leading-none text-ink-3">×</button>' +
      '</div><div class="p-[22px]" data-auth-body>' + authBodyHtml(mode) + '</div></div></div>';
    authRoot = wrap.firstElementChild;
    document.body.appendChild(authRoot);
    document.addEventListener('keydown', onAuthKeydown);
    on(authRoot, 'click', function (e) { if (e.target === authRoot) closeAuth(); });
    on(authRoot.querySelector('[data-auth-close]'), 'click', closeAuth);
    bindAuthBody(mode);
  }

  function initAuthTriggers() {
    $all('header button').forEach(function (btn) {
      var text = (btn.textContent || '').trim();
      if (text === (D.T || {}).login) on(btn, 'click', function () { openAuth('login'); });
      else if (text === (D.T || {}).register) on(btn, 'click', function () { openAuth('register'); });
    });
  }

  /* ================================ banner =============================== */
  /* AppBanner.vue — index.html only, one slide server-rendered at a time. */

  function initBanner() {
    var section = document.querySelector('.campaign-hero');
    var banners = D.BANNERS || [];
    if (!section || !banners.length) return;

    var idx = 0;
    var initId = section.getAttribute('data-campaign');
    for (var bi = 0; bi < banners.length; bi++) { if (String(banners[bi].id) === String(initId)) { idx = bi; break; } }

    var media = section.querySelector('.campaign-hero-media');
    var eyebrowSpans = $all('.campaign-hero-eyebrow span', section);
    var badge = eyebrowSpans[eyebrowSpans.length - 1];
    var title = section.querySelector('.campaign-hero-title');
    var highlight = section.querySelector('.campaign-hero-highlight');
    var sub = section.querySelector('.campaign-hero-sub');
    var cta = section.querySelector('.campaign-hero-cta');
    var dots = $all('.campaign-hero-dot', section);
    var prevBtn = section.querySelector('.campaign-hero-arrow--prev');
    var nextBtn = section.querySelector('.campaign-hero-arrow--next');
    var timer = null;

    function render(i) {
      idx = i;
      var b = banners[idx];
      section.setAttribute('data-campaign', b.id);
      if (media) { media.src = b.img; media.alt = b.title; media.style.objectPosition = b.focalPoint || 'center'; media.hidden = false; }
      if (badge) badge.textContent = b.badge;
      if (title) title.textContent = b.title;
      if (highlight) highlight.textContent = b.highlight;
      if (sub) sub.textContent = b.sub;
      if (cta) cta.textContent = b.cta;
      dots.forEach(function (d, di) {
        var active = di === idx;
        d.classList.toggle('campaign-hero-dot--active', active);
        if (active) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function next() { render((idx + 1) % banners.length); }
    function prev() { render((idx - 1 + banners.length) % banners.length); }
    function restart() {
      if (timer) clearInterval(timer);
      timer = banners.length > 1 ? setInterval(next, 6000) : null;
    }
    on(prevBtn, 'click', function () { prev(); restart(); });
    on(nextBtn, 'click', function () { next(); restart(); });
    dots.forEach(function (d, di) { on(d, 'click', function () { render(di); restart(); }); });
    on(media, 'error', function () { media.hidden = true; });
    on(section, 'mouseenter', function () { if (timer) clearInterval(timer); });
    on(section, 'mouseleave', restart);

    var startX = 0;
    on(section, 'touchstart', function (e) { startX = e.touches[0] ? e.touches[0].clientX : 0; }, { passive: true });
    on(section, 'touchend', function (e) {
      var endX = (e.changedTouches[0] && e.changedTouches[0].clientX) || startX;
      var dx = endX - startX;
      if (dx < -40) next(); else if (dx > 40) prev();
      restart();
    });

    restart();
  }

  /* ============================ mini games grid =========================== */
  /* home/MiniGamesGrid.vue — index.html only. Tabs auto-advance every 8s via
     useCountdownTabs (250ms tick); rail prev/next move by visible-card-count
     via moveRail(). Markup for non-active tabs isn't in the static DOM, so
     panels are rebuilt from data.js on tab switch. */

  function miniGamesFor(key) {
    var names = (D.MINI_NAMES || {})[key] || [];
    if (key === 'live') {
      var tables = D.LIVE_TABLES || [];
      return names.map(function (title, i) {
        var t = tables.length ? tables[i % tables.length] : {};
        return { title: title, img: t.image, focalPoint: t.focalPoint || 'center' };
      });
    }
    var pool = D.MINI_IMG_POOL || [];
    return names.map(function (title, i) {
      return { title: title, img: pool.length ? pool[i % pool.length] : '', focalPoint: 'center' };
    });
  }
  function buildMiniCard(g) {
    return '<div data-game-card class="group w-28 flex-shrink-0 snap-start cursor-pointer md:w-32">' +
      '<div class="h-28 w-28 overflow-hidden rounded-lg border-2 border-line transition-colors group-hover:border-primary md:h-32 md:w-32">' +
      '<img src="' + g.img + '" alt="' + escapeHtml(g.title) + '" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" style="object-position:' + g.focalPoint + ';" loading="lazy"></div>' +
      '<h3 class="mt-2 truncate text-center text-xs text-ink md:text-sm">' + escapeHtml(g.title) + '</h3></div>';
  }

  function initMiniGamesGrid() {
    var keys = ['mini', 'slot', 'live'];
    var tabs = {};
    var i;
    for (i = 0; i < keys.length; i++) {
      tabs[keys[i]] = document.getElementById('games-tab-' + keys[i]);
      if (!tabs[keys[i]]) return;
    }
    var chip = document.querySelector('.mini-countdown-chip');
    var headerRight = chip ? chip.parentElement : null;
    var showAllLink = headerRight ? headerRight.querySelector('a') : null;
    var initialPanel = document.querySelector('[id^="games-panel-"]');
    var railWrap = initialPanel ? initialPanel.parentElement : null;
    if (!railWrap) return;

    var current = (initialPanel.id || 'games-panel-mini').replace('games-panel-', '');
    var INTERVAL = 8000;
    var remainingMs = INTERVAL;
    var tickHandle = null;

    function renderPanel(key) {
      var oldPanel = railWrap.querySelector('[id^="games-panel-"]');
      var games = miniGamesFor(key);
      var panel = document.createElement('div');
      panel.id = 'games-panel-' + key;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'games-tab-' + key);
      panel.className = 'scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-4 animate-slideIn';
      panel.innerHTML = games.map(buildMiniCard).join('');
      if (oldPanel) railWrap.replaceChild(panel, oldPanel); else railWrap.appendChild(panel);
    }

    function setActive(key, silent) {
      current = key;
      renderPanel(key);
      keys.forEach(function (k) {
        var btn = tabs[k];
        var active = k === key;
        btn.setAttribute('aria-selected', String(active));
        btn.setAttribute('aria-controls', 'games-panel-' + k);
        btn.tabIndex = active ? 0 : -1;
        if (active) {
          btn.classList.add('text-ink', 'bg-primary/10', 'border-primary/30');
          btn.classList.remove('text-ink-4', 'border-transparent', 'hover:border-line', 'hover:bg-surface', 'hover:text-ink-2');
          if (!btn.querySelector('.mini-countdown-bar')) {
            btn.insertAdjacentHTML('beforeend', '<span aria-hidden="true" class="mini-countdown-bar"><span style="width:100%"></span></span>');
          }
        } else {
          btn.classList.remove('text-ink', 'bg-primary/10', 'border-primary/30');
          btn.classList.add('text-ink-4', 'border-transparent', 'hover:border-line', 'hover:bg-surface', 'hover:text-ink-2');
          var oldBar = btn.querySelector('.mini-countdown-bar');
          if (oldBar) oldBar.remove();
        }
      });
      if (showAllLink && D.MINI_ROUTES) showAllLink.setAttribute('href', D.MINI_ROUTES[key]);
      if (!silent) restart();
    }

    function tick() {
      remainingMs -= 250;
      if (chip) chip.textContent = Math.max(1, Math.ceil(remainingMs / 1000)) + 's';
      var barSpan = tabs[current].querySelector('.mini-countdown-bar > span');
      if (barSpan) barSpan.style.width = Math.max(0, Math.min(100, (remainingMs / INTERVAL) * 100)) + '%';
      if (remainingMs <= 0) advance();
    }
    function advance() {
      var idx = keys.indexOf(current);
      setActive(keys[(idx + 1) % keys.length]);
    }
    function restart() { remainingMs = INTERVAL; }
    function startTimer() {
      if (tickHandle) clearInterval(tickHandle);
      tickHandle = setInterval(tick, 250);
    }

    keys.forEach(function (k) { on(tabs[k], 'click', function () { setActive(k); }); });

    var prevBtn = document.querySelector('[aria-label="Previous games"]');
    var nextBtn = document.querySelector('[aria-label="Next games"]');
    function moveRail(direction) {
      var rail = railWrap.querySelector('[id^="games-panel-"]');
      if (!rail) return;
      var card = rail.querySelector('[data-game-card]');
      var gap = parseFloat(getComputedStyle(rail).columnGap) || 12;
      var cardWidth = (card && card.offsetWidth) || 128;
      var visible = Math.max(1, Math.floor((rail.clientWidth + gap) / (cardWidth + gap)));
      var jump = (cardWidth + gap) * visible;
      var maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
      if (maxScroll <= 1) return;
      var target = direction > 0
        ? (rail.scrollLeft >= maxScroll - 2 ? 0 : Math.min(maxScroll, rail.scrollLeft + jump))
        : (rail.scrollLeft <= 2 ? maxScroll : Math.max(0, rail.scrollLeft - jump));
      restart();
      rail.scrollTo({ left: target, behavior: 'smooth' });
    }
    on(prevBtn, 'click', function () { moveRail(-1); });
    on(nextBtn, 'click', function () { moveRail(1); });

    restart();
    startTimer();
  }

  /* ============================ home rails (P1) =========================== */
  /* HotGamesRail / SportsPromo / Promotion(home) — index.html only. No shared
     class/aria-label on the chevrons, so scope by structural position: a
     ".flex items-center justify-between mb-4" header whose container also
     holds exactly one ".overflow-x-auto" rail. */

  function initHomeRails() {
    $all('.flex.items-center.justify-between.mb-4').forEach(function (header) {
      var container = header.parentElement;
      var rail = container ? container.querySelector('[class*="overflow-x-auto"]') : null;
      if (!rail) return;
      var buttons = $all('button', header).filter(function (b) { return b.querySelector('svg'); });
      if (buttons.length < 2) return;
      var prevBtn = buttons[buttons.length - 2];
      var nextBtn = buttons[buttons.length - 1];
      on(prevBtn, 'click', function () { rail.scrollBy({ left: -300, behavior: 'smooth' }); });
      on(nextBtn, 'click', function () { rail.scrollBy({ left: 300, behavior: 'smooth' }); });
    });
  }

  /* ============================== mode-tabs =============================== */
  /* Generic ".mode-tabs" active-toggle (deposit.html gateways, withdrawal.html
     Withdraw/Account Management) — CLAUDE.md convention: unified tab class. */

  function initModeTabsGeneric() {
    $all('.mode-tabs').forEach(function (tabs) {
      var buttons = $all(':scope > button', tabs);
      buttons.forEach(function (btn) {
        on(btn, 'click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      });
    });
    $all('.payment-tabs').forEach(function (tabs) {
      var buttons = $all(':scope > button', tabs);
      buttons.forEach(function (btn) {
        on(btn, 'click', function () {
          if (btn.style.display === 'none') return;
          buttons.forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
      });
    });
  }

  /* ---- deposit.html: gateway -> payment-method count filter + promo cards
     enabling Next + two-step (form -> transfer) reconstruction (P1) ---- */

  function initDepositFlow() {
    if (pageName() !== 'deposit') return;
    var gatewayTabs = document.querySelector('.mode-tabs');
    var paymentTabs = document.querySelector('.payment-tabs');
    if (!gatewayTabs || !paymentTabs) return;
    var gatewayBtns = $all(':scope > button', gatewayTabs);
    var methodBtns = $all(':scope > button', paymentTabs);
    var gateways = D.DEPOSIT_GATEWAYS || [{ methodCount: 4 }, { methodCount: 3 }, { methodCount: 2 }, { methodCount: 1 }];

    gatewayBtns.forEach(function (btn, i) {
      on(btn, 'click', function () {
        var count = (gateways[i] || {}).methodCount || methodBtns.length;
        methodBtns.forEach(function (m, mi) { m.style.display = mi < count ? '' : 'none'; });
        var activeMethod = paymentTabs.querySelector('button.active');
        if (!activeMethod || activeMethod.style.display === 'none') {
          methodBtns.forEach(function (b) { b.classList.remove('active'); });
          methodBtns[0].classList.add('active');
        }
      });
    });

    $all('.promo-card, .crypto-promo').forEach(function (card) {
      on(card, 'click', function () {
        var section = card.closest('section');
        var siblings = section ? $all('.promo-card, .crypto-promo', section) : [card];
        siblings.forEach(function (c) {
          c.classList.remove('selected');
          var dot = c.querySelector('.pay-radio');
          if (dot) dot.innerHTML = '';
        });
        card.classList.add('selected');
        var dot = card.querySelector('.pay-radio');
        if (dot) dot.innerHTML = '<span></span>';
        var actionBtn = section ? section.querySelector('.pay-action') : null;
        if (actionBtn) { actionBtn.classList.add('ready'); actionBtn.disabled = false; }
      });
    });

    on(document.querySelector('.pay-action'), 'click', function (e) {
      var btn = e.currentTarget;
      if (btn.disabled) return;
      var amountInput = document.querySelector('.pay-field[aria-label="Deposit amount"]');
      showDepositTransferStep(amountInput ? amountInput.value : '₩ 10,000');
    });
  }

  function showDepositTransferStep(amountVal) {
    var formCard = document.querySelector('.payment-card');
    var gatewayTabs = document.querySelector('.mode-tabs');
    var paymentTabs = document.querySelector('.payment-tabs');
    if (!formCard) return;
    [gatewayTabs, paymentTabs, formCard].forEach(function (el) { if (el) el.style.display = 'none'; });
    var section = document.createElement('section');
    section.className = 'payment-card transfer';
    section.innerHTML =
      '<div class="transfer-pill">Transfer Details</div>' +
      '<div class="trow"><span class="tlabel">Deposit Amount</span><span class="tamount">' + escapeHtml(amountVal) + '</span></div>' +
      '<div class="trow"><span class="tlabel">Deposit Account</span><span class="tvalue">wururu1234</span></div>' +
      '<p class="tnote">Once the transfer is complete, please click the "Complete" button below. Should you have any questions, please feel free to contact our Customer Service team.</p>' +
      '<p class="tcs"><a href="support.html">Customer Service</a></p>' +
      '<button type="button" class="complete" data-deposit-complete><span>Complete</span></button>';
    formCard.parentElement.insertBefore(section, formCard.nextSibling);
    on(section.querySelector('[data-deposit-complete]'), 'click', function () {
      showMemberModal({ type: 'success', message: 'Your deposit application has been submitted.' });
    });
  }

  /* =========================== vendor browser (P1) ========================= */
  /* VendorBrowser.vue — hot-games/live/slot/fish/mini-games. Event delegation
     on the shared container so rebuilt markup never needs re-binding. */

  function operationalMedia(kind, i) {
    var list = (D.VENDOR_MEDIA || {})[kind] || (D.VENDOR_MEDIA || {}).slot || [];
    if (!list.length) return { image: '', focalPoint: 'center' };
    var idx = ((i % list.length) + list.length) % list.length;
    return list[idx];
  }
  function buildVendorCard(name, i, kind) {
    var m = operationalMedia(kind, i);
    var isLive = kind === 'live';
    var T = D.T || {};
    return '<button type="button" class="vnd-card group relative isolate min-h-[136px] overflow-hidden">' +
      '<img src="' + m.image + '" alt="" aria-hidden="true" class="vnd-card-media absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style="object-position:' + m.focalPoint + ';" loading="lazy">' +
      '<div class="vnd-card-scrim absolute inset-0"></div>' +
      '<span class="relative z-[1] flex h-full w-full flex-col items-center justify-end gap-2 p-4">' +
      '<span class="vnd-name">' + escapeHtml(name) + '</span>' +
      (isLive ? '<span class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-deep/85 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] text-ink-2"><span class="h-1.5 w-1.5 rounded-full bg-danger animate-pulse"></span>' + escapeHtml(T.liveStudio) + '</span>' : '') +
      '</span></button>';
  }
  function buildGameCard(provider, i, kind) {
    var isLive = kind === 'live';
    var m = operationalMedia(kind, i);
    var T = D.T || {};
    var title = isLive ? (D.LIVE_GAME_NAMES || ['Game'])[i % (D.LIVE_GAME_NAMES || ['Game']).length] : T.gamePlaceholder;
    return '<div class="group cursor-pointer overflow-hidden rounded-lg border border-line-soft bg-surface transition-colors hover:border-primary">' +
      '<div class="aspect-[4/3] relative overflow-hidden">' +
      '<img src="' + m.image + '" alt="' + escapeHtml(title) + '" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style="object-position:' + m.focalPoint + ';" loading="lazy">' +
      (isLive ? '<div class="absolute inset-0 bg-gradient-to-t from-surface-deep/65 via-transparent to-transparent"></div><span class="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-deep/90 px-2 py-1 text-[10px] font-extrabold tracking-[0.12em] text-ink"><span class="h-1.5 w-1.5 rounded-full bg-danger animate-pulse"></span>' + escapeHtml(T.liveDealer) + '</span>' : '') +
      '</div><div class="p-4"><h3 class="mb-1 truncate text-ink">' + escapeHtml(title) + '</h3><p class="mb-3 truncate text-note text-ink-3">' + escapeHtml(provider) + '</p><button type="button" class="btn-primary btn-sm w-full">' + escapeHtml(T.playNow) + '</button></div></div>';
  }

  function initVendorBrowser() {
    var KIND_MAP = { 'hot-games': 'hot-games', live: 'live', slot: 'slot', fish: 'fish', 'mini-games': 'mini-games' };
    var kind = KIND_MAP[pageName()];
    if (!kind) return;
    var head = document.querySelector('.vnd-head');
    if (!head) return;
    var container = head.parentElement;
    var direct = kind === 'hot-games';
    var vendors = (kind === 'live' ? D.LIVE_VENDORS : D.SLOT_VENDORS) || [];
    var titleEl = head.querySelector('.vnd-title');
    var titleBase = titleEl ? titleEl.textContent.trim() : '';
    var searchInput = head.querySelector('.vnd-search input');
    var T = D.T || {};
    var MAX_LOADS = 3;
    var state = { provider: null, loads: 0, q: '' };

    function filteredVendors() {
      var s = state.q.trim().toLowerCase();
      return !s ? vendors : vendors.filter(function (v) { return v.toLowerCase().indexOf(s) !== -1; });
    }
    function gamesList() {
      var base = direct ? 30 : 24;
      var total = base + state.loads * 12;
      var list = [];
      var k;
      if (direct) {
        for (k = 0; k < total; k++) list.push({ provider: vendors[k % vendors.length], i: k });
      } else if (state.provider) {
        for (k = 0; k < total; k++) list.push({ provider: state.provider, i: k });
      }
      var s = state.q.trim().toLowerCase();
      return s ? list.filter(function (g) { return g.provider.toLowerCase().indexOf(s) !== -1; }) : list;
    }
    function renderTitle() {
      if (!titleEl) return;
      if (state.provider) {
        titleEl.classList.add('vnd-title-inline');
        titleEl.innerHTML = '<span>' + escapeHtml(titleBase) + '</span><span class="vnd-provider-badge">' + escapeHtml(state.provider) + '</span>';
      } else {
        titleEl.classList.remove('vnd-title-inline');
        titleEl.textContent = titleBase;
      }
    }
    function renderBack() {
      var existing = container.querySelector('.btn-back');
      var showBack = !direct && !!state.provider;
      if (showBack && !existing) {
        var wrap = document.createElement('div');
        wrap.className = 'pb-[18px]';
        wrap.innerHTML = '<button type="button" class="btn-back">' + iconSvg('back', '') + '<span>' + escapeHtml(T.back) + '</span></button>';
        container.insertBefore(wrap, head);
      } else if (!showBack && existing) {
        existing.parentElement.remove();
      }
    }
    function updateLoadMore(show) {
      var wrap = container.querySelector('.cms-load-more-wrap');
      if (show && state.loads < MAX_LOADS) {
        if (!wrap) {
          wrap = document.createElement('div');
          wrap.className = 'cms-load-more-wrap mt-8 flex justify-center';
          wrap.innerHTML = '<button type="button" class="cms-load-more-button rounded-lg px-8 py-3 transition-colors">' + escapeHtml(T.loadMore) + '</button>';
          container.appendChild(wrap);
        }
      } else if (wrap) {
        wrap.remove();
      }
    }
    function renderGrid() {
      var showingVendors = !direct && !state.provider;
      var oldVnd = container.querySelector('.vnd-grid');
      var oldGame = container.querySelector('.grid.grid-cols-2');
      if (showingVendors) {
        if (oldGame) oldGame.remove();
        var grid = oldVnd;
        if (!grid) { grid = document.createElement('div'); grid.className = 'vnd-grid'; container.appendChild(grid); }
        grid.innerHTML = filteredVendors().map(function (v, i) { return buildVendorCard(v, i, kind); }).join('');
        updateLoadMore(false);
      } else {
        if (oldVnd) oldVnd.remove();
        var gGrid = oldGame;
        if (!gGrid) { gGrid = document.createElement('div'); gGrid.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'; container.appendChild(gGrid); }
        gGrid.innerHTML = gamesList().map(function (g) { return buildGameCard(g.provider, g.i, kind); }).join('');
        updateLoadMore(true);
      }
    }
    function renderAll() { renderBack(); renderTitle(); renderGrid(); }

    on(searchInput, 'input', function () { state.q = searchInput.value; renderGrid(); });

    on(container, 'click', function (e) {
      var backBtn = e.target.closest('.btn-back');
      if (backBtn) { state.provider = null; state.loads = 0; renderAll(); return; }
      var loadBtn = e.target.closest('.cms-load-more-button');
      if (loadBtn) { if (state.loads < MAX_LOADS) { state.loads++; renderGrid(); } return; }
      var vCard = e.target.closest('.vnd-card');
      if (vCard && !direct) {
        var nameEl = vCard.querySelector('.vnd-name');
        state.provider = nameEl ? nameEl.textContent.trim() : '';
        state.loads = 0;
        renderAll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  /* ============================ about.html tabs =========================== */
  /* about.vue — all 8 panels are v-show (already in the static DOM, just
     hidden), so this is pure show/hide + a FAQ accordion. */

  function initAboutTabs() {
    if (pageName() !== 'about') return;
    var tabsWrap = document.querySelector('.border-b.border-line-soft.mb-7');
    if (!tabsWrap) return;
    var buttons = $all('button', tabsWrap);
    var panels = [];
    var node = tabsWrap.nextElementSibling;
    while (node && panels.length < buttons.length) { panels.push(node); node = node.nextElementSibling; }
    if (!buttons.length || panels.length !== buttons.length) return;

    function setActive(i) {
      buttons.forEach(function (b, bi) {
        b.classList.toggle('text-primary', bi === i);
        b.classList.toggle('text-ink-3', bi !== i);
      });
      panels.forEach(function (p, pi) { p.style.display = pi === i ? '' : 'none'; });
    }
    buttons.forEach(function (b, i) { on(b, 'click', function () { setActive(i); }); });

    /* Deep link (?tab=faq etc.): panels carry no ids in the static markup, so
       match against the tab keys from about.vue (= lowercased button labels). */
    var qs = new URLSearchParams(location.search);
    var qtab = (qs.get('tab') || '').toLowerCase();
    if (qtab) {
      buttons.forEach(function (b, bi) {
        if ((b.textContent || '').trim().toLowerCase() === qtab) setActive(bi);
      });
    }

    var faqPanel = panels[panels.length - 1];
    $all('.card-ui', faqPanel).forEach(function (card) {
      var btn = card.querySelector('button');
      var body = card.querySelector('div.overflow-hidden');
      var chevron = btn ? btn.querySelector('svg') : null;
      if (!btn || !body) return;
      on(btn, 'click', function () {
        var open = body.classList.contains('max-h-[600px]');
        if (open) {
          body.classList.remove('max-h-[600px]', 'pb-[18px]');
          body.classList.add('max-h-0');
        } else {
          body.classList.remove('max-h-0');
          body.classList.add('max-h-[600px]', 'pb-[18px]');
        }
        if (chevron) chevron.classList.toggle('rotate-180', !open);
      });
    });
  }

  /* ============================ promotion detail =========================== */
  /* pages/promotion.vue PROMOS[] + list/detail toggle via ?detail=<id>. The
     "Detail" / "查看詳情" buttons exist in two places: promotion.html's own
     grid (in-page toggle) and the homepage's mini Promotion section, whose
     button navigates cross-page with the same query param (matches
     Promotion.vue's goDetail() -> router.push({path:'/promotion', query})). */

  function findPromoDetailButtons() {
    return $all('button').filter(function (b) {
      var t = (b.textContent || '').trim();
      return t === 'Detail' || t === '查看詳情';
    });
  }
  function promoById(id) {
    return (D.PROMOS || []).filter(function (p) { return p.id === id; })[0];
  }
  function promoByTitle(title) {
    return (D.PROMOS || []).filter(function (p) { return p.title === title; })[0];
  }

  function buildPromoDetailHtml(p) {
    return '' +
      '<div class="mx-auto max-w-[1180px] text-ink" data-promo-detail>' +
      '<button type="button" class="btn-back mb-[22px] text-base md:mb-7 md:text-[15px]" aria-label="Back" data-promo-back>' +
      iconSvg('back') + '<span>Back</span></button>' +
      '<div class="flex flex-col items-center gap-7">' +
      '<h2 class="inline-flex items-center m-0 text-ink text-[28px] md:text-display font-extrabold leading-none">Promotion</h2>' +
      '<div class="promotion-detail-poster-bg relative w-full max-w-[760px] overflow-hidden rounded-lg border border-primary/[0.26] shadow-[0_24px_70px_rgba(0,0,0,0.34)] px-[22px] pt-9 pb-8 text-center md:px-[54px] md:pt-[46px] md:pb-[42px]">' +
      '<img src="' + p.img + '" alt="" aria-hidden="true" class="operation-promo-poster-media absolute inset-0 h-full w-full object-cover" style="object-position:' + p.focalPoint + ';">' +
      '<div class="operation-promo-poster-scrim absolute inset-0"></div>' +
      '<div class="relative z-[1] flex min-h-[640px] flex-col items-center justify-between gap-[26px] md:min-h-[680px]">' +
      '<img class="h-[42px] object-contain mix-blend-lighten" src="logo.png" alt="WIN100%">' +
      '<div>' +
      '<p class="m-0 text-primary text-body font-extrabold tracking-[0.22em] uppercase">Special Offer</p>' +
      '<h3 class="text-gradient-primary mt-2 text-[36px] md:text-[50px] font-extrabold leading-[1.08] tracking-normal">' + escapeHtml(p.headline) + '</h3>' +
      '<p class="mt-3 text-ink text-[19px] md:text-[22px] font-extrabold">' + escapeHtml(p.title) + '</p>' +
      '</div>' +
      '<div class="mt-0.5 grid w-full grid-cols-1 gap-[22px] md:grid-cols-2 md:gap-[18px]">' +
      '<div class="relative rounded-lg border border-primary/[0.24] bg-surface-deep px-[18px] pt-7 pb-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">' +
      '<div class="absolute -top-[15px] left-1/2 flex h-7 w-[34px] -translate-x-1/2 items-center justify-center rounded-full bg-g-primary text-surface-deep text-body font-extrabold shadow-[0_8px_18px_rgba(0,0,0,0.28)]">1</div>' +
      '<h4 class="mb-2.5 text-primary-soft text-[19px] font-extrabold">' + escapeHtml(p.primary) + '</h4>' +
      '<strong class="block text-ink text-display leading-none">' + escapeHtml(p.primaryRate) + '</strong>' +
      '<span class="block mt-2.5 text-ink-3 text-body font-bold">Max reward / rollover applies</span>' +
      '</div>' +
      '<div class="relative rounded-lg border border-primary/[0.24] bg-surface-deep px-[18px] pt-7 pb-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">' +
      '<div class="absolute -top-[15px] left-1/2 flex h-7 w-[34px] -translate-x-1/2 items-center justify-center rounded-full bg-g-primary text-surface-deep text-body font-extrabold shadow-[0_8px_18px_rgba(0,0,0,0.28)]">2</div>' +
      '<h4 class="mb-2.5 text-primary-soft text-[19px] font-extrabold">' + escapeHtml(p.secondary) + '</h4>' +
      '<strong class="block text-ink text-display leading-none">' + escapeHtml(p.secondaryRate) + '</strong>' +
      '<span class="block mt-2.5 text-ink-3 text-body font-bold">Max reward / rollover applies</span>' +
      '</div>' +
      '</div>' +
      '<div class="w-full m-0 py-[18px] px-5 md:py-[22px] md:px-[26px] rounded-lg border border-primary/[0.18] bg-surface-deep/[0.78] text-left">' +
      '<h4 class="m-0 mb-3 text-center text-primary-soft text-h2">Promotion Terms</h4>' +
      '<ol class="m-0 pl-[18px] text-ink-2 text-sm leading-[1.7] md:text-[15px]">' +
      '<li>Bonus rewards are calculated from eligible deposits and game turnover.</li>' +
      '<li>Cancelled bets, refunds, cashouts, and invalid results are not included.</li>' +
      '<li>Members must keep an active balance and meet rollover requirements.</li>' +
      '<li>Each completed promotion can only be claimed once.</li>' +
      '</ol>' +
      '</div>' +
      '<button class="w-full max-w-[420px] border-0 rounded-lg bg-g-primary text-on-primary text-[17px] font-extrabold px-[18px] py-3.5 cursor-pointer transition-opacity hover:opacity-[0.88]" type="button">Claim Promotion</button>' +
      '<p class="m-0 text-ink-3 text-[13px] leading-[1.6]">win100% reserves the right to adjust, pause, or end this promotion at any time.</p>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  function initPromotionDetail() {
    var PROMOS = D.PROMOS || [];
    if (!PROMOS.length) return;

    var listSection = null;
    var heroSection = document.querySelector('.category-hero-media');
    var mount = null;
    var detailRoot = null;

    function backToList() {
      if (window.history && history.replaceState) history.replaceState(null, '', 'promotion.html');
      if (detailRoot) { detailRoot.remove(); detailRoot = null; }
      if (listSection) listSection.style.display = '';
      if (heroSection) heroSection.style.display = '';
    }
    function showDetail(id) {
      if (!listSection || !mount) return;
      var p = promoById(id) || PROMOS[0];
      if (window.history && history.replaceState) history.replaceState(null, '', 'promotion.html?detail=' + encodeURIComponent(p.id));
      listSection.style.display = 'none';
      if (heroSection) heroSection.style.display = 'none';
      if (detailRoot) detailRoot.remove();
      detailRoot = document.createElement('div');
      detailRoot.innerHTML = buildPromoDetailHtml(p);
      mount.insertBefore(detailRoot, listSection);
      on(detailRoot.querySelector('[data-promo-back]'), 'click', backToList);
      window.scrollTo(0, 0);
    }

    if (pageName() === 'promotion') {
      var firstCard = $all('[class*="cursor-pointer"]').filter(function (el) { return el.querySelector('h3'); })[0];
      listSection = firstCard ? firstCard.closest('section') : null;
      mount = listSection ? listSection.parentElement : null;
    }

    findPromoDetailButtons().forEach(function (btn) {
      var card = btn.closest('[class*="cursor-pointer"]');
      var h3 = card && card.querySelector('h3');
      var promo = h3 && promoByTitle(h3.textContent.trim());
      if (!promo) return;
      on(btn, 'click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (pageName() === 'promotion') showDetail(promo.id);
        else location.href = 'promotion.html?detail=' + encodeURIComponent(promo.id);
      });
    });

    if (pageName() !== 'promotion' || !listSection) return;
    var qs = new URLSearchParams(location.search);
    var initial = qs.get('detail');
    if (initial) showDetail(initial);
  }

  /* ========================== sport.html extras (P1) ======================= */

  function initSportProviderTabs() {
    if (pageName() !== 'sport') return;
    var wrap = document.querySelector('.border-b.border-line-soft.mb-8');
    if (!wrap) return;
    var buttons = $all('button', wrap).filter(function (b) { return b.parentElement === wrap; });
    if (buttons.length !== 3) return;
    function activate(btn) {
      buttons.forEach(function (o) {
        var bar = o.querySelector('.absolute.bottom-0');
        if (bar) bar.remove();
        o.classList.remove('text-primary');
        o.classList.add('text-ink-3', 'hover:text-ink-2');
      });
      btn.classList.remove('text-ink-3', 'hover:text-ink-2');
      btn.classList.add('text-primary');
      btn.insertAdjacentHTML('beforeend', '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-g-primary"></div>');
    }
    buttons.forEach(function (b) { on(b, 'click', function () { activate(b); }); });
    var qs = new URLSearchParams(location.search);
    var tab = qs.get('tab');
    if (tab) {
      var match = buttons.filter(function (b) { return b.textContent.trim().indexOf(tab) === 0; })[0];
      if (match) activate(match);
    }
  }

  function initSportLoadMore() {
    if (pageName() !== 'sport') return;
    var matches = D.SPORT_MATCHES || [];
    var grid = document.querySelector('.grid.grid-cols-1.sm\\:grid-cols-2');
    var wrap = document.querySelector('.cms-load-more-wrap');
    if (!grid || !matches.length) return;
    var loads = 0;
    var MAX_LOADS = 3;
    var STAR = '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>';
    var RADIO = '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>';
    function card(m) {
      return '<div class="cursor-pointer bg-surface border border-line-soft rounded-xl hover:border-primary transition-colors"><div class="p-4">' +
        '<div class="flex items-center justify-between mb-3"><span class="text-ink-4 text-[10px] truncate max-w-[120px]">' + escapeHtml(m.league) + '</span>' +
        '<div class="flex items-center gap-2"><button class="focus:outline-none transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 text-ink-4">' + STAR + '</svg></button>' +
        '<span class="flex items-center gap-1 text-[10px] bg-danger/20 text-danger border border-danger/30 px-1.5 py-0.5 rounded"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 animate-pulse">' + RADIO + '</svg>LIVE</span></div></div>' +
        '<div class="flex items-center justify-between gap-2 mb-4">' +
        '<div class="flex flex-col items-center gap-1.5 flex-1"><div class="w-9 h-9 rounded-full bg-surface-deep border border-line flex items-center justify-center"><span class="text-[10px] text-ink-2 font-semibold">' + escapeHtml(m.home.abbr) + '</span></div><span class="text-ink text-[10px] text-center leading-tight">' + escapeHtml(m.home.name) + '</span></div>' +
        '<div class="text-center flex-shrink-0"><div class="text-primary text-xl font-bold leading-none">' + escapeHtml(m.score) + '</div><div class="text-ink-4 text-[10px] mt-0.5">' + escapeHtml(m.time) + '</div></div>' +
        '<div class="flex flex-col items-center gap-1.5 flex-1"><div class="w-9 h-9 rounded-full bg-surface-deep border border-line flex items-center justify-center"><span class="text-[10px] text-ink-2 font-semibold">' + escapeHtml(m.away.abbr) + '</span></div><span class="text-ink text-[10px] text-center leading-tight">' + escapeHtml(m.away.name) + '</span></div>' +
        '</div><button class="w-full py-1.5 rounded-lg text-xs text-on-primary transition-opacity hover:opacity-90 bg-g-primary">Place Bet</button></div></div>';
    }
    var btn = wrap ? wrap.querySelector('button') : null;
    on(btn, 'click', function () {
      if (loads >= MAX_LOADS) return;
      loads++;
      grid.insertAdjacentHTML('beforeend', matches.map(card).join(''));
      if (loads >= MAX_LOADS && wrap) wrap.remove();
    });
  }

  /* ======================= member modal + member pages ===================== */

  var memberModalRoot = null;
  function closeMemberModal() { if (memberModalRoot) { memberModalRoot.remove(); memberModalRoot = null; } }
  function showMemberModal(opts) {
    closeMemberModal();
    var type = opts.type || 'success';
    var title = opts.title || (type === 'warning' ? 'Warning' : type === 'confirm' ? 'Confirmation' : type === 'danger' ? 'Delete Account?' : 'Success!');
    var message = opts.message != null ? opts.message : (type === 'success' ? 'Profile updated successfully.' : '');
    var confirmText = opts.confirmText || (type === 'confirm' ? 'Yes' : type === 'danger' ? 'Delete' : 'Got It');
    var cancelText = opts.cancelText || (type === 'danger' ? 'Cancel' : 'No');
    var ICON = {
      success: { d: '<path d="M20 6 9 17l-5-5"/>', w: 3 },
      warning: { d: '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', w: 2 },
      danger: { d: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 15H6L5 6"/><path d="M10 11v5M14 11v5"/>', w: 2.2 },
      confirm: { d: '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', w: 2.4 },
    };
    var ic = ICON[type] || ICON.success;
    var wrap = document.createElement('div');
    wrap.className = 'mf-overlay';
    wrap.innerHTML =
      '<div class="mf-modal' + (type === 'danger' ? ' mf-modal-danger' : '') + '" role="dialog" aria-modal="true">' +
      '<div class="mf-modal-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + ic.w + '" stroke-linecap="round" stroke-linejoin="round">' + ic.d + '</svg></div>' +
      '<h3 class="mf-modal-title">' + escapeHtml(title) + '</h3>' +
      (type === 'danger'
        ? '<p class="mf-modal-msg">Are you sure you want to remove <strong>' + escapeHtml(opts.subject || 'this bank account') + '</strong>?<br>This action cannot be undone.</p>'
        : (message ? '<p class="mf-modal-msg">' + escapeHtml(message) + '</p>' : '')) +
      '<button type="button" class="mf-modal-btn' + (type === 'danger' ? ' danger-confirm' : '') + '" data-mf-confirm>' + escapeHtml(confirmText) + '</button>' +
      ((type === 'confirm' || type === 'danger') ? '<button type="button" class="mf-modal-btn secondary" data-mf-cancel>' + escapeHtml(cancelText) + '</button>' : '') +
      '</div>';
    document.body.appendChild(wrap);
    memberModalRoot = wrap;
    on(wrap, 'click', function (e) { if (e.target === wrap) closeMemberModal(); });
    on(wrap.querySelector('[data-mf-confirm]'), 'click', function () { closeMemberModal(); if (opts.onConfirm) opts.onConfirm(); });
    on(wrap.querySelector('[data-mf-cancel]'), 'click', function () { closeMemberModal(); if (opts.onCancel) opts.onCancel(); });
  }

  /* ---- useMemberPage port: password eye toggle (.absolute buttons, e.g.
     withdrawal.html), quick-amount select, promo radio, legacy status menu -- */

  function initMemberPageBehaviors() {
    var root = document.querySelector('main') || document.body;
    var AMT_RE = /^\d{1,3}(,\d{3})+$/;
    var STATUSES = ['All', 'Pending', 'Approved', 'Rejected'];

    function closeStatusMenus() { $all('.rb-status-menu', root).forEach(function (m) { m.remove(); }); }
    function rowStatus(row) {
      var spans = $all('span', row).map(function (x) { return (x.textContent || '').trim(); });
      return spans.filter(function (t) { return /^(Approved|Pending|Rejected|Completed)$/.test(t); })[0] || '';
    }
    function filterRows(status) {
      $all('table tr', root).forEach(function (tr) {
        if (tr.querySelector('th')) return;
        var st = rowStatus(tr);
        if (!st) return;
        tr.style.display = (status === 'All' || st === status) ? '' : 'none';
      });
    }

    on(root, 'click', function (e) {
      var target = e.target;

      var eye = target.closest('button[type="button"]');
      if (eye && eye.querySelector('svg') && /absolute/.test(eye.className)) {
        var inp = eye.parentElement ? eye.parentElement.querySelector('input') : null;
        if (inp && (inp.type === 'password' || inp.dataset.pw === '1')) {
          e.preventDefault();
          inp.dataset.pw = '1';
          inp.type = inp.type === 'password' ? 'text' : 'password';
          return;
        }
      }

      var opt = target.closest('.rb-status-opt');
      if (opt) {
        var status = opt.getAttribute('data-status');
        var trig = root.querySelector('.rb-status-trigger');
        if (trig) trig.textContent = status;
        filterRows(status);
        closeStatusMenus();
        return;
      }

      /* Status filter trigger: RecordPage.vue renders this as a UiSelect
         (PrimeVue Select), baked into the static HTML as a `.p-select` /
         [role=combobox] widget (label defaults to "All") — there is no
         "Status: X" text button in the real markup, PrimeVue's own JS runtime
         (removed along with the rest of Vue/Nuxt) drove the listbox. Rebuild
         that interaction here, reusing the existing STATUSES/filterRows
         logic and the site-wide .dd-panel dropdown look. Only present on
         deposit-record / withdrawal-record / account-record (betting-record
         and profit-loss have no status column, see stores/records.ts). */
      var pSelect = target.closest('.p-select');
      if (pSelect) {
        e.preventDefault();
        if (root.querySelector('.rb-status-menu')) { closeStatusMenus(); return; }
        var label = pSelect.querySelector('.p-select-label') || pSelect;
        label.classList.add('rb-status-trigger');
        var menu = document.createElement('div');
        menu.className = 'rb-status-menu dd-panel left-0';
        STATUSES.forEach(function (s) {
          var o = document.createElement('div');
          o.className = 'rb-status-opt cursor-pointer whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm hover:bg-surface-deep';
          o.setAttribute('data-status', s);
          o.textContent = s;
          menu.appendChild(o);
        });
        pSelect.style.position = 'relative';
        pSelect.appendChild(menu);
        return;
      }

      var trig2 = target.closest('button');
      if (trig2 && AMT_RE.test((trig2.textContent || '').trim())) {
        var grid = trig2.parentElement;
        $all('button', grid).forEach(function (x) {
          if (AMT_RE.test((x.textContent || '').trim())) {
            x.style.background = '#0f1419'; x.style.color = '#fff'; x.style.border = '1px solid #374151';
          }
        });
        trig2.style.background = '#313E40'; trig2.style.color = '#AAE5D3'; trig2.style.border = '1px solid transparent';
        var amt = (trig2.textContent || '').trim();
        var input = $all('input', root).filter(function (i) { return /₩/.test(i.getAttribute('placeholder') || '') || /₩/.test(i.value || ''); })[0];
        if (input) input.value = '₩ ' + amt;
        return;
      }

      var card = target.closest('.items-start');
      if (card) {
        var radio = card.querySelector('div.w-5.rounded-full.border-2');
        if (radio && card.querySelector('h3')) {
          $all('div.w-5.rounded-full.border-2', root).forEach(function (rr) { rr.style.borderColor = '#4b5563'; rr.innerHTML = ''; });
          radio.style.borderColor = '#98E7D2';
          radio.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:#98E7D2"></div>';
        }
      }

      if (!target.closest('.rb-status-menu')) closeStatusMenus();
    });
  }

  /* ---- .mf-eye password toggles (banking-details / change-password) ---- */

  function initMfEyeToggles() {
    $all('.mf-eye').forEach(function (btn) {
      on(btn, 'click', function () {
        var input = btn.previousElementSibling;
        if (input && input.tagName === 'INPUT') input.type = input.type === 'password' ? 'text' : 'password';
      });
    });
  }

  /* ---- account.html + withdrawal.html bank account carousels (P1) ---- */

  function initAccountBankCarousel() {
    if (pageName() !== 'account') return;
    var prevBtn = document.querySelector('[aria-label="Previous bank account"]');
    var nextBtn = document.querySelector('[aria-label="Next bank account"]');
    var deleteBtn = document.querySelector('[aria-label="Delete bank account"]');
    var counter = prevBtn ? prevBtn.nextElementSibling : null;
    var cardIcon = document.querySelector('.lucide-credit-card');
    var numSpan = cardIcon ? cardIcon.parentElement.querySelector('span') : null;
    var buildingIcon = document.querySelector('.lucide-building');
    var bankRow = buildingIcon ? buildingIcon.parentElement : null;
    var bankSpan = bankRow ? bankRow.querySelector('span') : null;
    if (!prevBtn || !nextBtn || !numSpan || !bankSpan) return;

    var accounts = (D.BANK_ACCOUNTS || []).slice();
    var idx = 0;
    function render() {
      if (!accounts.length) return;
      var a = accounts[idx];
      numSpan.textContent = a.num;
      bankSpan.textContent = a.bank;
      if (counter) counter.textContent = (idx + 1) + '/' + accounts.length;
    }
    on(prevBtn, 'click', function () { if (accounts.length) { idx = (idx - 1 + accounts.length) % accounts.length; render(); } });
    on(nextBtn, 'click', function () { if (accounts.length) { idx = (idx + 1) % accounts.length; render(); } });
    on(deleteBtn, 'click', function () {
      var a = accounts[idx];
      showMemberModal({
        type: 'danger',
        subject: a ? a.bank : 'this bank account',
        onConfirm: function () {
          accounts.splice(idx, 1);
          if (idx >= accounts.length) idx = Math.max(0, accounts.length - 1);
          if (!accounts.length && bankRow) {
            var listBlock = bankRow.closest('.space-y-3');
            if (listBlock) listBlock.innerHTML = '<p class="text-ink-4 text-sm md:text-base">No bank account</p><a class="text-primary hover:text-primary-soft text-sm transition-colors" href="banking-details.html?add=1">+ Add New Bank Account</a>';
          } else {
            render();
          }
          showMemberModal({ type: 'success', message: 'Bank account deleted successfully.' });
        },
      });
    });
  }

  function initWithdrawalBankCarousel() {
    if (pageName() !== 'withdrawal') return;
    var prevBtn = document.querySelector('.accts-nav[aria-label="Previous"]');
    var nextBtn = document.querySelector('.accts-nav[aria-label="Next"]');
    var card = document.querySelector('.bound-card');
    var titleSpan = document.querySelector('.accts-title span');
    if (!prevBtn || !nextBtn || !card) return;
    var accounts = D.BANK_ACCOUNTS || [];
    var idx = 0;
    function acctTail(num) {
      var digits = (num || '').replace(/\D/g, '');
      return '＊＊＊＊' + (digits.slice(-4) || '0000');
    }
    function render() {
      var a = accounts[idx];
      if (!a) return;
      var pill = card.querySelector('.bound-pill');
      var val = card.querySelector('.bn-value');
      var name = card.querySelector('.bound-name');
      var dateB = card.querySelector('.bound-date b');
      if (pill) pill.textContent = a.bank;
      if (val) val.textContent = acctTail(a.num);
      if (name) name.textContent = a.holder;
      if (dateB) dateB.textContent = a.bindDate;
      if (titleSpan) titleSpan.textContent = (idx + 1) + ' / ' + accounts.length;
    }
    on(prevBtn, 'click', function () { if (accounts.length) { idx = (idx - 1 + accounts.length) % accounts.length; render(); } });
    on(nextBtn, 'click', function () { if (accounts.length) { idx = (idx + 1) % accounts.length; render(); } });
  }

  /* ---- generic "ready" gate: enable a submit button once inputs are filled -- */

  function bindReadyGate(button, inputs, applyState) {
    if (!button) return function () { return false; };
    function check() {
      var ok = inputs.every(function (i) {
        if (!i) return false;
        if (i.type === 'checkbox') return i.checked;
        return (i.value || '').trim() !== '';
      });
      applyState(ok);
      return ok;
    }
    inputs.forEach(function (i) { if (i) { on(i, 'input', check); on(i, 'change', check); } });
    check();
    return check;
  }

  /* ---- withdrawal.html: main submit + 3 inert (ready-gate only) sub-forms -- */

  function initWithdrawalForms() {
    if (pageName() !== 'withdrawal') return;
    var sections = $all('.payment-card');
    if (!sections.length) return;

    var mainAmount = document.querySelector('input.pay-field[placeholder^="₩ 10,000"]');
    var mainSubmit = $all('button').filter(function (b) { return /submit-ready|submit-idle/.test(b.className); })[0];
    if (mainAmount && mainSubmit) {
      var pwInput = mainAmount.parentElement ? null : null;
      var allInputs = $all('.payment-card input');
      var amountEl = allInputs.filter(function (i) { return /₩\s*10,000/.test(i.getAttribute('placeholder') || ''); })[0];
      var passwordEl = allInputs.filter(function (i) { return i.type === 'password' || i.dataset.pw === '1'; })[0];
      bindReadyGate(mainSubmit, [amountEl, passwordEl], function (ok) {
        mainSubmit.classList.toggle('submit-ready', ok);
        mainSubmit.classList.toggle('submit-idle', !ok);
        mainSubmit.disabled = !ok;
      });
      on(mainSubmit, 'click', function () {
        if (!amountEl || !passwordEl) return;
        if (!amountEl.value.trim() || !passwordEl.value.trim()) return;
        showMemberModal({ type: 'success', message: 'Withdrawal request submitted successfully.' });
      });
    }

    $all('.pay-action').forEach(function (btn) {
      var card = btn.closest('.payment-card');
      if (!card) return;
      var inputs = $all('input, select', card).filter(function (i) { return i.type !== 'password' || true; });
      bindReadyGate(btn, inputs, function (ok) { btn.classList.toggle('ready', ok); btn.disabled = !ok; });
    });
  }

  /* ---- personal-info / change-password / change-nickname / banking-details -- */

  function initPersonalInfoPage() {
    if (pageName() !== 'personal-info') return;
    var btn = $all('button').filter(function (b) { return b.textContent.trim() === 'Submit'; })[0];
    on(btn, 'click', function () { showMemberModal({ type: 'success', message: 'Profile updated successfully.' }); });
  }

  function initChangePasswordPage() {
    if (pageName() !== 'change-password') return;
    var card = document.querySelector('.mf-card');
    if (!card) return;
    var isTxn = /type=txn/.test(location.search);
    var inputs = $all('.mf-input', card);
    var newPw = inputs[0], confirmPw = inputs[1];
    var submitBtn = card.querySelector('.mf-submit');
    if (!newPw || !confirmPw || !submitBtn) return;
    var VISIBLE_ASCII = /^[\x21-\x7E]{5,16}$/;
    bindReadyGate(submitBtn, [newPw, confirmPw], function (ok) { submitBtn.classList.toggle('ready', ok); submitBtn.disabled = !ok; });
    on(submitBtn, 'click', function () {
      if (!newPw.value.trim() || !confirmPw.value.trim()) return;
      var a = newPw.value;
      if (isTxn && !VISIBLE_ASCII.test(a)) { showMemberModal({ type: 'warning', message: 'Use 5-16 visible ASCII characters (letters, numbers, symbols).' }); return; }
      if (!isTxn && (a.length < 5 || a.length > 16)) { showMemberModal({ type: 'warning', message: 'Length must be 5-16 characters.' }); return; }
      if (a !== confirmPw.value) { showMemberModal({ type: 'warning', message: 'The two passwords do not match.' }); return; }
      showMemberModal({ type: 'success', onConfirm: function () { newPw.value = ''; confirmPw.value = ''; submitBtn.classList.remove('ready'); submitBtn.disabled = true; } });
    });
  }

  function initChangeNicknamePage() {
    if (pageName() !== 'change-nickname') return;
    var card = document.querySelector('.mf-card');
    if (!card) return;
    var current = document.getElementById('current-nickname');
    var draft = document.getElementById('new-nickname');
    var submitBtn = card.querySelector('.mf-submit');
    if (!current || !draft || !submitBtn) return;
    function ready() {
      var v = draft.value.trim();
      return v.length >= 2 && v.length <= 20 && v !== current.value;
    }
    function sync() { var ok = ready(); submitBtn.classList.toggle('ready', ok); submitBtn.disabled = !ok; }
    on(draft, 'input', sync);
    function submit() {
      if (!ready()) return;
      showMemberModal({
        type: 'success', title: 'Success!', message: 'Nickname updated successfully.',
        onConfirm: function () { location.href = 'account.html'; },
      });
    }
    on(submitBtn, 'click', submit);
    on(draft, 'keyup', function (e) { if (e.key === 'Enter') submit(); });
    sync();
  }

  function initBankingDetailsPage() {
    if (pageName() !== 'banking-details') return;
    var wrap = document.querySelector('.mf-wrap');
    if (!wrap) return;
    var originalHtml = wrap.innerHTML;

    function bindListView() {
      on(wrap.querySelector('.mf-fab'), 'click', showForm);
      on(wrap.querySelector('.mf-add-btn'), 'click', showForm);
    }
    function formHtml() {
      return '<div class="mf-card">' +
        '<div class="mf-section"><span>Bank Information</span></div>' +
        '<div class="mf-select-wrap"><button type="button" class="mf-select placeholder" data-bank-toggle>Choose a Bank' + iconSvg('chevron-down') + '</button></div>' +
        '<div class="mf-field"><input class="mf-input plain" disabled placeholder=""></div>' +
        '<div class="mf-field"><input class="mf-input" type="password" data-field="card" placeholder="Enter your card number"><button type="button" class="mf-eye">' + iconSvg('eye') + '</button></div>' +
        '<div class="mf-section"><span>Transaction Password</span></div>' +
        '<div class="mf-field"><input class="mf-input" type="password" data-field="txn" placeholder="Please  fill in the transaction password"><button type="button" class="mf-eye">' + iconSvg('eye') + '</button></div>' +
        '<button type="button" class="mf-submit" data-bank-submit disabled><span>Submit</span></button>' +
        '</div>';
    }
    function showForm() {
      wrap.innerHTML = formHtml();
      bindForm();
    }
    function bindForm() {
      var card = wrap.querySelector('.mf-card');
      var toggleBtn = card.querySelector('[data-bank-toggle]');
      var selectWrap = document.createElement('div');
      selectWrap.className = 'mf-select-wrap-runtime';
      toggleBtn.parentElement.style.position = 'relative';
      var cardInput = card.querySelector('[data-field="card"]');
      var txnInput = card.querySelector('[data-field="txn"]');
      var submitBtn = card.querySelector('[data-bank-submit]');
      var chosenBank = '';

      $all('.mf-eye', card).forEach(function (btn) {
        on(btn, 'click', function () {
          var inp = btn.previousElementSibling;
          if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
        });
      });
      function syncReady() {
        var ok = !!(chosenBank && cardInput.value.trim() && txnInput.value.trim());
        submitBtn.classList.toggle('ready', ok);
        submitBtn.disabled = !ok;
      }
      on(cardInput, 'input', syncReady);
      on(txnInput, 'input', syncReady);

      function closeMenu() {
        var m = toggleBtn.parentElement.querySelector('.mf-select-menu');
        var b = toggleBtn.parentElement.querySelector('.mf-select-back');
        if (m) m.remove();
        if (b) b.remove();
      }
      on(toggleBtn, 'click', function () {
        if (toggleBtn.parentElement.querySelector('.mf-select-menu')) { closeMenu(); return; }
        var back = document.createElement('div');
        back.className = 'mf-select-back';
        on(back, 'click', closeMenu);
        var menu = document.createElement('div');
        menu.className = 'mf-select-menu';
        menu.innerHTML = '<div class="mf-select-search">' + iconSvg('search') + '<input type="text" placeholder="search a bank" data-bank-search></div><div class="mf-select-opts">' +
          (D.DEMO_BANKS || []).map(function (b) { return '<div class="mf-select-opt" data-bank="' + escapeHtml(b) + '">' + escapeHtml(b) + '</div>'; }).join('') + '</div>';
        toggleBtn.parentElement.appendChild(back);
        toggleBtn.parentElement.appendChild(menu);
        var searchInput = menu.querySelector('[data-bank-search]');
        on(searchInput, 'input', function () {
          var q = searchInput.value.toLowerCase();
          $all('[data-bank]', menu).forEach(function (opt) {
            opt.style.display = opt.getAttribute('data-bank').toLowerCase().indexOf(q) === -1 ? 'none' : '';
          });
        });
        $all('[data-bank]', menu).forEach(function (opt) {
          on(opt, 'click', function () {
            chosenBank = opt.getAttribute('data-bank');
            toggleBtn.innerHTML = escapeHtml(chosenBank) + iconSvg('chevron-down');
            toggleBtn.classList.remove('placeholder');
            closeMenu();
            syncReady();
          });
        });
      });
      on(submitBtn, 'click', function () {
        if (submitBtn.disabled) return;
        showMemberModal({
          type: 'success',
          onConfirm: function () { wrap.innerHTML = originalHtml; bindListView(); },
        });
      });
    }
    bindListView();
  }

  /* ================================ security.html =========================== */
  /* security.vue's last Security Setting row ("Logout" / "Logout safely") is a
     plain <div> with no @click in the Nuxt source either — but the identical
     action already works from the header member dropdown (data-logout ->
     location.reload(), see applyLoggedInHeaderUI above), so wire this row to
     the same, already-established behaviour instead of leaving a row that
     looks exactly like its four sibling links (same layout, cursor-pointer)
     but does nothing when clicked. */

  function initSecurityPage() {
    if (pageName() !== 'security') return;
    /* scoped to main: the member sidebar nav also links to personal-info.html,
       and querying the whole document would match that one first instead of
       the Security Setting list this function actually needs. */
    var personalInfoLink = document.querySelector('main a[href="personal-info.html"]');
    var list = personalInfoLink && personalInfoLink.parentElement;
    if (!list) return;
    var last = list.lastElementChild;
    if (!last || last.tagName === 'A' || !/Logout/.test(last.textContent || '')) return;
    on(last, 'click', function () { location.reload(); });
  }

  /* ============================ data-backoffice hint ======================= */

  function initBackofficeHint() {
    $all('[data-backoffice]').forEach(function (el) {
      on(el, 'click', function (e) {
        e.preventDefault();
        window.alert((D.T || {}).notAvailable || '此靜態預覽尚未包含此內容');
      });
    });
  }

  /* =================================== boot ================================ */

  ready(function () {
    initTheme();
    initNavDropdowns();
    initLocaleSwitcher();
    initHeaderMobileMenus();
    initMobileBottomNav();
    initAuthTriggers();
    initBanner();
    initMiniGamesGrid();
    initHomeRails();
    initModeTabsGeneric();
    initDepositFlow();
    initVendorBrowser();
    initAboutTabs();
    initPromotionDetail();
    initSportProviderTabs();
    initSportLoadMore();
    initMemberPageBehaviors();
    initMfEyeToggles();
    initAccountBankCarousel();
    initWithdrawalBankCarousel();
    initWithdrawalForms();
    initPersonalInfoPage();
    initChangePasswordPage();
    initChangeNicknamePage();
    initBankingDetailsPage();
    initSecurityPage();
    initBackofficeHint();
  });
})();
