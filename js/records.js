// === 紀錄表狀態篩選 (原生 JS) ===
const STATUSES = ['All', 'Pending', 'Approved', 'Rejected'];
function rbCloseMenus() { document.querySelectorAll('.rb-status-menu').forEach((m) => m.remove()); }

function rbRowStatus(row) {
  const s = [...row.querySelectorAll('span')].map((x) => x.textContent.trim())
    .find((t) => /^(Approved|Pending|Rejected|Completed)$/.test(t));
  return s || '';
}
function rbFilter(status) {
  document.querySelectorAll('#container table tr').forEach((tr) => {
    if (tr.querySelector('th')) return;
    const st = rbRowStatus(tr);
    if (!st) return;
    tr.style.display = (status === 'All' || st === status) ? '' : 'none';
  });
}

document.addEventListener('click', (e) => {
  // 選項
  const opt = e.target.closest('.rb-status-opt');
  if (opt) {
    const status = opt.dataset.status;
    const trig = document.querySelector('.rb-status-trigger');
    if (trig) trig.textContent = 'Status: ' + status;
    rbFilter(status);
    rbCloseMenus();
    return;
  }
  // 觸發鈕
  const trig = e.target.closest('button');
  if (trig && /^Status:/.test((trig.textContent || '').trim())) {
    e.preventDefault();
    if (document.querySelector('.rb-status-menu')) { rbCloseMenus(); return; }
    trig.classList.add('rb-status-trigger');
    const menu = document.createElement('div');
    menu.className = 'rb-status-menu';
    menu.style.cssText = 'position:absolute;z-index:50;margin-top:4px;left:0;background:#1a2128;border:1px solid #374151;border-radius:8px;overflow:hidden;min-width:150px;box-shadow:0 8px 24px rgba(0,0,0,.4)';
    STATUSES.forEach((s) => {
      const o = document.createElement('div');
      o.className = 'rb-status-opt'; o.dataset.status = s; o.textContent = s;
      o.style.cssText = 'padding:9px 14px;color:#d1d5db;font-size:14px;cursor:pointer';
      o.addEventListener('mouseenter', () => o.style.background = '#0f1419');
      o.addEventListener('mouseleave', () => o.style.background = '');
      menu.appendChild(o);
    });
    trig.parentElement.style.position = 'relative';
    trig.parentElement.appendChild(menu);
    return;
  }
  // 點別處關閉
  if (!e.target.closest('.rb-status-menu')) rbCloseMenus();
});
