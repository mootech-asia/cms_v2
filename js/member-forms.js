// === 會員內頁:Change Login Password / Banking Details 互動 + 共用彈窗 (原生 JS) ===
(function () {
  const EYE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';
  const CHEVRON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
  const SEARCH = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  const CHECK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const ALERT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  const QUESTION = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  const BANK_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="16" height="11" rx="2"/><path d="M2 11h16"/><circle cx="8" cy="14.5" r="1.4"/><path d="M18 9.5l3.6 1.5a1 1 0 0 1 .4 1.4l-2 3.4"/></svg>';

  const DEMO_BANKS = ['Bank of America', 'Shinhan Bank', 'KB Kookmin Bank', 'Woori Bank', 'NH Nonghyup Bank', 'Hana Bank', '산림조합중앙회 Bank'];

  function injectStyle() {
    if (document.getElementById('mf-style')) return;
    const s = document.createElement('style');
    s.id = 'mf-style';
    s.textContent = `
      .mf-card{background:#1a2128;border:1px solid #1f2937;border-radius:12px;padding:24px;max-width:56rem;margin:0 auto;width:100%;box-sizing:border-box}
      .mf-field{position:relative;margin-bottom:16px}
      .mf-input{box-sizing:border-box;width:100%;min-height:52px;background:#0f1419;border:1px solid #374151;border-radius:10px;padding:14px 46px 14px 16px;color:#fff;font-size:15px;outline:none}
      .mf-input.plain{padding-right:16px}
      .mf-input::placeholder{color:#6b7280}
      .mf-input:focus{border-color:#98E7D2}
      .mf-input:disabled{background:#232b36;color:#6b7280;cursor:not-allowed}
      .mf-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:0;color:#9ca3af;cursor:pointer;padding:0;line-height:0}
      .mf-eye:hover{color:#d1d5db}
      .mf-eye svg{width:20px;height:20px}
      .mf-hint{color:#fff;font-size:14px;margin:6px 0 24px}
      .mf-submit{display:block;width:100%;padding:15px;border:0;border-radius:10px;background:#4b5563;font-weight:700;font-size:16px;cursor:not-allowed;text-align:center}
      .mf-submit span{color:#e5e7eb}
      .mf-submit.ready{background:#0a1526;cursor:pointer}
      .mf-submit.ready span{background:linear-gradient(90deg,#ff4d9d 10%,#ff8a3d 60%,#ffb43d);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;font-weight:800}
      .mf-back{display:block;width:100%;margin-top:14px;padding:15px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#fff;font-weight:700;font-size:16px;text-align:center;text-decoration:none;cursor:pointer;box-sizing:border-box}
      .mf-back:hover{border-color:#4b5563}
      .mf-section{display:flex;justify-content:center;margin:8px 0 20px}
      .mf-section span{display:inline-block;padding:10px 22px;border-radius:999px;background:#0a1526;color:#aae5d3;font-weight:700;font-size:15px}
      .mf-select-wrap{position:relative;margin-bottom:16px}
      .mf-select{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:52px;background:#fff;border:1px solid #d1d5db;border-radius:10px;padding:12px 16px;color:#1a2128;font-size:15px;cursor:pointer;text-align:left}
      .mf-select.placeholder{color:#6b7280}
      .mf-select svg{width:18px;height:18px;color:#6b7280;flex:0 0 auto}
      .mf-select-menu{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:30;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,.35)}
      .mf-select-search{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #eef0f2}
      .mf-select-search svg{width:18px;height:18px;color:#9ca3af;flex:0 0 auto}
      .mf-select-search input{flex:1;border:0;outline:none;font-size:15px;color:#1a2128;background:none}
      .mf-select-opts{max-height:220px;overflow-y:auto}
      .mf-select-opt{padding:13px 16px;color:#1a2128;font-size:15px;cursor:pointer;border-bottom:1px solid #f1f3f5}
      .mf-select-opt:last-child{border-bottom:0}
      .mf-select-opt:hover{background:#f5f7f9}
      .mf-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#151b24;border:1px solid #1f2937;border-radius:14px;padding:44px 24px}
      .mf-empty-coin{width:92px;height:92px;border:2px dashed #4b5563;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(26,33,40,.6);color:#9ca3af;margin-bottom:16px}
      .mf-empty-coin svg{width:44px;height:44px}
      .mf-empty-title{color:#fff;font-size:18px;font-weight:700;margin:0 0 16px}
      .mf-add-btn{display:inline-flex;align-items:center;gap:8px;padding:9px 22px;border:0;border-radius:999px;background:#313e40;color:#aae5d3;font-weight:700;font-size:15px;cursor:pointer}
      .mf-acct{display:flex;align-items:flex-start;gap:12px;background:#1a2128;border:1px solid #1f2937;border-radius:12px;padding:18px 20px;margin-bottom:14px;cursor:pointer;transition:border-color .15s}
      .mf-acct:hover{border-color:#374151}
      .mf-acct-check{width:22px;height:22px;flex:0 0 auto;color:#22c55e;margin-top:2px}
      .mf-acct-check svg{width:22px;height:22px}
      .mf-acct-title{color:#fff;font-size:16px;font-weight:800;margin:0 0 6px}
      .mf-acct-bank{color:#aae5d3;font-size:13px;font-weight:600;margin:0 0 2px}
      .mf-acct-num{color:#9ca3af;font-size:13px;letter-spacing:.04em;margin:0}
      .mf-fab{position:fixed;right:22px;bottom:88px;z-index:60;width:54px;height:54px;border-radius:50%;border:2px solid #98E7D2;background:#0f1419;color:#98E7D2;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.4)}
      .mf-fab svg{width:26px;height:26px}
      @media(min-width:768px){.mf-fab{bottom:32px;right:32px}}
      .mf-overlay{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);padding:20px}
      .mf-modal{position:relative;width:340px;max-width:calc(100vw - 40px);background:#2b313c;border-radius:22px;padding:34px 28px 24px;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.5)}
      .mf-modal::before{content:"";position:absolute;inset:0;border-radius:22px;padding:2px;background:linear-gradient(120deg,#ff4d9d,#ff8a3d,#ffb43d);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
      .mf-modal-icon{width:58px;height:58px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
      .mf-modal-icon svg{width:30px;height:30px;color:#1a2128}
      .mf-modal-title{color:#fff;font-size:22px;font-weight:800;margin:0 0 8px}
      .mf-modal-msg{color:#c3cbd6;font-size:14px;margin:0 0 22px;line-height:1.5;word-break:break-word}
      .mf-modal-btn{display:block;width:100%;padding:13px;border:0;border-radius:999px;background:linear-gradient(90deg,#ff4d9d,#ffb43d);color:#1a2128;font-weight:800;font-size:15px;cursor:pointer}
      .mf-modal-btn.secondary{background:none;color:#fff;margin-top:6px}
    `;
    document.head.appendChild(s);
  }

  // ---------- 共用彈窗 ----------
  function closeModal() {
    document.querySelectorAll('.mf-overlay').forEach((o) => o.remove());
  }
  function showModal(opts) {
    injectStyle();
    closeModal();
    const type = opts.type || 'success';
    const icon = type === 'warning' ? ALERT : type === 'confirm' ? QUESTION : CHECK;
    const title = opts.title || (type === 'warning' ? 'Warning' : type === 'confirm' ? 'Confirmation' : 'Success!');
    const msg = opts.message != null ? opts.message : (type === 'success' ? 'Profile updated successfully.' : '');
    const confirmText = opts.confirmText || (type === 'confirm' ? 'Yes' : 'Got It');
    const overlay = document.createElement('div');
    overlay.className = 'mf-overlay';
    overlay.innerHTML = `
      <div class="mf-modal" role="dialog" aria-modal="true">
        <div class="mf-modal-icon">${icon}</div>
        <h3 class="mf-modal-title">${title}</h3>
        ${msg ? `<p class="mf-modal-msg">${msg}</p>` : ''}
        <button type="button" class="mf-modal-btn" data-mf-confirm>${confirmText}</button>
        ${type === 'confirm' ? `<button type="button" class="mf-modal-btn secondary" data-mf-cancel>${opts.cancelText || 'No'}</button>` : ''}
      </div>`;
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) { closeModal(); if (opts.onCancel) opts.onCancel(); return; }
      if (e.target.closest('[data-mf-confirm]')) { closeModal(); if (opts.onConfirm) opts.onConfirm(); }
      else if (e.target.closest('[data-mf-cancel]')) { closeModal(); if (opts.onCancel) opts.onCancel(); }
    });
    document.body.appendChild(overlay);
  }
  window.showMemberModal = showModal;

  // 密碼顯示切換 (針對 .mf-eye)
  document.addEventListener('click', (e) => {
    const eye = e.target.closest('.mf-eye');
    if (!eye) return;
    const inp = eye.parentElement && eye.parentElement.querySelector('.mf-input');
    if (inp) { e.preventDefault(); inp.type = inp.type === 'password' ? 'text' : 'password'; }
  });

  // ---------- Change Login Password ----------
  function initChangePassword() {
    const root = document.querySelector('[data-change-password]');
    if (!root || root.dataset.ready === '1') return;
    root.dataset.ready = '1';
    const newI = root.querySelector('[data-cp-new]');
    const confI = root.querySelector('[data-cp-confirm]');
    const submit = root.querySelector('[data-cp-submit]');
    function update() {
      const ready = newI.value.trim() !== '' && confI.value.trim() !== '';
      submit.classList.toggle('ready', ready);
      submit.disabled = !ready;
    }
    root.addEventListener('input', update);
    submit.addEventListener('click', () => {
      if (submit.disabled) return;
      const a = newI.value, b = confI.value;
      if (a.length < 5 || a.length > 16) { showModal({ type: 'warning', message: 'Length must be 5-16 characters.' }); return; }
      if (a !== b) { showModal({ type: 'warning', message: 'The two passwords do not match.' }); return; }
      showModal({ type: 'success', onConfirm: () => { newI.value = ''; confI.value = ''; update(); } });
    });
    update();
  }

  // ---------- Banking Details ----------
  function eyeField(attr, ph, type) {
    return `<div class="mf-field"><input class="mf-input" type="${type || 'text'}" ${attr} placeholder="${ph}">${type === 'password' ? `<button type="button" class="mf-eye">${EYE}</button>` : ''}</div>`;
  }
  function initBankingDetails() {
    const root = document.querySelector('[data-banking-details]');
    if (!root || root.dataset.ready === '1') return;
    root.dataset.ready = '1';
    const state = { view: 'empty', accounts: [], bank: '' };

    function render() {
      let html = '';
      if (state.view === 'form') {
        html = `
          <div class="mf-card">
            <div class="mf-section"><span>Bank Information</span></div>
            <div class="mf-select-wrap" data-bank-select>
              <button type="button" class="mf-select ${state.bank ? '' : 'placeholder'}" data-bank-trigger>${state.bank || 'Choose a Bank'}${CHEVRON}</button>
            </div>
            <div class="mf-field"><input class="mf-input plain" disabled value="" placeholder=""></div>
            ${eyeField('data-bd-card', 'Enter your card number', 'password')}
            <div class="mf-section"><span>Transaction Password</span></div>
            ${eyeField('data-bd-txn', 'Please  fill in the transaction password', 'password')}
            <button type="button" class="mf-submit" data-bd-submit disabled><span>Submit</span></button>
            <button type="button" class="mf-back" data-bd-back><span>Back</span></button>
          </div>`;
      } else if (state.view === 'list') {
        html = state.accounts.map((a, i) => `
          <div class="mf-acct" data-acct="${i}">
            <span class="mf-acct-check">${CHECK}</span>
            <div>
              <p class="mf-acct-title">Active Bank Account</p>
              <p class="mf-acct-bank">${a.bank}</p>
              <p class="mf-acct-num">${a.num}</p>
            </div>
          </div>`).join('') + `<button type="button" class="mf-fab" data-bd-add>${plusSvg()}</button>`;
      } else {
        html = `
          <div class="mf-empty">
            <div class="mf-empty-coin">${BANK_ICON}</div>
            <p class="mf-empty-title">Empty Bank Account</p>
            <button type="button" class="mf-add-btn" data-bd-add>Add Account</button>
          </div>
          <button type="button" class="mf-fab" data-bd-add>${plusSvg()}</button>`;
      }
      root.innerHTML = html;
      wire();
    }

    function plusSvg() {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';
    }

    function maskCard(num) {
      const digits = (num || '').replace(/\s/g, '');
      const tail = digits.slice(-4) || '0000';
      return '********' + tail;
    }

    function updateSubmit(card) {
      const submit = card.querySelector('[data-bd-submit]');
      const num = card.querySelector('[data-bd-card]');
      const txn = card.querySelector('[data-bd-txn]');
      const ready = Boolean(state.bank) && num.value.trim() !== '' && txn.value.trim() !== '';
      submit.classList.toggle('ready', ready);
      submit.disabled = !ready;
    }

    function openBankMenu(wrap) {
      if (wrap.querySelector('.mf-select-menu')) return;
      const menu = document.createElement('div');
      menu.className = 'mf-select-menu';
      menu.innerHTML = `
        <div class="mf-select-search">${SEARCH}<input type="text" placeholder="search a bank" data-bank-search></div>
        <div class="mf-select-opts">${DEMO_BANKS.map((b) => `<div class="mf-select-opt" data-bank-opt="${b}">${b}</div>`).join('')}</div>`;
      wrap.appendChild(menu);
      const search = menu.querySelector('[data-bank-search]');
      search.focus();
      search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        menu.querySelectorAll('.mf-select-opt').forEach((o) => {
          o.style.display = o.dataset.bankOpt.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    function wire() {
      root.querySelectorAll('[data-bd-add]').forEach((b) => b.addEventListener('click', () => { state.view = 'form'; state.bank = ''; render(); }));
      const card = root.querySelector('.mf-card');
      if (card) {
        const back = card.querySelector('[data-bd-back]');
        back.addEventListener('click', () => { state.view = state.accounts.length ? 'list' : 'empty'; render(); });
        card.addEventListener('input', () => updateSubmit(card));
        const submit = card.querySelector('[data-bd-submit]');
        submit.addEventListener('click', () => {
          if (submit.disabled) return;
          const num = card.querySelector('[data-bd-card]').value;
          state.accounts.push({ bank: state.bank, num: maskCard(num) });
          showModal({ type: 'success', onConfirm: () => { state.view = 'list'; render(); } });
        });
        const wrap = card.querySelector('[data-bank-select]');
        const trigger = card.querySelector('[data-bank-trigger]');
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          if (wrap.querySelector('.mf-select-menu')) { wrap.querySelector('.mf-select-menu').remove(); return; }
          openBankMenu(wrap);
        });
        wrap.addEventListener('click', (e) => {
          const opt = e.target.closest('[data-bank-opt]');
          if (!opt) return;
          state.bank = opt.dataset.bankOpt;
          trigger.classList.remove('placeholder');
          trigger.innerHTML = state.bank + CHEVRON;
          wrap.querySelector('.mf-select-menu').remove();
          updateSubmit(card);
        });
      }
      root.querySelectorAll('[data-acct]').forEach((el) => {
        el.addEventListener('click', () => {
          const i = Number(el.dataset.acct);
          const acct = state.accounts[i];
          showModal({
            type: 'confirm',
            message: acct ? acct.num + ' ?' : '',
            onConfirm: () => {
              state.accounts.splice(i, 1);
              state.view = state.accounts.length ? 'list' : 'empty';
              render();
              showModal({ type: 'success' });
            },
          });
        });
      });
    }

    // 點擊其他地方關閉銀行下拉
    document.addEventListener('click', (e) => {
      if (!root.isConnected) return;
      if (!e.target.closest('[data-bank-select]')) {
        root.querySelectorAll('.mf-select-menu').forEach((m) => m.remove());
      }
    });

    render();
  }

  document.addEventListener('page:rendered', (e) => {
    if (!e.detail) return;
    injectStyle();
    if (e.detail.slug === 'change-password') initChangePassword();
    if (e.detail.slug === 'banking-details') initBankingDetails();
  });
})();
