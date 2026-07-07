// === Customer Service 彈窗(選擇聯絡頻道)===
function closeSupportModal() { const m = document.getElementById('support-modal'); if (m) m.remove(); }

const CS_TEAL = '#98E7D2';
const S_CHAT = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>';
const S_SEND = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>';
const S_MAIL = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>';
const S_HEADSET = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>';
const S_CHEV = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';

function csIcon(svg) {
  return `<div style="width:44px;height:44px;border-radius:12px;background:rgba(152,231,210,.12);border:1px solid rgba(152,231,210,.35);display:flex;align-items:center;justify-content:center;color:${CS_TEAL};flex-shrink:0">${svg}</div>`;
}

const CS_CHANNELS = [
  ['Live Chat Support', '24/7 instant help from our team', S_CHAT, ''],
  ['Telegram Channel', 'Promotions & announcements', S_SEND, 'https://t.me/'],
  ['Email Us', 'support@100.gg · reply within 24h', S_MAIL, 'mailto:support@100.gg'],
];

function csRow(title, sub, icon, href) {
  return `<button data-cs-href="${href}" style="display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:16px;margin-bottom:12px;border-radius:12px;border:1px solid #2a3441;background:#0f1419;cursor:pointer;transition:all .15s">
      ${csIcon(icon)}
      <div style="flex:1;min-width:0">
        <div style="color:#fff;font-weight:700;font-size:16px">${title}</div>
        <div style="color:#9ca3af;font-size:13px;margin-top:2px">${sub}</div>
      </div>
      <span style="color:#6b7280;flex-shrink:0">${S_CHEV}</span>
    </button>`;
}

function openSupportModal() {
  closeSupportModal();
  const o = document.createElement('div');
  o.id = 'support-modal';
  o.style.cssText = 'position:fixed;inset:0;z-index:10050;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:16px';
  o.innerHTML = `<div style="background:#1a2128;border:1px solid #2a3441;border-radius:18px;max-width:440px;width:100%;box-shadow:0 24px 70px rgba(0,0,0,.6)">
      <div style="display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid #2a3441">
        ${csIcon(S_HEADSET)}
        <h3 style="flex:1;color:#fff;font-size:18px;font-weight:700;margin:0">Customer Service</h3>
        <button data-close style="width:34px;height:34px;border-radius:50%;border:1px solid #2a3441;background:none;color:#9ca3af;cursor:pointer;font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center">×</button>
      </div>
      <div style="padding:20px">
        <p style="color:#fff;font-weight:700;font-size:16px;margin:0 0 14px">Select a channel</p>
        ${CS_CHANNELS.map((c) => csRow(c[0], c[1], c[2], c[3])).join('')}
      </div>
    </div>`;
  o.addEventListener('click', (ev) => {
    if (ev.target === o || ev.target.closest('[data-close]')) return closeSupportModal();
    const row = ev.target.closest('[data-cs-href]');
    if (row) {
      const h = row.dataset.csHref;
      if (!h) return;
      if (/^mailto:/.test(h)) location.href = h; else window.open(h, '_blank');
    }
  });
  document.body.appendChild(o);
}
window.openSupportModal = openSupportModal;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSupportModal(); });

// 攔截任何「Customer Service」按鈕/連結 → 開彈窗(capture 先攔,擋掉原本導頁)
document.addEventListener('click', (e) => {
  const el = e.target.closest && e.target.closest('a,button,[data-mslug]');
  if (!el) return;
  if ((el.textContent || '').trim() !== 'Customer Service') return;
  e.preventDefault();
  e.stopPropagation();
  if (window.closeMobileMenu) window.closeMobileMenu();
  openSupportModal();
}, true);
