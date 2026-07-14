// === 原生 JS 路由:fragment + 共用 chrome 組裝 ===
const ROUTES = ['home','about','account','account-record','banking-details','betting-record','change-password',
  'deposit','deposit-record','fish','hot-games','live','mini-games','personal-info','profit-loss','promotion',
  'security','slot','sport','support','withdrawal','withdrawal-record'];

function slugFromHref(href) {
  if (href == null) return null;
  const clean = href.replace(/[#?].*$/, '').replace(/\/+$/, '');
  if (clean === '' || clean === '..' || clean === '.' || /\/cms_v2$/.test(href)) return 'home';
  return clean.split('/').pop();
}

// 片段版本號:每次改版 pages/*.html 或 partials/* 時一併更新,避免 GitHub Pages 的
// max-age=600 快取讓使用者在部署後最多 10 分鐘內拿到舊頁面
const PAGES_V = '20260715-1000';

const cache = {};
async function fetchText(path) {
  if (cache[path]) return cache[path];
  const res = await fetch(path + '?v=' + PAGES_V);
  const body = await res.text();
  cache[path] = body;
  return body;
}

// 共用 chrome(header/會員側欄/footer/底部導覽)+ 各頁 active 對照表
let chromeReady = null;
function loadChrome() {
  if (!chromeReady) {
    chromeReady = Promise.all([
      fetchText('partials/member-pre.html'),
      fetchText('partials/member-post.html'),
      fetchText('partials/marketing-pre.html'),
      fetchText('partials/marketing-post.html'),
      fetchText('partials/chrome-map.json').then((raw) => JSON.parse(raw)),
    ]).then(([mPre, mPost, kPre, kPost, map]) => ({ mPre, mPost, kPre, kPost, map }));
  }
  return chromeReady;
}

// 把該頁的導覽/側欄/底欄 active 樣式套回去(partials 存的是全 inactive 版本)
function applyActive(chrome, slug) {
  const page = chrome.map.pages[slug];
  if (!page) return;
  const { nav, side, bottom } = chrome.map.active;
  const pairs = page.layout === 'member'
    ? [[page.side, side], [page.bottom, bottom]]
    : [[page.nav, nav], [page.bottom, bottom]];
  for (const [href, cls] of pairs) {
    if (!href) continue;
    const [inact, act] = cls;
    for (const a of document.querySelectorAll('#container a[href="' + href + '"]')) {
      if (a.getAttribute('class') === inact) { a.setAttribute('class', act); break; }
    }
  }
}

async function render() {
  const route = location.hash.replace(/^#\/?/, '') || 'home';
  const [routeSlug, queryString = ''] = route.split('?');
  let slug = routeSlug;
  const query = Object.fromEntries(new URLSearchParams(queryString));
  if (!ROUTES.includes(slug)) slug = 'home';
  const container = document.getElementById('container');
  try {
    const [chrome, content] = await Promise.all([loadChrome(), fetchText('pages/' + slug + '.html')]);
    const isMember = chrome.map.pages[slug] && chrome.map.pages[slug].layout === 'member';
    container.innerHTML = isMember
      ? chrome.mPre + content + chrome.mPost
      : chrome.kPre + content + chrome.kPost;
    applyActive(chrome, slug);
  } catch (e) {
    container.innerHTML = '<div style="color:#fff;padding:60px;text-align:center">頁面載入失敗</div>';
  }
  window.scrollTo(0, 0);
  // 頁面專屬初始化
  if (slug === 'home' && window.initCarousel) window.initCarousel();
  document.dispatchEvent(new CustomEvent('page:rendered', { detail: { slug, query } }));
}

function navigate(slug) {
  const target = '#/' + slug;
  if (location.hash === target) render();      // 同頁也重渲染
  else location.hash = target;
}

// 攔截站內連結點擊
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (/^#\/?/.test(href)) return;          // hash 連結交給原生 hashchange
  if (/^(\.\.?\/|\/cms_v2)/.test(href) || href === '') {
    const slug = slugFromHref(href);
    if (ROUTES.includes(slug)) { e.preventDefault(); navigate(slug); }
  }
});

window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);
