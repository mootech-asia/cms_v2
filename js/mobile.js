// === 手機版互動:右上漢堡(主選單) + 底部 Browse(會員選單) ===

// --- lucide 圖示 ---
const ICONS = {
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  gamepad: '<line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/>',
  spade: '<path d="M5 9c-1.6 1.6-3 3.3-3 5.5A4.5 4.5 0 0 0 6.5 19c1.7 0 3-.6 4.5-2.2V19a1 1 0 0 1-1 1H9v2h6v-2h-1a1 1 0 0 1-1-1v-2.2c1.5 1.6 2.8 2.2 4.5 2.2A4.5 4.5 0 0 0 22 14.5c0-2.2-1.4-3.9-3-5.5l-7-7Z"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  video: '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  fish: '<path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z"/><path d="M18 12v.01"/><path d="M2 16c1.5-.5 3-2 3-4s-1.5-3.5-3-4"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  cherry: '<path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"/><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"/><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"/>',
  ticket: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  grid: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  download: '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>',
  upload: '<path d="M12 21V7"/><path d="m6 11 6-6 6 6"/><path d="M5 3h14"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  trend: '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
  'log-out': '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
};
function ic(name, size) { return `<svg xmlns="http://www.w3.org/2000/svg" width="${size || 20}" height="${size || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`; }

const MAIN_LINKS = [
  ['Home', 'home', 'house'], ['Hot Games', 'hot-games', 'flame'], ['Sports', 'sport', 'trophy'],
  ['Live', 'live', 'video'], ['Slots', 'slot', 'cherry'], ['Fish', 'fish', 'fish'],
  ['Mini Games', 'mini-games', 'gamepad'], ['Promotion', 'promotion', 'gift'],
];
const MEMBER_LINKS = [
  ['Account Overview', 'account', 'grid'], ['Deposit', 'deposit', 'download'], ['Withdrawal', 'withdrawal', 'upload'],
  ['Betting Record', 'betting-record', 'history'], ['Deposit Record', 'deposit-record', 'file'],
  ['Profit And Loss', 'profit-loss', 'trend'], ['Withdrawal Record', 'withdrawal-record', 'file'],
  ['Account Record', 'account-record', 'file'], ['Personal Info', 'personal-info', 'user'],
  ['Security Center', 'security', 'shield'], ['Customer Service', 'support', 'chat'],
];

function curSlug() { const s = location.hash.replace(/^#\/?/, ''); return s || 'home'; }

function ensureMobileDrawerStyles() {
  if (document.getElementById('mobile-drawer-style')) return;
  const style = document.createElement('style');
  style.id = 'mobile-drawer-style';
  style.textContent = '#mobile-menu [data-panel]::-webkit-scrollbar{display:none}';
  document.head.appendChild(style);
}

function closeMobileMenu() {
  const m = document.getElementById('mobile-menu');
  if (!m) return;
  const bn = document.querySelector('nav[class*="bottom-0"]');
  if (bn && bn.dataset.prevZ !== undefined) { bn.style.zIndex = bn.dataset.prevZ; delete bn.dataset.prevZ; }
  const panel = m.querySelector('[data-panel]');
  if (panel) panel.style.transform = panel.dataset.side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
  m.style.background = 'rgba(0,0,0,0)';
  setTimeout(() => m.remove(), 220);
}
window.closeMobileMenu = closeMobileMenu;

function navRow(label, slug, icon, active, fillHeight) {
  const base = fillHeight === 'main'
    ? 'display:flex;align-items:center;gap:clamp(12px,2.6dvh,18px);min-height:0;padding:0 24px;border-radius:14px;text-decoration:none;font-size:clamp(17px,2.5dvh,20px);font-weight:700;cursor:pointer;margin:2px 24px'
    : fillHeight === 'member'
      ? 'display:flex;align-items:center;gap:clamp(10px,2dvh,16px);min-height:0;padding:0 18px;border-radius:11px;text-decoration:none;font-size:clamp(15px,2.1dvh,18px);line-height:1.15;font-weight:700;cursor:pointer;margin:1px 14px'
      : 'display:flex;align-items:center;gap:clamp(12px,2.6dvh,18px);padding:clamp(10px,1.5dvh,15px) 24px;border-radius:14px;text-decoration:none;font-size:clamp(17px,2.5dvh,20px);font-weight:700;cursor:pointer;margin:0 24px clamp(8px,1.5dvh,16px)';
  const style = active
    ? base + ';background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;font-weight:700'
    : base + ';color:#d1d5db';
  const iconSize = fillHeight === 'member' ? 22 : 24;
  return `<a data-mslug="${slug}" href="#/${slug}" style="${style}">${ic(icon, iconSize)}<span>${label}</span></a>`;
}

function openDrawer(side, inner, full, fitHeight) {
  if (document.getElementById('mobile-menu')) return;
  ensureMobileDrawerStyles();
  const o = document.createElement('div');
  o.id = 'mobile-menu';
  o.style.cssText = 'position:fixed;inset:0;z-index:10001;background:rgba(0,0,0,0);transition:background .2s';
  const off = side === 'right' ? 'translateX(100%)' : 'translateX(-100%)';
  const bottomInset = full ? '64px' : '0';
  const pos = side === 'right' ? `top:0;right:0;bottom:${bottomInset}` : `top:0;left:0;bottom:${bottomInset}`;
  const sizeCss = full
    ? 'width:100%;max-width:none'
    : `width:86%;max-width:340px;border-${side === 'right' ? 'left' : 'right'}:1px solid #1f2937`;
  const overflow = full || fitHeight ? 'hidden' : 'auto';
  o.innerHTML = `<div data-panel data-side="${side}" style="position:absolute;${pos};${sizeCss};background:#1a2128;overflow-y:${overflow};scrollbar-width:none;-ms-overflow-style:none;overscroll-behavior:contain;box-shadow:0 0 24px rgba(0,0,0,.6);transform:${off};transition:transform .25s ease">${inner}</div>`;
  if (full) {                       // 全屏選單:讓底部導覽列浮在選單之上(對齊設計)
    const bn = document.querySelector('nav[class*="bottom-0"]');
    if (bn) { bn.dataset.prevZ = bn.style.zIndex; bn.style.zIndex = '10002'; }
  }
  o.addEventListener('click', (ev) => {
    if (ev.target === o || ev.target.closest('[data-close]')) return closeMobileMenu();
    const auth = ev.target.closest('[data-auth]');
    if (auth) { closeMobileMenu(); if (window.openAuthModal) window.openAuthModal(auth.dataset.auth); return; }
    const a = ev.target.closest('[data-mslug]');
    if (a) {
      const slug = a.dataset.mslug;
      closeMobileMenu();
      if (slug) location.hash = '#/' + slug;
    }
  });
  document.body.appendChild(o);
  requestAnimationFrame(() => { o.style.background = 'rgba(0,0,0,.6)'; o.querySelector('[data-panel]').style.transform = 'translateX(0)'; });
}

// --- 圖5:右上漢堡 → 主選單 ---
function openMainMenu() {
  const slug = curSlug();
  const loggedIn = !!window._loggedIn;
  const account = loggedIn
    ? `<div style="display:flex;align-items:center;gap:16px;padding:4px 24px 0">
        <div style="width:clamp(52px,7.6dvh,64px);height:clamp(52px,7.6dvh,64px);border-radius:50%;background:linear-gradient(90deg,#CBE8E4,#98E7D2);display:flex;align-items:center;justify-content:center;color:#0f1622;flex-shrink:0">${ic('user', 32)}</div>
        <div style="min-width:0">
          <div style="display:flex;align-items:center;gap:12px"><span style="color:#fff;font-weight:800;font-size:clamp(20px,2.8dvh,24px);white-space:nowrap">meqomcao</span><span style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;font-size:clamp(14px,1.9dvh,16px);font-weight:800;padding:4px 10px;border-radius:9999px;white-space:nowrap;line-height:1">VIP1</span></div>
          <div style="font-size:clamp(16px,2.4dvh,20px);font-weight:700;margin-top:6px;white-space:nowrap"><span style="color:#9ca3af">Balance: </span><span style="color:#98E7D2">₩1,000,000,000</span></div>
          <div style="font-size:clamp(16px,2.4dvh,20px);font-weight:700;margin-top:2px"><span style="color:#9ca3af">Points: </span><span style="color:#98E7D2">0.00</span></div>
        </div>
      </div>
      <a data-mslug="account" href="#/account" style="display:block;text-align:center;padding:9px 18px;border-radius:10px;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;font-weight:800;font-size:15px;line-height:1.25;text-decoration:none;margin:12px 24px 0">View Account</a>`
    : `<button data-auth="login" style="display:block;width:100%;text-align:left;padding:12px 14px;background:none;border:0;color:#fff;cursor:pointer;font-weight:600;font-size:15px">Login</button>
       <button data-auth="register" style="width:100%;padding:12px 14px;border-radius:10px;border:0;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;cursor:pointer;font-weight:700;font-size:15px;margin-top:4px">Register</button>`;
  const inner = `<div style="height:100%;min-height:0;display:flex;flex-direction:column;padding-bottom:clamp(10px,2dvh,24px)">
      <div style="display:flex;align-items:center;justify-content:space-between;height:clamp(76px,10.9dvh,92px);padding:0 24px;border-bottom:1px solid #263241;flex-shrink:0">
        <img src="assets/logo.png" alt="WIN100%" style="height:50px;mix-blend-mode:lighten">
        <button data-close style="background:none;border:0;color:#cbd5e1;cursor:pointer;padding:0"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div data-main-links style="display:grid;grid-template-rows:repeat(${MAIN_LINKS.length},minmax(0,1fr));flex:1;min-height:0;padding:clamp(8px,1.5dvh,14px) 0">
        ${MAIN_LINKS.map(([t, s, i]) => navRow(t, s, i, !!s && s === slug, 'main')).join('')}
      </div>
      <div style="flex-shrink:0">
        <div style="border-top:1px solid #374151;margin:clamp(12px,2.4dvh,28px) 24px"></div>
        ${account}
      </div>
    </div>`;
  openDrawer('right', inner, true);
}

// --- 圖4:底部 Browse → 會員選單 ---
function openMemberMenu() {
  const slug = curSlug();
  const inner = `<div style="height:100%;min-height:0;display:flex;flex-direction:column;padding:clamp(10px,1.8dvh,16px) 14px">
      <div style="display:flex;align-items:center;justify-content:space-between;height:clamp(42px,6dvh,54px);flex-shrink:0">
        <span style="color:#fff;font-weight:800;font-size:20px">Menu</span>
        <button data-close style="background:none;border:0;color:#cbd5e1;cursor:pointer;padding:0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
      </div>
      <div data-member-links style="display:grid;grid-template-rows:repeat(${MEMBER_LINKS.length},minmax(0,1fr));flex:1;min-height:0">
        ${MEMBER_LINKS.map(([t, s, i]) => navRow(t, s, i, s === slug, 'member')).join('')}
      </div>
    </div>`;
  openDrawer('left', inner, false, true);
}

window.openMobileMenu = openMainMenu;

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  const bottomNav = e.target.closest('nav[class*="bottom-0"]') || e.target.closest('nav.fixed');
  if (btn && btn.querySelector('svg.lucide-menu')) {
    e.preventDefault();
    if (bottomNav) openMemberMenu();   // 底部 Browse
    else openMainMenu();               // 右上漢堡
    return;
  }
  if (bottomNav && btn) {
    const label = (btn.textContent || '').trim();
    const map = { Home: 'home', Deposit: 'deposit', Promotion: 'promotion', Member: 'account' };
    if (map[label]) { e.preventDefault(); location.hash = '#/' + map[label]; }
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMobileMenu(); });

// --- 會員頁 header 補上右上漢堡(手機) ---
function injectHeaderHamburger() {
  const row = document.querySelector('#container header .flex.items-center.h-16');
  if (!row || row.querySelector('svg.lucide-menu')) return;
  const btn = document.createElement('button');
  btn.className = 'md:hidden text-gray-300 hover:text-white';
  btn.style.marginLeft = 'auto';
  btn.setAttribute('aria-label', 'Menu');
  btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-6 h-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
  row.appendChild(btn);
}
document.addEventListener('page:rendered', injectHeaderHamburger);
