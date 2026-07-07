// === 帳戶/金流頁互動 (原生 JS) ===
const AMT_RE = /^\d{1,3}(,\d{3})+$/;

function updateDepositNextState() {
  const main = document.querySelector('#container main');
  if (!main || !/^Deposit$/i.test((main.querySelector('h1')?.textContent || '').trim())) return;
  const next = [...main.querySelectorAll('button')].find((button) => (button.textContent || '').trim() === 'Next');
  if (!next) return;
  const amountInput = [...main.querySelectorAll('input')].find((input) => /₩/.test(input.value || input.placeholder || ''));
  const hasAmount = Number((amountInput?.value || '').replace(/[^\d]/g, '')) > 0;
  const hasPromotion = [...main.querySelectorAll('div.w-5.rounded-full.border-2')].some((radio) => radio.children.length > 0);
  const ready = hasAmount && hasPromotion;
  next.disabled = !ready;
  next.style.background = ready ? 'linear-gradient(90deg,#CBE8E4,#98E7D2)' : '#4b5563';
  next.style.color = ready ? '#0f1622' : '#fff';
  next.style.cursor = ready ? 'pointer' : 'not-allowed';
}

document.addEventListener('click', (e) => {
  // --- 金額快選 ---
  const btn = e.target.closest('button');
  if (btn && AMT_RE.test((btn.textContent || '').trim())) {
    const grid = btn.parentElement;
    [...grid.querySelectorAll('button')].forEach((x) => {
      if (AMT_RE.test((x.textContent || '').trim())) {
        x.style.background = '#0f1419'; x.style.color = '#fff'; x.style.border = '1px solid #374151';
      }
    });
    btn.style.background = '#313E40'; btn.style.color = '#AAE5D3'; btn.style.border = '1px solid transparent';
    const amt = (btn.textContent || '').trim();
    const input = [...document.querySelectorAll('#container input')]
      .find((i) => /₩/.test(i.getAttribute('placeholder') || '') || /₩/.test(i.value || ''));
    if (input) input.value = '₩ ' + amt;
    updateDepositNextState();
    return;
  }

  // --- 優惠單選 ---
  const card = e.target.closest('.items-start');
  if (card) {
    const radio = card.querySelector('div.w-5.rounded-full.border-2');
    if (radio && card.querySelector('h3')) {
      document.querySelectorAll('#container div.w-5.rounded-full.border-2').forEach((r) => {
        r.style.borderColor = '#4b5563'; r.innerHTML = '';
      });
      radio.style.borderColor = '#98E7D2';
      radio.innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:#98E7D2"></div>';
      updateDepositNextState();
    }
  }
});

document.addEventListener('input', updateDepositNextState);
document.addEventListener('page:rendered', updateDepositNextState);
