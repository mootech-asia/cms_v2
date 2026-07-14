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
  // --- Account Overview: 查看更多紀錄 ---
  const recordsLink = e.target.closest('button, a');
  if (recordsLink && (recordsLink.textContent || '').includes('View More Records')) {
    e.preventDefault();
    window.location.hash = '#/account-record';
    return;
  }

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

// --- Banking Details 簡易編輯(分頁/刪除) ---
// 與 banking-details 頁(member-forms.js)共用同一份綁定帳戶資料
window.BANK_STORE = window.BANK_STORE || {
  accounts: [
    { bank: 'KB Bank', num: '**** **** **** 1234', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-08-14' },
    { bank: 'Shinhan Bank', num: '**** **** **** 5678', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-09-05' },
    { bank: 'Woori Bank', num: '**** **** **** 9012', holder: 'M＊＊＊＊＊＊＊', bindDate: '2025-10-02' },
  ],
};
const bankAccounts = window.BANK_STORE.accounts;
let bankIdx = 0;

function renderBankCard() {
  const card = document.querySelector('#container .bk-card');
  if (!card) return;
  const total = bankAccounts.length;
  if (bankIdx >= total) bankIdx = Math.max(0, total - 1);
  card.querySelector('.bk-idx').textContent = total ? bankIdx + 1 : 0;
  card.querySelector('.bk-total').textContent = total;
  card.querySelector('.bk-rows').style.display = total ? '' : 'none';
  card.querySelector('.bk-empty').style.display = total ? 'none' : '';
  if (total) {
    card.querySelector('.bk-num').textContent = bankAccounts[bankIdx].num;
    card.querySelector('.bk-name').textContent = bankAccounts[bankIdx].bank;
  }
}

function deleteBankAccount(index) {
  bankAccounts.splice(index, 1);
  if (bankIdx >= bankAccounts.length) bankIdx = Math.max(0, bankAccounts.length - 1);
  renderBankCard();
  if (window.showMemberModal) window.showMemberModal({ type: 'success' });
}

function confirmDeleteBankAccount(index) {
  const account = bankAccounts[index];
  const message = account ? account.num + ' ?' : 'Delete this bank account?';
  if (window.showMemberModal) {
    window.showMemberModal({
      type: 'confirm',
      message,
      onConfirm: () => deleteBankAccount(index),
    });
    return;
  }
  if (window.confirm(message)) deleteBankAccount(index);
}

document.addEventListener('click', (e) => {
  const prev = e.target.closest('.bk-prev');
  const next = e.target.closest('.bk-next');
  const del = e.target.closest('.bk-del');
  if (!prev && !next && !del) return;
  const total = bankAccounts.length;
  if (del && total) {
    e.preventDefault();
    e.stopPropagation();
    confirmDeleteBankAccount(bankIdx);
    return;
  }
  if (prev && total) bankIdx = (bankIdx - 1 + total) % total;
  if (next && total) bankIdx = (bankIdx + 1) % total;
  renderBankCard();
});

document.addEventListener('page:rendered', renderBankCard);
