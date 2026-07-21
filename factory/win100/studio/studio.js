/* CMS_設計後台_v2 — 靜態版行為層(vanilla,無框架)。
 * 右側 iframe 載入真實 factory 前台頁;選皮膚/改站名即時反映(直接操作同源 iframe,
 * 複刻 factory site.js 的 applyTheme:設 data-theme + 換 themes/<key>.css link)。
 * 「套用到本站」寫 localStorage['win100-public-config'](factory site.js 既有合約),
 * 前台開機與 storage 事件會自動吃這份設定 —— 免改 site.js。 */
(function () {
  'use strict';
  var D = window.WIN100_DATA || {};
  var KEYS = D.THEME_KEYS || ['win100'];
  var LABELS = D.THEME_LABELS || {};
  var PUBLIC_KEY = 'win100-public-config';
  var DEFAULT_SITE = 'CMS_前台_v2';

  var PAGES = [
    { label: '首頁 Lobby', file: 'index.html' },
    { label: 'Hot Games', file: 'hot-games.html' },
    { label: 'Live', file: 'live.html' },
    { label: 'Slot', file: 'slot.html' },
    { label: 'Fish', file: 'fish.html' },
    { label: 'Mini Games', file: 'mini-games.html' },
    { label: 'Sport', file: 'sport.html' },
    { label: 'Promotion', file: 'promotion.html' },
    { label: 'About', file: 'about.html' },
    { label: 'Support', file: 'support.html' }
  ];

  function readPublished() {
    try { return JSON.parse(localStorage.getItem(PUBLIC_KEY) || 'null') || {}; }
    catch (e) { return {}; }
  }
  var $ = function (id) { return document.getElementById(id); };
  var frame = $('st-frame');
  var statusEl = $('st-status');

  var published = readPublished();
  var draft = {
    siteName: published.siteName || DEFAULT_SITE,
    skin: (KEYS.indexOf(published.skin) !== -1 ? published.skin : KEYS[0])
  };

  function setStatus(msg) {
    statusEl.textContent = msg || '';
    if (msg) setTimeout(function () { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 2500);
  }

  /* 複刻 factory site.js applyTheme(同源 iframe 直接操作,免改 site.js) */
  function applySkinToFrame(skin) {
    var doc = frame.contentDocument;
    if (!doc || !doc.documentElement) return;
    doc.documentElement.setAttribute('data-theme', skin);
    var link = doc.getElementById('win100-skin-link');
    if (!link) {
      link = doc.createElement('link');
      link.id = 'win100-skin-link';
      link.rel = 'stylesheet';
      doc.head.appendChild(link);
    }
    link.setAttribute('href', 'themes/' + skin + '.css');
  }
  function applySiteNameToFrame(name) {
    try { if (frame.contentDocument) frame.contentDocument.title = name; } catch (e) {}
  }
  /* 切頁後不能只靠 iframe 'load'(前台可能含外部圖,load 會被卡住/延遲);短時間輪詢
     重套,確保套在前台 initTheme/initPublicConfigSync 之後,贏過其預設皮膚競態。 */
  var _reapplyTimer = null;
  function scheduleApply() {
    if (_reapplyTimer) clearInterval(_reapplyTimer);
    var n = 0;
    _reapplyTimer = setInterval(function () {
      applySkinToFrame(draft.skin);
      applySiteNameToFrame(draft.siteName || DEFAULT_SITE);
      if (++n >= 24) { clearInterval(_reapplyTimer); _reapplyTimer = null; }
    }, 150);
  }

  function renderSkins() {
    var wrap = $('st-skins');
    wrap.innerHTML = KEYS.map(function (k) {
      var active = k === draft.skin;
      return '<button type="button" class="st-skin' + (active ? ' active' : '') + '" role="option" aria-selected="' + active + '" data-skin="' + k + '">' +
        '<span class="st-swatch" data-theme="' + k + '"></span>' +
        '<span class="st-skin-label">' + (LABELS[k] || k) + '</span>' +
        '<span class="st-skin-check" aria-hidden="true">✓</span></button>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.st-skin'), function (btn) {
      btn.addEventListener('click', function () {
        draft.skin = btn.getAttribute('data-skin');
        renderSkinsActive();
        applySkinToFrame(draft.skin);
      });
    });
  }
  function renderSkinsActive() {
    Array.prototype.forEach.call(document.querySelectorAll('.st-skin'), function (btn) {
      var active = btn.getAttribute('data-skin') === draft.skin;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function renderPages() {
    var sel = $('st-page');
    sel.innerHTML = PAGES.map(function (p, i) {
      return '<option value="' + p.file + '"' + (i === 0 ? ' selected' : '') + '>' + p.label + '</option>';
    }).join('');
    sel.addEventListener('change', function () {
      var p = PAGES.filter(function (x) { return x.file === sel.value; })[0];
      $('st-preview-label').textContent = '即時預覽 — ' + (p ? p.label : sel.value);
      frame.src = '../' + sel.value;
      scheduleApply();
    });
  }

  var nameInput = $('st-sitename');
  nameInput.value = draft.siteName;
  nameInput.addEventListener('input', function () {
    draft.siteName = nameInput.value;
    applySiteNameToFrame(draft.siteName || DEFAULT_SITE);
  });

  $('st-apply').addEventListener('click', function () {
    var cfg = readPublished();
    cfg.siteName = draft.siteName || DEFAULT_SITE;
    cfg.skin = draft.skin;
    if (!cfg.publicSkins) cfg.publicSkins = [];
    if (!cfg.publicLocales) cfg.publicLocales = [];
    if (!cfg.chrome) cfg.chrome = {};
    try { localStorage.setItem(PUBLIC_KEY, JSON.stringify(cfg)); } catch (e) {}
    published = cfg;
    setStatus('已套用到本站 ✓');
  });
  $('st-reset').addEventListener('click', function () {
    published = readPublished();
    draft.siteName = published.siteName || DEFAULT_SITE;
    draft.skin = (KEYS.indexOf(published.skin) !== -1 ? published.skin : KEYS[0]);
    nameInput.value = draft.siteName;
    renderSkinsActive();
    applySkinToFrame(draft.skin);
    applySiteNameToFrame(draft.siteName);
    setStatus('已重設為目前線上設定');
  });

  /* iframe 每次載入(含切頁)後,把當前草稿皮膚/站名覆蓋上去,確保預覽 = 草稿而非頁面自存皮膚 */
  frame.addEventListener('load', function () {
    applySkinToFrame(draft.skin);
    applySiteNameToFrame(draft.siteName || DEFAULT_SITE);
  });

  renderSkins();
  renderPages();
  scheduleApply(); /* 首次 iframe 載入也套用當前草稿皮膚/站名 */
})();
