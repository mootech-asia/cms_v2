// === Shared Back button styling ===
(function () {
  const BACK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg>';

  function injectStyle() {
    if (document.getElementById('cms-back-button-style')) return;
    const style = document.createElement('style');
    style.id = 'cms-back-button-style';
    style.textContent = `
      #container .cms-back-button,
      #container a.cms-back-button,
      #container button.cms-back-button,
      #container #inner-back button.cms-back-button,
      #container #member-back button.cms-back-button,
      #container .mf-back.cms-back-button,
      #container .promotion-detail-back.cms-back-button {
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        gap:8px!important;
        width:auto!important;
        min-width:0!important;
        min-height:40px!important;
        height:40px!important;
        margin:0!important;
        padding:0 14px!important;
        border-radius:8px!important;
        border:1px solid rgba(152,231,210,.24)!important;
        background:#1a2128!important;
        color:#f9fafb!important;
        font-size:15px!important;
        font-weight:800!important;
        line-height:1!important;
        text-align:center!important;
        text-decoration:none!important;
        box-sizing:border-box!important;
        cursor:pointer!important;
        box-shadow:none!important;
        transform:translateY(0)!important;
        transition:background .18s ease,border-color .18s ease,color .18s ease,box-shadow .18s ease,transform .18s ease!important;
      }
      #container .cms-back-button:hover,
      #container .cms-back-button:focus-visible {
        background:linear-gradient(90deg,#CBE8E4,#98E7D2)!important;
        border-color:transparent!important;
        color:#0f1419!important;
        box-shadow:0 8px 20px rgba(152,231,210,.18)!important;
        transform:translateY(-1px)!important;
        outline:none!important;
      }
      #container .cms-back-button:active {
        transform:translateY(0)!important;
        box-shadow:none!important;
      }
      #container .cms-back-button svg {
        width:18px!important;
        height:18px!important;
        stroke-width:2.8!important;
        flex:0 0 auto!important;
      }
      #container .cms-back-button:hover svg,
      #container .cms-back-button:focus-visible svg {
        color:#0f1419!important;
      }
      #container #inner-back,
      #container #member-back {
        display:flex!important;
        align-items:center!important;
        width:auto!important;
        padding:0 0 18px!important;
        margin:0!important;
      }
      #container .mf-card > .mf-back.cms-back-button,
      #container .mf-card > button.mf-back.cms-back-button,
      #container .mf-card > a.mf-back.cms-back-button {
        margin-top:14px!important;
      }
    `;
    document.head.appendChild(style);
  }

  function isBackElement(element) {
    if (!element || !element.matches || !element.matches('button, a')) return false;
    if (element.closest('#inner-back, #member-back')) return true;
    if (element.matches('.mf-back, .promotion-detail-back, .cms-category-back')) return true;
    return (element.textContent || '').trim().toLowerCase() === 'back';
  }

  function normalizeOne(element) {
    if (!isBackElement(element)) return;
    const label = (element.textContent || '').trim() || 'Back';
    element.classList.add('cms-back-button');
    if (element.tagName === 'BUTTON') element.type = 'button';
    if (!element.querySelector('svg')) {
      element.innerHTML = `${BACK_SVG}<span>${label}</span>`;
    } else if (!element.querySelector('span')) {
      element.insertAdjacentHTML('beforeend', `<span>${label}</span>`);
    }
  }

  function normalizeBackButtons(root) {
    injectStyle();
    const scope = root && root.querySelectorAll ? root : document;
    if (isBackElement(scope)) normalizeOne(scope);
    scope.querySelectorAll('button, a').forEach(normalizeOne);
  }

  document.addEventListener('page:rendered', () => {
    requestAnimationFrame(() => normalizeBackButtons(document.getElementById('container') || document));
  });

  document.addEventListener('click', () => {
    requestAnimationFrame(() => normalizeBackButtons(document.getElementById('container') || document));
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => normalizeBackButtons(document));
  } else {
    normalizeBackButtons(document);
  }
})();
