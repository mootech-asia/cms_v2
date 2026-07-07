// === 遊戲搜尋即時過濾 (原生 JS) ===
function gameCards() {
  return [...document.querySelectorAll('#container div.group')].filter(c => c.querySelector('img[alt]'));
}

document.addEventListener('input', (e) => {
  const input = e.target;
  if (!input || input.tagName !== 'INPUT') return;
  const ph = (input.getAttribute('placeholder') || '').toLowerCase();
  if (!/search/.test(ph)) return;          // 只處理搜尋框
  const q = input.value.trim().toLowerCase();
  gameCards().forEach(c => {
    const txt = (c.textContent || '').toLowerCase();
    c.style.display = (!q || txt.includes(q)) ? '' : 'none';
  });
});
