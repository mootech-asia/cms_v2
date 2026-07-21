/* CMS_後台_v2 — 客戶後台靜態版(vanilla)。站方設定:站點名稱、目前皮膚、
 * 以及「開放給前台使用者的皮膚/語言範圍」(publicSkins/publicLocales)。
 * 全部寫 localStorage['win100-public-config'] —— factory site.js 既有合約:
 *   - buildSkinPanelHtml() 依 publicSkins 篩前台皮膚選單
 *   - buildLocalePanelHtml() 依 publicLocales 篩前台語言選單
 *   - applyPublicConfigNow() 套 siteName/skin
 * 目前皮膚於右側 iframe 即時預覽(複刻 site.js applyTheme,同源操作,免改 site.js)。
 * 內容管理(banner/促銷/遊戲)需前台改為 config 驅動,屬較大前端重構,留待後續。 */
(function () {
  'use strict';
  var D = window.WIN100_DATA || {};
  var KEYS = D.THEME_KEYS || ['win100'];
  var LABELS = D.THEME_LABELS || {};
  var LOCALES = D.LOCALES || [{ code: 'zh', label: '中文' }];
  var PUBLIC_KEY = 'win100-public-config';
  var DEFAULT_SITE = 'CMS_前台_v2';

  function readPublished() {
    try { return JSON.parse(localStorage.getItem(PUBLIC_KEY) || 'null') || {}; }
    catch (e) { return {}; }
  }
  var $ = function (id) { return document.getElementById(id); };
  var frame = $('ad-frame');
  var statusEl = $('ad-status');

  function freshDraft() {
    var pub = readPublished();
    return {
      siteName: pub.siteName || DEFAULT_SITE,
      skin: (KEYS.indexOf(pub.skin) !== -1 ? pub.skin : KEYS[0]),
      publicSkins: Array.isArray(pub.publicSkins) ? pub.publicSkins.slice() : [],
      publicLocales: Array.isArray(pub.publicLocales) ? pub.publicLocales.slice() : []
    };
  }
  var draft = freshDraft();

  function setStatus(msg) {
    statusEl.textContent = msg || '';
    if (msg) setTimeout(function () { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 2500);
  }

  function applySkinToFrame(skin) {
    var doc = frame.contentDocument;
    if (!doc || !doc.documentElement) return;
    doc.documentElement.setAttribute('data-theme', skin);
    var link = doc.getElementById('win100-skin-link');
    if (!link) {
      link = doc.createElement('link');
      link.id = 'win100-skin-link'; link.rel = 'stylesheet';
      doc.head.appendChild(link);
    }
    link.setAttribute('href', 'themes/' + skin + '.css');
  }
  function applySiteNameToFrame(name) {
    try { if (frame.contentDocument) frame.contentDocument.title = name; } catch (e) {}
  }
  /* 前台可能含外部圖,iframe 'load' 會被卡住/延遲;短時間輪詢重套,贏過前台預設皮膚競態。 */
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
    var wrap = $('ad-skins');
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
    Array.prototype.forEach.call(document.querySelectorAll('#ad-skins .st-skin'), function (btn) {
      var active = btn.getAttribute('data-skin') === draft.skin;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function renderChecks(containerId, items, getVal, getLabel, draftArr) {
    var wrap = $(containerId);
    wrap.innerHTML = items.map(function (it) {
      var v = getVal(it);
      var checked = draftArr.indexOf(v) !== -1 ? ' checked' : '';
      return '<label class="st-check"><input type="checkbox" value="' + v + '"' + checked + '>' +
        '<span>' + getLabel(it) + '</span></label>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('input[type=checkbox]'), function (cb) {
      cb.addEventListener('change', function () {
        var i = draftArr.indexOf(cb.value);
        if (cb.checked && i === -1) draftArr.push(cb.value);
        else if (!cb.checked && i !== -1) draftArr.splice(i, 1);
      });
    });
  }

  var nameInput = $('ad-sitename');
  function syncFromDraft() {
    nameInput.value = draft.siteName;
    renderSkins();
    renderChecks('ad-public-skins', KEYS, function (k) { return k; }, function (k) { return LABELS[k] || k; }, draft.publicSkins);
    renderChecks('ad-public-locales', LOCALES, function (l) { return l.code; }, function (l) { return l.label; }, draft.publicLocales);
  }

  nameInput.addEventListener('input', function () {
    draft.siteName = nameInput.value;
    applySiteNameToFrame(draft.siteName || DEFAULT_SITE);
  });

  $('ad-apply').addEventListener('click', function () {
    var cfg = readPublished();
    cfg.siteName = draft.siteName || DEFAULT_SITE;
    cfg.skin = draft.skin;
    cfg.publicSkins = draft.publicSkins.slice();
    cfg.publicLocales = draft.publicLocales.slice();
    if (!cfg.chrome) cfg.chrome = {};
    try { localStorage.setItem(PUBLIC_KEY, JSON.stringify(cfg)); } catch (e) {}
    setStatus('已儲存變更 ✓');
  });
  $('ad-reset').addEventListener('click', function () {
    draft = freshDraft();
    syncFromDraft();
    applySkinToFrame(draft.skin);
    applySiteNameToFrame(draft.siteName);
    setStatus('已重設為目前線上設定');
  });

  frame.addEventListener('load', function () {
    applySkinToFrame(draft.skin);
    applySiteNameToFrame(draft.siteName || DEFAULT_SITE);
  });

  syncFromDraft();
  scheduleApply(); /* 首次 iframe 載入即套用當前草稿皮膚/站名(不等 load) */
})();
