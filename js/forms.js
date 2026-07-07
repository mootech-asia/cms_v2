// === 表單細節:密碼顯示/隱藏切換 (原生 JS) ===
function ensurePaymentMethodStyles() {
  if (document.getElementById('payment-method-style')) return;
  const style = document.createElement('style');
  style.id = 'payment-method-style';
  style.textContent = `
    .pm-tabs{display:flex;gap:12px;margin:0 auto 24px;width:100%;max-width:56rem}
    .pm-tab{display:flex;align-items:center;gap:10px;padding:12px 18px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:600;font-size:16px;cursor:pointer;transition:border-color .18s,background .18s,color .18s}
    .pm-tab svg{width:22px;height:22px;flex:0 0 auto}
    .pm-tab.active{border-color:#98E7D2;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622}
    .pm-shell{width:100%;max-width:56rem;margin:0 auto}
    .pm-panel[hidden]{display:none!important}
    .pm-crypto-card{background:#1a2128;border:1px solid #1f2937;border-radius:10px;padding:32px}
    .pm-title{display:flex;align-items:center;gap:12px;color:#aae5d3;font-size:20px;font-weight:600;margin:0 0 24px}
    .pm-title:before{content:'';width:4px;height:28px;background:#aae5d3}
    .pm-method-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}
    .pm-method{display:flex;align-items:center;gap:10px;min-width:170px;padding:12px 16px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:600}
    .pm-method.active{border-color:transparent;color:#aae5d3;background:#313e40}
    .pm-coin{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#12a97b;color:#fff;font-weight:700}
    .pm-bitcoin{background:#f59e0b;color:#fff}
    .pm-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center;margin-bottom:16px}
    .pm-label{color:#d1d5db;font-weight:600}
    .pm-input{box-sizing:border-box;width:100%;min-height:50px;background:#0f1419;border:1px solid #374151;border-radius:10px;padding:12px 16px;color:#fff;font-size:16px;outline:none}
    .pm-input:focus{border-color:#98E7D2}
    .pm-converted-row{display:flex;align-items:center;gap:12px}
    .pm-converted-row .pm-input{flex:1;min-width:0}
    .pm-note{color:#f87171;font-size:14px;font-weight:400;line-height:1.5;margin:8px 0 0}
    .pm-rate{color:#d1d5db;font-size:14px;margin:8px 0 32px}
    .pm-promos{display:grid;gap:16px}
    .pm-promo{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:24px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;cursor:pointer;transition:border-color .18s,background .18s}
    .pm-promo.active{border-color:#98E7D2;background:#0f1419}
    .pm-radio{width:20px;height:20px;border-radius:50%;border:2px solid #6b7280;flex:0 0 auto}
    .pm-promo.active .pm-radio{border-color:#98E7D2;box-shadow:inset 0 0 0 4px #0f1419;background:#98E7D2}
    .pm-promo-main{display:flex;align-items:center;gap:12px;font-weight:600}
    .pm-promo-amount{color:#aae5d3;font-size:14px;font-weight:600;white-space:nowrap}
    .pm-action{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;min-width:150px;height:56px;margin-top:24px;padding:0 16px;border:0;border-radius:10px;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;font-weight:600;font-size:16px;line-height:1;cursor:pointer}
    .pm-submit{display:flex;width:100%;background:#4b5563;color:#fff;cursor:not-allowed}
    .pm-submit.ready{background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;cursor:pointer}
    .pm-back{box-sizing:border-box;display:flex;align-items:center;justify-content:center;width:100%;height:56px;margin-top:16px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#fff;font-weight:600;font-size:16px;cursor:pointer}
    .pm-wallet-layout{display:grid;grid-template-columns:minmax(0,1fr);gap:20px}
    .pm-wallet-empty{min-height:292px;border:0;border-radius:16px;background:linear-gradient(105deg,#163f34 0%,#0f2a23 28%,#0b1815 55%,#0a0e12 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#d1d5db;padding:48px}
    .pm-empty-coin{box-sizing:border-box;width:96px;height:96px;border:2px dashed #4b5563;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(26,33,40,.6);color:#9ca3af;font-size:40px;font-weight:600;margin-bottom:16px}
    .pm-add-wallet{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:8px 24px;border-radius:10px;border:0;background:#313e40;color:#aae5d3;font-weight:600;font-size:16px;cursor:pointer}
    .pm-wallet-form{margin-top:24px;display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center}
    .pm-wallet-form label{color:#d1d5db;font-weight:600}
    .pm-select{box-sizing:border-box;width:100%;min-height:50px;appearance:none;background:#0f1419;border:1px solid #374151;border-radius:10px;padding:12px 36px 12px 16px;color:#d1d5db;font-size:16px}
    .pm-balance{display:grid;grid-template-columns:190px minmax(0,1fr);gap:8px 20px;margin-top:24px;color:#d1d5db}
    .pm-balance strong{color:#aae5d3;font-size:20px;font-weight:600}
    .wm-mode-tabs{display:flex;gap:32px;width:100%;max-width:56rem;margin:0 auto 24px;border-bottom:1px solid #263241}
    .wm-mode-tab{position:relative;padding:0 0 12px;background:none;border:0;color:#9ca3af;font-weight:600;font-size:16px;cursor:pointer}
    .wm-mode-tab.active{color:#98E7D2}
    .wm-mode-tab.active:after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:99px;background:#98E7D2}
    .wm-management[hidden],.wm-method-panel[hidden]{display:none!important}
    .wm-management{box-sizing:border-box;width:100%;max-width:56rem;margin:0 auto;background:#1a2128;border:1px solid #1f2937;border-radius:10px;padding:32px}
    .wm-method-tabs{display:flex;gap:12px;margin-bottom:24px}
    .wm-method-tab{display:flex;align-items:center;gap:10px;min-width:170px;padding:12px 18px;border-radius:10px;border:1px solid #374151;background:#0f1419;color:#d1d5db;font-weight:600;font-size:16px;cursor:pointer}
    .wm-method-tab svg{width:22px;height:22px;flex:0 0 auto}
    .wm-method-tab.active{border-color:#98E7D2;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622}
    .wm-management-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:32px}
    .wm-account-summary{margin-bottom:32px}
    .wm-form-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center}
    .wm-form-grid label{color:#d1d5db;font-weight:600}
    .wm-section-title{display:flex;align-items:center;gap:12px;color:#aae5d3;font-weight:600;font-size:20px;margin:0 0 24px}
    .wm-section-title:before{content:'';width:4px;height:28px;background:#aae5d3}
    .wm-registered-card{box-sizing:border-box;display:flex;align-items:center;gap:16px;width:100%;height:140px;border-radius:10px;background:#0f1419;border:1px solid #374151;padding:24px;color:#d1d5db}
    .wm-bank-logo{display:flex;align-items:center;justify-content:center;width:80px;height:56px;border-radius:10px;background:#dbeafe;color:#0f172a;font-weight:700}
    .wm-card-title{color:#fff;font-weight:600;margin-bottom:4px}
    .wm-card-muted{color:#9ca3af;font-size:14px}
    .wm-empty-list{box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:140px;text-align:center;color:#9ca3af;border:1px solid #374151;border-radius:10px;background:#0f1419}
    .wm-empty-list .pm-empty-coin{width:72px;height:72px;margin-bottom:12px;font-size:32px}
    @media(max-width:700px){
      .pm-tabs{gap:8px;margin-bottom:16px}
      .pm-tab{flex:1;justify-content:center;padding:10px 12px;font-size:14px}
      .pm-crypto-card{padding:16px}
      .pm-title{font-size:16px;margin-bottom:16px}
      .pm-title:before{height:22px}
      .pm-method-row{margin-bottom:16px}
      .pm-method{min-width:0;font-size:14px}
      .pm-grid,.pm-wallet-form,.pm-balance{grid-template-columns:1fr;gap:8px}
      .pm-label,.pm-wallet-form label{font-size:14px}
      .pm-input,.pm-select{min-height:48px;font-size:14px}
      .pm-note{font-size:12px}
      .pm-rate{font-size:13px;margin-bottom:24px}
      .pm-wallet-layout{grid-template-columns:1fr}
      .pm-promos{gap:12px}
      .pm-promo{align-items:stretch;flex-direction:column;gap:8px;padding:16px}
      .pm-promo-main{align-items:flex-start;gap:10px;font-size:14px;line-height:1.5}
      .pm-promo-main .pm-radio{width:18px;height:18px;margin-top:1px}
      .pm-promo-amount{padding-left:28px;font-size:14px;line-height:1.4}
      .pm-action,.pm-back{height:48px;font-size:14px}
      .pm-wallet-empty{min-height:220px;padding:24px}
      .pm-empty-coin{width:80px;height:80px;font-size:34px}
      .pm-add-wallet{font-size:14px}
      .wm-mode-tabs{gap:24px;margin-bottom:16px}
      .wm-mode-tab{font-size:14px}
      .wm-management{padding:16px}
      .wm-management-grid,.wm-form-grid{grid-template-columns:1fr;gap:8px}
      .wm-method-tab{flex:1;min-width:0;justify-content:center;padding:10px 12px;font-size:14px}
      .wm-account-summary{margin-bottom:24px}
      .wm-section-title{gap:10px;font-size:16px;margin-bottom:16px}
      .wm-section-title:before{height:22px}
      .wm-registered-card{padding:16px}
      .wm-form-grid label:not(:first-child),.pm-wallet-form label:not(:first-child){margin-top:8px}
    }
  `;
  document.head.appendChild(style);
}

function paymentIcon(type) {
  if (type === 'crypto') {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 8h3.8a2.2 2.2 0 0 1 0 4.4H9.5z"/><path d="M9.5 12.4h4.2a2.3 2.3 0 0 1 0 4.6H9.5z"/><path d="M9.5 6v12M11 4.5V6M14 4.5V6M11 18v1.5M14 18v1.5"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 15h4"/></svg>';
}

function methodTabs(active) {
  return `
    <div class="pm-tabs" data-payment-tabs>
      <button class="pm-tab ${active === 'bank' ? 'active' : ''}" type="button" data-pay-tab="bank">${paymentIcon('bank')}<span>Bank Card</span></button>
      <button class="pm-tab ${active === 'crypto' ? 'active' : ''}" type="button" data-pay-tab="crypto">${paymentIcon('crypto')}<span>Crypto Wallet</span></button>
    </div>`;
}

function depositCryptoPanel() {
  return `
    <div class="pm-panel" data-pay-panel="crypto" hidden>
      <div class="pm-crypto-card">
        <h2 class="pm-title">Deposit Info</h2>
        <div class="pm-method-row">
          <div class="pm-method active"><span class="pm-coin">₮</span><span>USDT TRC20</span></div>
        </div>
        <div class="pm-grid">
          <div class="pm-label">Deposit Amounts:</div>
          <div><input class="pm-input" data-crypto-deposit-amount placeholder="Deposit Amounts" inputmode="numeric"><p class="pm-note">Deposit Limit: ₩ 50,000 (32.96 USDT) - ₩ 8,999,999 (5,932.83 USDT)</p></div>
          <div class="pm-label">Converted Crypto Amount:</div>
          <div class="pm-converted-row"><input class="pm-input" data-crypto-converted-amount value="0.00" disabled><span class="pm-label">USDT</span></div>
        </div>
        <p class="pm-rate">Exchange rate: <strong>1 USDT = ₩ 1,516.98</strong></p>
        <h2 class="pm-title">Choose promotion</h2>
        <div class="pm-promos">
          ${['[USDT only] Slot Daily First Deposit 5%','[USDT only] Casino Reload 5%','[USDT only] Slot Reload 5%'].map((text) => `
            <label class="pm-promo">
              <span class="pm-promo-main"><span class="pm-radio"></span><span>${text}</span></span>
              <span class="pm-promo-amount">≥₩ 10,000.00</span>
            </label>`).join('')}
        </div>
        <button class="pm-action pm-submit" type="button" disabled>Apply for Deposit</button>
      </div>
    </div>`;
}

function withdrawalCryptoPanel() {
  return `
    <div class="pm-panel" data-pay-panel="crypto" hidden>
      <div class="pm-crypto-card">
        <h2 class="pm-title">Crypto Wallet</h2>
        <div class="pm-wallet-layout">
          <div class="pm-wallet-empty">
            <div class="pm-empty-coin">₿</div>
            <div>Empty wallet list</div>
            <button class="pm-add-wallet" type="button"><span style="font-size:20px;line-height:1">+</span>Add wallet</button>
          </div>
        </div>
        <div class="pm-balance">
          <div>Central Wallet:</div><strong>0.00</strong>
          <div>Available Amount:</div><strong>0.00</strong>
        </div>
        <h2 class="pm-title" style="margin-top:24px">Withdrawal Amount & Password</h2>
        <div class="pm-wallet-form">
          <label>Wallet type:</label><select class="pm-select"><option>Please select wallet type</option><option>USDT TRC20</option></select>
          <label>Wallet address:</label><input class="pm-input" placeholder="Please fill in wallet address">
          <label>Withdrawal Amount:</label><input class="pm-input" placeholder="100,000 ~ 20,000,000">
          <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please fill in the transaction password">
        </div>
        <button class="pm-action pm-submit" type="button" disabled>Submit</button>
        <button class="pm-back" type="button" data-form-back="bank">Back</button>
      </div>
    </div>`;
}

function withdrawalModeTabs() {
  return `
    <div class="wm-mode-tabs" data-withdrawal-mode-tabs>
      <button class="wm-mode-tab active" type="button" data-withdrawal-mode="withdraw">Withdraw</button>
      <button class="wm-mode-tab" type="button" data-withdrawal-mode="management">Account Management</button>
    </div>`;
}

function accountManagementPanel() {
  return `
    <div class="wm-management" data-withdrawal-management hidden>
      <div class="wm-method-tabs" data-account-method-tabs>
        <button class="wm-method-tab active" type="button" data-account-method="bank">${paymentIcon('bank')}<span>Bank Account</span></button>
        <button class="wm-method-tab" type="button" data-account-method="crypto">${paymentIcon('crypto')}<span>Crypto Wallet</span></button>
      </div>

      <div class="wm-method-panel" data-account-panel="bank">
        <div class="wm-management-grid">
          <div>
            <div class="wm-account-summary">
              <h2 class="wm-section-title">Registered Withdrawal Accounts <span style="color:#d1d5db;font-weight:700">(1/5)</span></h2>
              <div class="wm-registered-card">
                <div class="wm-bank-logo">신한은행</div>
                <div>
                  <div class="wm-card-title">Shinhan Bank</div>
                  <div class="wm-card-muted">********5123</div>
                  <div class="wm-card-muted">2025-01-08 21:22:25</div>
                </div>
              </div>
            </div>
            <div class="wm-form-grid">
              <label>Select Bank:</label><select class="pm-select"><option>Please Select a Bank</option><option>Shinhan Bank</option><option>KB Bank</option></select>
              <label>Name on Card:</label><input class="pm-input" value="T***" disabled>
              <label>Account Number:</label><input class="pm-input" placeholder="Please Enter Account/Card/Phone number">
              <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pm-action pm-submit" type="button" disabled>Submit</button>
            <button class="pm-back" type="button" data-form-back="withdraw">Back</button>
          </div>
        </div>
      </div>

      <div class="wm-method-panel" data-account-panel="crypto" hidden>
        <div class="wm-management-grid">
          <div>
            <div class="wm-account-summary">
              <h2 class="wm-section-title">Bound wallet <span style="color:#d1d5db;font-weight:700">(0/1)</span></h2>
              <div class="wm-empty-list">
                <div class="pm-empty-coin">₿</div>
                <div>Empty wallet list</div>
              </div>
            </div>
            <div class="wm-form-grid">
              <label>Wallet type:</label><select class="pm-select"><option>Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input class="pm-input" placeholder="Please fill in wallet address">
              <label>Transaction Password:</label><input class="pm-input" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pm-action pm-submit" type="button" disabled>Submit</button>
            <button class="pm-back" type="button" data-form-back="withdraw">Back</button>
          </div>
        </div>
      </div>
    </div>`;
}

function switchPaymentPanel(root, target) {
  root.querySelectorAll('[data-pay-tab]').forEach((button) => {
    button.classList.toggle('active', button.dataset.payTab === target);
  });
  root.querySelectorAll('[data-pay-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.payPanel !== target;
  });
}

function switchWithdrawalMode(main, target) {
  main.querySelectorAll('[data-withdrawal-mode]').forEach((button) => {
    button.classList.toggle('active', button.dataset.withdrawalMode === target);
  });
  const showManagement = target === 'management';
  const paymentTabs = main.querySelector('[data-payment-tabs]');
  const shell = main.querySelector('.pm-shell');
  const management = main.querySelector('[data-withdrawal-management]');
  if (paymentTabs) paymentTabs.hidden = showManagement;
  if (shell) shell.hidden = showManagement;
  if (management) management.hidden = !showManagement;
}

function switchAccountMethod(main, target) {
  main.querySelectorAll('[data-account-method]').forEach((button) => {
    button.classList.toggle('active', button.dataset.accountMethod === target);
  });
  main.querySelectorAll('[data-account-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.accountPanel !== target;
  });
}

function syncDepositCryptoAmount(input) {
  const panel = input.closest('[data-pay-panel="crypto"]');
  const output = panel?.querySelector('[data-crypto-converted-amount]');
  if (!output) return;
  const amount = Number((input.value || '').replace(/[^\d]/g, ''));
  output.value = amount > 0 ? (amount / 1516.98).toFixed(2) : '0.00';
}

function updatePaymentSubmitStates(main) {
  main.querySelectorAll('.pm-submit').forEach((button) => {
    const panel = button.closest('.pm-panel, .wm-method-panel');
    const controls = panel ? [...panel.querySelectorAll('input:not([disabled]), select')] : [];
    const ready = controls.some((control) => control.tagName === 'SELECT'
      ? control.selectedIndex > 0
      : control.value.trim() !== '') || Boolean(panel?.querySelector('.pm-promo.active'));
    button.disabled = !ready;
    button.classList.toggle('ready', ready);
  });
}

function initPaymentMethods(slug) {
  if (slug !== 'deposit' && slug !== 'withdrawal') return;
  const main = document.querySelector('#container main');
  if (!main || main.dataset.paymentReady === '1') return;
  const card = [...main.children].find((el) => el.tagName === 'DIV' && el.textContent.includes(slug === 'deposit' ? 'Deposit Amount' : 'My Bank Accounts'));
  if (!card) return;
  ensurePaymentMethodStyles();
  main.dataset.paymentReady = '1';
  const shell = document.createElement('div');
  shell.className = 'pm-shell';
  card.parentNode.insertBefore(shell, card);
  if (slug === 'withdrawal') shell.insertAdjacentHTML('beforebegin', withdrawalModeTabs());
  shell.insertAdjacentHTML('beforebegin', methodTabs('bank'));
  card.dataset.payPanel = 'bank';
  card.classList.add('pm-panel');
  shell.appendChild(card);
  shell.insertAdjacentHTML('beforeend', slug === 'deposit' ? depositCryptoPanel() : withdrawalCryptoPanel());
  if (slug === 'withdrawal') shell.insertAdjacentHTML('afterend', accountManagementPanel());
  const tabs = main.querySelector('[data-payment-tabs]');
  tabs.addEventListener('click', (e) => {
    const button = e.target.closest('[data-pay-tab]');
    if (!button) return;
    switchPaymentPanel(main, button.dataset.payTab);
  });
  main.addEventListener('click', (e) => {
    const back = e.target.closest('[data-form-back]');
    if (back) {
      if (back.dataset.formBack === 'bank') switchPaymentPanel(main, 'bank');
      if (back.dataset.formBack === 'withdraw') switchWithdrawalMode(main, 'withdraw');
      return;
    }
    const promo = e.target.closest('.pm-promo');
    if (!promo || !main.contains(promo)) return;
    main.querySelectorAll('.pm-promo').forEach((item) => item.classList.toggle('active', item === promo));
    updatePaymentSubmitStates(main);
  });
  main.addEventListener('input', (e) => {
    const input = e.target.closest('[data-crypto-deposit-amount]');
    if (input) syncDepositCryptoAmount(input);
    updatePaymentSubmitStates(main);
  });
  main.addEventListener('change', () => updatePaymentSubmitStates(main));
  if (slug === 'withdrawal') {
    main.querySelector('[data-withdrawal-mode-tabs]')?.addEventListener('click', (e) => {
      const button = e.target.closest('[data-withdrawal-mode]');
      if (button) switchWithdrawalMode(main, button.dataset.withdrawalMode);
    });
    main.querySelector('[data-account-method-tabs]')?.addEventListener('click', (e) => {
      const button = e.target.closest('[data-account-method]');
      if (button) switchAccountMethod(main, button.dataset.accountMethod);
    });
  }
  updatePaymentSubmitStates(main);
}

document.addEventListener('page:rendered', (e) => {
  initPaymentMethods(e.detail?.slug);
});

document.addEventListener('click', (e) => {
  const eye = e.target.closest('button[type="button"]');
  if (!eye || !eye.querySelector('svg') || !/absolute/.test(eye.className)) return;
  const inp = eye.parentElement && eye.parentElement.querySelector('input');
  if (inp && (inp.type === 'password' || inp.dataset.pw === '1')) {
    e.preventDefault();
    inp.dataset.pw = '1';
    inp.type = inp.type === 'password' ? 'text' : 'password';
  }
});
