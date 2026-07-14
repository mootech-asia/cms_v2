// === 原生 JS 路由 (取代 React Router) ===
const ROUTES = ['home','about','account','account-record','banking-details','betting-record','change-password',
  'deposit','deposit-record','fish','hot-games','live','mini-games','personal-info','profit-loss','promotion',
  'security','slot','sport','support','withdrawal','withdrawal-record'];

function slugFromHref(href) {
  if (href == null) return null;
  const clean = href.replace(/[#?].*$/, '').replace(/\/+$/, '');
  if (clean === '' || clean === '..' || clean === '.' || /\/cms_v2$/.test(href)) return 'home';
  return clean.split('/').pop();
}

// 片段版本號:每次改版 pages/*.html 時一併更新,避免 GitHub Pages 的
// max-age=600 快取讓使用者在部署後最多 10 分鐘內拿到舊頁面
const PAGES_V = '20260714-1200';

const cache = {};
async function loadFragment(slug) {
  if (cache[slug]) return cache[slug];
  const res = await fetch('pages/' + slug + '.html?v=' + PAGES_V);
  const html = await res.text();
  cache[slug] = html;
  return html;
}

async function render() {
  const route = location.hash.replace(/^#\/?/, '') || 'home';
  const [routeSlug, queryString = ''] = route.split('?');
  let slug = routeSlug;
  const query = Object.fromEntries(new URLSearchParams(queryString));
  if (!ROUTES.includes(slug)) slug = 'home';
  const container = document.getElementById('container');
  try {
    container.innerHTML = await loadFragment(slug);
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
