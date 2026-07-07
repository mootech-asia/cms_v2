// === 頁籤切換 (首頁 Mini/Slot/Live 自動輪播+進度條 + 內頁供應商/收藏) ===
const IMG = '_external/images.unsplash.com/';
const PICS = [
  'photo-1534620780923-1ce0db377c3f__w-200',
  'photo-1604028297236-42130c7dcc3a__w-200',
  'photo-1604028296525-8304e1a4969f__w-200',
  'photo-1771775606196-70dccc0d9bde__w-200',
  'photo-1525018667593-176858caed6a__w-200',
  'photo-1590336225155-d7e19a3a954f__w-200',
];
const pic = (i) => IMG + PICS[i % PICS.length];

const HOME_TABS = {
  'Mini Game': ['Mega Fortune', 'Starburst', 'Limbo', 'Mines', 'Plinko', 'Dice', 'Tower', 'Keno', 'Hilo', 'Wheel', 'Crash', 'Coin Flip', 'Rocket', 'Caves', 'Video Poker', 'Scratch Card'],
  'Slot Game': ['Gates of Olympus', 'Sweet Bonanza', 'Book of Dead', 'Starburst', 'Wolf Gold', 'Mega Moolah', 'Gonzo Quest', 'Dead or Alive', 'Sugar Rush', 'Big Bass', 'Money Train', 'Wild West Gold'],
  'Live Game': ['Lightning Roulette', 'Crazy Time', 'Mega Wheel', 'Baccarat', 'Dragon Tiger', 'Monopoly Live', 'Blackjack VIP', 'Sic Bo', 'Dream Catcher', 'Speed Roulette', 'Football Studio', 'Andar Bahar'],
};
const HOME_ORDER = ['Mini Game', 'Slot Game', 'Live Game'];
const HOME_TAB_ROUTES = {
  'Mini Game': 'mini-games',
  'Slot Game': 'slot',
  'Live Game': 'live',
};
const CYCLE_MS = 6000, STEP_MS = 50;

function homeCard(name, i) {
  return `<div class="flex-shrink-0 w-28 md:w-32 snap-start cursor-pointer group">`
    + `<div class="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden border-2 border-gray-700 group-hover:border-[#98E7D2] transition-colors">`
    + `<img src="${pic(i)}" alt="${name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"></div>`
    + `<h3 class="text-white text-xs md:text-sm text-center mt-2 truncate">${name}</h3></div>`;
}

// --- 首頁頁籤自動輪播 + 進度條 ---
let homeCtx = null, homeTimer = null, homeIdx = 0, homeProgress = 0, homePaused = false;
let homeTransitionId = 0;

function findHomeTabGroup() {
  const span = [...document.querySelectorAll('#container button > span')]
    .find((s) => HOME_TABS[s.textContent.trim()]);
  if (!span) return null;
  const btn = span.closest('button');
  return { group: btn.parentElement, sect: btn.closest('section') };
}

function homeTabRoute(label) {
  return HOME_TAB_ROUTES[label] || HOME_TAB_ROUTES[HOME_ORDER[0]];
}

function activeHomeTabLabel(ctx) {
  if (!ctx) return HOME_ORDER[homeIdx] || HOME_ORDER[0];
  const activeBtn = [...ctx.group.querySelectorAll('button')]
    .find((b) => b.classList.contains('text-white'));
  const label = (activeBtn?.querySelector('span')?.textContent || '').trim();
  return HOME_TABS[label] ? label : (HOME_ORDER[homeIdx] || HOME_ORDER[0]);
}

function homeShowAllLink(ctx) {
  if (!ctx?.sect) return null;
  return [...ctx.sect.querySelectorAll('a')]
    .find((a) => /show all/i.test((a.textContent || '').trim()));
}

function updateHomeShowAll(ctx, label) {
  const link = homeShowAllLink(ctx);
  if (!link) return;
  const route = homeTabRoute(label);
  link.href = '#/' + route;
  link.dataset.homeShowAll = route;
}

function homeTabDirection(from, to) {
  if (from === to) return 0;
  if (from === HOME_ORDER.length - 1 && to === 0) return 1;
  if (from === 0 && to === HOME_ORDER.length - 1) return -1;
  return to > from ? 1 : -1;
}

function updateHomeRail(ctx, label, direction, animate) {
  const rail = ctx.sect && ctx.sect.querySelector('.animate-slideIn');
  if (!rail || !HOME_TABS[label]) return;
  const cards = HOME_TABS[label].map((n, i) => homeCard(n, i)).join('');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const transitionId = ++homeTransitionId;

  rail.getAnimations().forEach((animation) => animation.cancel());
  if (!animate || !direction || reduceMotion) {
    rail.innerHTML = cards;
    rail.style.pointerEvents = '';
    return;
  }

  rail.style.pointerEvents = 'none';
  const offset = direction * 18;
  const outgoing = rail.animate([
    { opacity: 1, transform: 'translateX(0)' },
    { opacity: 0, transform: `translateX(${-offset}px)` },
  ], {
    duration: 120,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    fill: 'forwards',
  });

  outgoing.finished.then(() => {
    if (transitionId !== homeTransitionId) return;
    rail.innerHTML = cards;
    const incoming = rail.animate([
      { opacity: 0, transform: `translateX(${offset}px)` },
      { opacity: 1, transform: 'translateX(0)' },
    ], {
      duration: 220,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'forwards',
    });
    incoming.finished.then(() => {
      if (transitionId === homeTransitionId) rail.style.pointerEvents = '';
    }).catch(() => {});
  }).catch(() => {});
}

function applyHomeTab(ctx, idx, animate = false, direction = 0) {
  const label = HOME_ORDER[idx];
  updateHomeShowAll(ctx, label);
  [...ctx.group.querySelectorAll('button')].forEach((b) => {
    const l = (b.querySelector('span')?.textContent || '').trim();
    const active = l === label;
    b.classList.toggle('text-white', active);
    b.classList.toggle('text-gray-500', !active);
    // 移除任何既有指示器(含 Figma 匯出的靜態 46% 進度條),避免重複
    b.querySelectorAll(':scope > div.absolute').forEach((d) => d.remove());
    if (active) {
      if (animate) {
        b.animate([
          { transform: 'translateY(2px)', opacity: 0.65 },
          { transform: 'translateY(0)', opacity: 1 },
        ], {
          duration: 220,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      }
      const track = document.createElement('div');
      track.className = 'tab-prog absolute bottom-0 left-0 right-0 h-0.5 bg-gray-700';
      track.innerHTML = '<div class="tab-fill h-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] transition-all duration-100" style="width:0%"></div>';
      b.appendChild(track);
      if (animate) {
        track.animate([
          { opacity: 0, transform: 'scaleX(0.45)' },
          { opacity: 1, transform: 'scaleX(1)' },
        ], {
          duration: 220,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      }
    }
  });
  updateHomeRail(ctx, label, direction, animate);
}

function setHomeFill(ctx, pct) {
  const fill = ctx.group.querySelector('.tab-prog .tab-fill');
  if (fill) fill.style.width = pct + '%';
}

function gotoHomeTab(idx, resetGames) {
  if (!homeCtx) return;
  const previousIdx = homeIdx;
  const nextIdx = ((idx % HOME_ORDER.length) + HOME_ORDER.length) % HOME_ORDER.length;
  const direction = homeTabDirection(previousIdx, nextIdx);
  homeIdx = nextIdx;
  homeProgress = 0;
  applyHomeTab(homeCtx, homeIdx, direction !== 0, direction);
  setHomeFill(homeCtx, 0);
}

function initHomeTabs() {
  clearInterval(homeTimer);
  homeCtx = findHomeTabGroup();
  if (!homeCtx) return;
  homeIdx = 0; homeProgress = 0; homePaused = false;
  applyHomeTab(homeCtx, homeIdx);
  setHomeFill(homeCtx, 0);
  if (homeCtx.sect) {
    homeCtx.sect.addEventListener('mouseenter', () => { homePaused = true; });
    homeCtx.sect.addEventListener('mouseleave', () => { homePaused = false; });
  }
  homeTimer = setInterval(() => {
    if (homePaused || !homeCtx) return;
    homeProgress += (STEP_MS / CYCLE_MS) * 100;
    if (homeProgress >= 100) {
      homeProgress = 0;
      gotoHomeTab(homeIdx + 1);
    }
    setHomeFill(homeCtx, homeProgress);
  }, STEP_MS);
  window._homeTabTimer = homeTimer;
}
window.initHomeTabs = initHomeTabs;

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-home-show-all]');
  if (!link) return;
  if (!homeCtx) homeCtx = findHomeTabGroup();
  const label = activeHomeTabLabel(homeCtx);
  location.hash = '#/' + homeTabRoute(label);
  e.preventDefault();
});

document.addEventListener('page:rendered', (e) => {
  if (!e.detail || e.detail.slug === 'home') initHomeTabs();
  if (e.detail && providerTabRow()) {
    const provider = e.detail.query?.provider;
    if (!provider || !selectProviderTab(provider)) applyProviderFilter();
  }
  if (e.detail?.slug === 'promotion') {
    selectPromotionTab(e.detail.query?.tab || 'event');
  }
});

// --- 內頁供應商/收藏頁籤 ---
const PROVIDERS = /^(Vendor|BTI|SABA|Sexy|Pragmatic Play|Yeebet|Favorites)$/;

function providerTabRow() {
  return [...document.querySelectorAll('#container .border-b')].find((row) =>
    [...row.querySelectorAll('button')].some((button) => PROVIDERS.test((button.textContent || '').trim()))
  ) || null;
}

function selectProviderTab(label) {
  if (!PROVIDERS.test(label)) return false;
  const row = providerTabRow();
  if (!row) return false;
  const buttons = [...row.querySelectorAll('button')];
  const target = buttons.find((button) => (button.textContent || '').trim() === label);
  if (!target) return false;

  buttons.forEach((button) => {
    const active = button === target;
    button.classList.toggle('text-[#98E7D2]', active);
    button.classList.toggle('text-gray-400', !active);
    let underline = button.querySelector(':scope > div.absolute');
    if (active && !underline) {
      underline = document.createElement('div');
      underline.className = 'absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]';
      button.appendChild(underline);
    } else if (!active && underline) {
      underline.remove();
    }
  });
  applyProviderFilter();
  return true;
}

function cardFromStar(star) {
  return star.closest('div.group') || star.closest('[class*="rounded-xl"]');
}

// 所有遊戲卡/比賽卡(含收藏星號)
function matchCards() {
  return [...document.querySelectorAll('#container svg.lucide-star')]
    .map(cardFromStar)
    .filter(Boolean);
}
// 目前作用中的供應商頁籤文字
function activeProviderLabel() {
  for (const r of document.querySelectorAll('#container .border-b')) {
    const btns = [...r.querySelectorAll('button')].filter((b) => PROVIDERS.test((b.textContent || '').trim()));
    if (!btns.length) continue;
    const act = btns.find((b) => b.classList.contains('text-[#98E7D2]'));
    return ((act || btns[0]).textContent || '').trim();
  }
  return '';
}
// Favorites 只顯示已收藏;其它供應商顯示全部
function applyProviderFilter() {
  const cards = matchCards();
  if (!cards.length) return;
  const favOnly = activeProviderLabel() === 'Favorites';
  let shown = 0;
  cards.forEach((c) => {
    const show = !favOnly || c.dataset.fav === '1';
    c.style.display = show ? '' : 'none';
    if (show) shown++;
  });
  const grid = cards[0].parentElement;
  let empty = grid && grid.querySelector(':scope > .fav-empty');
  if (favOnly && shown === 0) {
    if (!empty && grid) {
      empty = document.createElement('div');
      empty.className = 'fav-empty';
      empty.style.cssText = 'grid-column:1/-1;text-align:center;color:#9ca3af;padding:48px 16px';
      empty.textContent = 'No favorites yet - tap the star to add one.';
      grid.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }
}

// --- Promotion Event / News 頁籤 ---
const PROMOTION_TABS = /^(Event|News)$/;

function promotionTabRow() {
  return [...document.querySelectorAll('#container button')]
    .find((button) => PROMOTION_TABS.test((button.textContent || '').trim()))
    ?.parentElement || null;
}

function promotionCards() {
  const row = promotionTabRow();
  if (!row) return [];
  const grid = row.nextElementSibling;
  if (!grid || !grid.classList.contains('grid')) return [];
  return [...grid.children].filter((child) => !child.classList.contains('promo-empty'));
}

function promotionTabLabel(value) {
  return String(value || '').toLowerCase() === 'news' ? 'News' : 'Event';
}

function stylePromotionTabs(row) {
  row.classList.remove('gap-6', 'border-b', 'border-gray-800');
  row.style.cssText = 'display:inline-flex;align-items:center;gap:0;border:1px solid #344155;border-radius:6px;overflow:hidden;background:#1a2128;width:max-content';
}

function selectPromotionTab(value, updateUrl = false) {
  const label = promotionTabLabel(value);
  const row = promotionTabRow();
  if (!row) return false;
  stylePromotionTabs(row);
  const buttons = [...row.querySelectorAll('button')].filter((button) => PROMOTION_TABS.test((button.textContent || '').trim()));
  const target = buttons.find((button) => (button.textContent || '').trim() === label);
  if (!target) return false;

  buttons.forEach((button) => {
    const active = button === target;
    button.classList.toggle('text-[#98E7D2]', active);
    button.classList.toggle('text-gray-400', !active);
    button.classList.remove('pb-4', 'px-2', 'hover:text-gray-300');
    button.querySelectorAll(':scope > div.absolute').forEach((underline) => underline.remove());
    button.style.cssText = [
      'position:relative',
      'padding:6px 16px',
      'border:0',
      'border-radius:0',
      'font-weight:700',
      'transition:background .18s ease,color .18s ease',
      'cursor:pointer',
      `background:${active ? '#98E7D2' : 'transparent'}`,
      `color:${active ? '#0f172a' : '#9ca3af'}`,
    ].join(';');
  });

  const cards = promotionCards();
  const grid = cards[0]?.parentElement || row.nextElementSibling;
  cards.forEach((card) => { card.style.display = label === 'Event' ? '' : 'none'; });
  let empty = grid && grid.querySelector(':scope > .promo-empty');
  if (label === 'News') {
    if (!empty && grid) {
      empty = document.createElement('div');
      empty.className = 'promo-empty';
      empty.style.cssText = 'grid-column:1/-1;text-align:center;color:#9ca3af;padding:56px 16px';
      empty.textContent = 'No news yet.';
      grid.appendChild(empty);
    }
  } else if (empty) {
    empty.remove();
  }

  if (updateUrl) {
    const next = label === 'News' ? '#/promotion?tab=news' : '#/promotion?tab=event';
    if (location.hash !== next) history.replaceState(null, '', next);
  }
  return true;
}

// 點比賽卡的星號 → 切換收藏
document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  const star = btn && btn.querySelector('svg.lucide-star');
  if (!star) return;
  e.preventDefault();
  e.stopPropagation();
  const card = cardFromStar(star);
  const on = (card ? card.dataset.fav : btn.dataset.fav) !== '1';
  if (card) card.dataset.fav = on ? '1' : '';
  btn.dataset.fav = on ? '1' : '';
  star.style.color = on ? '#98E7D2' : 'rgb(75, 85, 99)';
  star.setAttribute('fill', on ? '#98E7D2' : 'none');
  applyProviderFilter();
});

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const label = (btn.querySelector('span')?.textContent || btn.textContent || '').trim();

  // --- 首頁 Mini/Slot/Live 頁籤(手動切換,重置進度條)---
  if (HOME_TABS[label]) {
    if (!homeCtx) homeCtx = findHomeTabGroup();
    gotoHomeTab(HOME_ORDER.indexOf(label));
    return;
  }

  // --- 內頁供應商/收藏頁籤 ---
  const tabRow = btn.closest('.border-b');
  if (tabRow && PROVIDERS.test(label)) {
    selectProviderTab(label);
    return;
  }

  // --- Promotion Event / News 頁籤 ---
  if (PROMOTION_TABS.test(label) && promotionTabRow()?.contains(btn)) {
    selectPromotionTab(label, true);
  }
});
