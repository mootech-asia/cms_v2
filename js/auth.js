// === 登入 / 註冊 / 忘記密碼 Modal + 登入狀態 (原生 JS) ===
function closeAuthModal() { const m = document.getElementById('auth-modal'); if (m) m.remove(); }

const A_INPUT = 'width:100%;box-sizing:border-box;background:#0f1622;border:1px solid #2a3441;border-radius:10px;padding:12px 14px;color:#fff;font-size:14px;outline:none';
const A_LABEL = 'display:block;color:#cbd5e1;font-size:14px;font-weight:600;margin-bottom:8px';
const A_BTN = 'width:100%;padding:13px;border:0;border-radius:10px;cursor:pointer;font-weight:700;font-size:15px;color:#0f1622;background:linear-gradient(90deg,#CBE8E4,#98E7D2);margin-top:4px';
const A_LINK = 'color:#98E7D2;font-weight:700;cursor:pointer;text-decoration:none';
const EYE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>';

function field(label, type, placeholder, eye) {
  const pad = eye ? 'padding-right:44px' : '';
  return `<label style="${A_LABEL}">${label}</label>
    <div style="position:relative;margin-bottom:16px">
      <input type="${type}" placeholder="${placeholder}" style="${A_INPUT};${pad}">
      ${eye ? `<button data-eye type="button" style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:none;border:0;color:#9ca3af;cursor:pointer;padding:0;display:flex">${EYE_SVG}</button>` : ''}
    </div>`;
}

function authBody(mode) {
  if (mode === 'register') {
    return `
      ${field('Username', 'text', 'Enter your username')}
      ${field('Password', 'password', 'Enter your password', true)}
      ${field('Confirm Password', 'password', 'Confirm your password', true)}
      ${field('Email', 'email', 'Enter your email')}
      ${field('Real Name', 'text', 'Enter your real name')}
      ${field('Mobile Number', 'tel', 'Enter your mobile number')}
      <button data-submit style="${A_BTN}">Next Step</button>
      <p style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Already have an account? <a data-goto="login" style="${A_LINK}">Login</a></p>`;
  }
  if (mode === 'forgot') {
    return `
      <p style="color:#9ca3af;font-size:14px;line-height:1.5;margin:0 0 20px">Enter your username and email address to receive password reset instructions.</p>
      ${field('Username', 'text', 'Enter your username')}
      ${field('Email', 'email', 'Enter your email')}
      <button data-submit style="${A_BTN}">Send Reset Link</button>
      <p style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Remember your password? <a data-goto="login" style="${A_LINK}">Back to Login</a></p>`;
  }
  // login
  return `
    ${field('Username', 'text', 'Enter your username')}
    ${field('Password', 'password', 'Enter your password', true)}
    <div style="display:flex;justify-content:space-between;align-items:center;margin:-2px 0 18px;font-size:14px">
      <label style="color:#9ca3af;display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" style="accent-color:#98E7D2">Remember me</label>
      <a data-goto="forgot" style="${A_LINK};font-weight:600">Forgot Password?</a>
    </div>
    <button data-submit style="${A_BTN}">Login</button>
    <p style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Don't have an account? <a data-goto="register" style="${A_LINK}">Register</a></p>`;
}

const A_TITLE = { login: 'Login', register: 'Register', forgot: 'Forgot Password' };

function renderAuth(o, mode) {
  o.querySelector('[data-title]').textContent = A_TITLE[mode] || 'Login';
  o.querySelector('[data-body]').innerHTML = authBody(mode);
  o.dataset.mode = mode;
}

function openAuthModal(mode) {
  closeAuthModal();
  const o = document.createElement('div');
  o.id = 'auth-modal';
  o.style.cssText = 'position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;overflow-y:auto';
  o.innerHTML = `<div style="background:#1a2330;border:1px solid #2a3441;border-radius:16px;max-width:400px;width:100%;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.5);margin:auto">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #2a3441">
        <h3 data-title style="color:#fff;font-size:18px;font-weight:700;margin:0"></h3>
        <button data-close style="background:none;border:0;color:#9ca3af;cursor:pointer;font-size:22px;line-height:1;padding:0">×</button>
      </div>
      <div data-body style="padding:22px"></div>
    </div>`;
  o.addEventListener('click', (ev) => {
    if (ev.target === o || ev.target.closest('[data-close]')) return closeAuthModal();
    const eye = ev.target.closest('[data-eye]');
    if (eye) {
      const input = eye.parentElement.querySelector('input');
      input.type = input.type === 'password' ? 'text' : 'password';
      eye.style.color = input.type === 'text' ? '#98E7D2' : '#9ca3af';
      return;
    }
    const go = ev.target.closest('[data-goto]');
    if (go) { renderAuth(o, go.dataset.goto); return; }
    if (ev.target.closest('[data-submit]')) {
      if (o.dataset.mode === 'forgot') {
        o.querySelector('[data-body]').innerHTML = `
          <p style="text-align:center;color:#98E7D2;font-size:15px;font-weight:600;margin:8px 0 6px">Reset link sent</p>
          <p style="text-align:center;color:#9ca3af;font-size:14px;line-height:1.5;margin:0 0 20px">If the account exists, password reset instructions have been sent to your email.</p>
          <button data-goto="login" style="${A_BTN}">Back to Login</button>`;
        return;
      }
      window._loggedIn = true; closeAuthModal(); applyLoginState();
    }
  });
  document.body.appendChild(o);
  renderAuth(o, mode === 'register' || mode === 'forgot' ? mode : 'login');
}

function applyLoginState() {
  if (!window._loggedIn) return;
  const loginBtn = [...document.querySelectorAll('#container button')].find((b) => b.textContent.trim() === 'Login');
  if (!loginBtn) return;
  const regBtn = [...document.querySelectorAll('#container button')].find((b) => b.textContent.trim() === 'Register');
  const w = document.createElement('div');
  w.style.cssText = 'display:flex;align-items:center;gap:12px;flex-wrap:nowrap';
  w.innerHTML = `<a href="#/account" style="display:flex;align-items:center;gap:10px;color:#d1d5db;text-decoration:none;white-space:nowrap">
      <span style="font-weight:700">ID:</span>
      <span style="color:#fff;font-weight:700">meqomcao</span>
      <span style="background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#111827;font-size:13px;font-weight:800;padding:4px 10px;border-radius:9999px;line-height:1">VIP1</span>
    </a>
    <span style="height:20px;width:1px;background:#374151;display:inline-block"></span>
    <a href="#/account" style="display:flex;align-items:center;gap:6px;color:#d1d5db;text-decoration:none;white-space:nowrap">
      <span style="color:#9ca3af;font-weight:700">Balance:</span>
      <span style="color:#fff;font-weight:800">₩1,000,000,000</span>
    </a>
    <a href="#/account" aria-label="Account" style="display:flex;color:#d1d5db;text-decoration:none">${window.ic ? window.ic('user', 20) : ''}</a>`;
  loginBtn.parentElement.insertBefore(w, loginBtn);
  loginBtn.remove();
  if (regBtn) regBtn.remove();
}

window.openAuthModal = openAuthModal;
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAuthModal(); });
document.addEventListener('page:rendered', applyLoginState);
document.addEventListener('click', (e) => {
  if (e.target.closest('#auth-modal')) return;
  const b = e.target.closest('button'); if (!b) return;
  const t = (b.textContent || '').trim();
  if (t === 'Login') { e.preventDefault(); openAuthModal('login'); }
  else if (t === 'Register') { e.preventDefault(); openAuthModal('register'); }
});
