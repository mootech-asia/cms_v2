// === 桌面 nav hover 下拉 (Sports / Live) ===
const NAV_DROPDOWNS = {
  sport: ['BTI', 'SABA'],
  live: ['Sexy', 'Pragmatic Play', 'Yeebet'],
};

function setupDropdowns() {
  document.querySelectorAll('.nav-dd-menu').forEach((m) => m.remove());
  Object.entries(NAV_DROPDOWNS).forEach(([slug, items]) => {
    const link = [...document.querySelectorAll('#container a')]
      .find((a) => new RegExp('/' + slug + '$').test(a.getAttribute('href') || '') && a.closest('header,nav') && !a.closest('nav[class*="bottom-0"]'));
    if (!link) return;
    const menu = document.createElement('div');
    menu.className = 'nav-dd-menu';
    menu.style.cssText = 'position:fixed;display:none;background:#1a2128;border:1px solid #2a3441;border-radius:10px;padding:6px;min-width:160px;z-index:1000;box-shadow:0 12px 30px rgba(0,0,0,.45)';
    menu.innerHTML = items.map((it) => {
      const href = `#/${slug}?provider=${encodeURIComponent(it)}`;
      return `<a class="nav-dd-item" href="${href}" style="display:block;padding:9px 14px;color:#d1d5db;font-size:14px;border-radius:6px;cursor:pointer;text-decoration:none">${it}</a>`;
    }).join('');
    document.body.appendChild(menu);
    let t;
    const show = () => { clearTimeout(t); const r = link.getBoundingClientRect(); menu.style.left = r.left + 'px'; menu.style.top = (r.bottom + 6) + 'px'; menu.style.display = 'block'; };
    const hide = () => { t = setTimeout(() => { menu.style.display = 'none'; }, 160); };
    link.addEventListener('mouseenter', show);
    link.addEventListener('mouseleave', hide);
    menu.addEventListener('mouseenter', show);
    menu.addEventListener('mouseleave', hide);
  });
}
document.addEventListener('page:rendered', setupDropdowns);
document.addEventListener('mouseover', (e) => { const it = e.target.closest('.nav-dd-item'); if (it) it.style.background = '#0f1419'; });
document.addEventListener('mouseout', (e) => { const it = e.target.closest('.nav-dd-item'); if (it) it.style.background = ''; });
