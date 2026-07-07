// === 遊戲 Modal + 收藏切換 (原生 JS) ===
function closeGameModal() { const m = document.getElementById('game-modal'); if (m) m.remove(); }

function openGameModal({ name, src, provider }) {
  closeGameModal();
  const o = document.createElement('div');
  o.id = 'game-modal';
  o.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:16px';
  o.innerHTML = `
    <div style="background:#1a2128;border:1px solid #2a3441;border-radius:16px;max-width:420px;width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5)">
      <div style="position:relative">
        <img src="${src}" alt="${name}" style="width:100%;height:200px;object-fit:cover">
        <button data-close style="position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;border:0;cursor:pointer;font-size:18px;line-height:1">×</button>
      </div>
      <div style="padding:20px">
        <h3 style="color:#fff;font-size:20px;font-weight:700;margin:0 0 4px">${name}</h3>
        <p style="color:#9ca3af;font-size:13px;margin:0 0 16px">${provider || ''}</p>
        <button style="width:100%;padding:12px;border-radius:10px;border:0;cursor:pointer;font-weight:600;color:#111827;background:linear-gradient(90deg,#CBE8E4,#98E7D2)">Play Now</button>
      </div>
    </div>`;
  o.addEventListener('click', (ev) => { if (ev.target === o || ev.target.closest('[data-close]')) closeGameModal(); });
  document.body.appendChild(o);
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeGameModal(); });

document.addEventListener('click', (e) => {
  const card = e.target.closest('div.group');
  if (!card) return;
  const img = card.querySelector('img[alt]');
  if (!img) return;

  // 收藏星:切換,不開 Modal
  const fav = e.target.closest('button');
  if (fav && fav.querySelector('svg') && /absolute/.test(fav.className)) {
    e.preventDefault(); e.stopPropagation();
    const on = fav.dataset.fav !== '1';
    fav.dataset.fav = on ? '1' : '';
    const svg = fav.querySelector('svg');
    svg.setAttribute('fill', on ? '#98E7D2' : 'none');
    svg.style.stroke = on ? '#98E7D2' : 'currentColor';
    return;
  }

  // 開遊戲 Modal
  const ps = card.querySelectorAll('p');
  const name = (ps[0]?.textContent || img.getAttribute('alt') || 'Game').trim();
  const provider = (ps[1]?.textContent || '').trim();
  openGameModal({ name, src: img.src, provider });
});
