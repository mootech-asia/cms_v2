// === Category second-level header/back treatment ===
(function () {
  const CATEGORY_ROUTES = new Set(['hot-games', 'sport', 'live', 'slot', 'fish', 'mini-games']);
  const TITLE_BY_ROUTE = {
    'hot-games': 'Hot Games',
    sport: 'Sports',
    live: 'Live Casino',
    slot: 'Slot Games',
    fish: 'Fishing Games',
    'mini-games': 'Mini Games',
  };
  const DEFAULT_PROVIDER = {
    slot: 'PP',
  };

  function ensureStyle() {
    if (document.getElementById('cms-category-depth-style')) return;
    const style = document.createElement('style');
    style.id = 'cms-category-depth-style';
    style.textContent = `
      .cms-category-back-wrap{display:flex;align-items:center;margin:0 0 18px}
      .cms-category-back{display:inline-flex;align-items:center;gap:8px;height:42px;padding:0 16px;border-radius:10px;border:1px solid rgba(152,231,210,.22);background:#1a2128;color:#f9fafb;font-size:15px;font-weight:800;line-height:1;cursor:pointer;box-shadow:0 8px 22px rgba(0,0,0,.24);transition:background-color .18s ease,border-color .18s ease,color .18s ease,transform .18s ease,box-shadow .18s ease}
      .cms-category-back:hover,.cms-category-back:focus-visible{background:#304242;border-color:rgba(170,229,211,.38);color:#AAE5D3;transform:translateY(-1px);box-shadow:0 10px 26px rgba(0,0,0,.32);outline:none}
      .cms-category-back:active{transform:translateY(0)}
      .cms-category-back svg{width:18px;height:18px;stroke-width:2.8;flex:0 0 auto}
      .cms-provider-heading{margin:2px 0 26px;border-bottom:3px solid #f033b5;padding-bottom:12px;display:flex;align-items:baseline;gap:18px;line-height:1}
      .cms-provider-heading .cms-provider-main{font-size:36px;font-weight:900;letter-spacing:0;background:linear-gradient(90deg,#f033b5 0%,#ff6b72 52%,#f3a352 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
      .cms-provider-heading .cms-provider-sep{font-size:30px;font-weight:500;color:#c9ced6;opacity:.9}
      .cms-provider-heading .cms-provider-name{font-size:28px;font-weight:900;color:#d9d6d0;letter-spacing:.01em}
      @media(min-width:768px){.cms-provider-heading .cms-provider-main{font-size:48px}.cms-provider-heading .cms-provider-sep{font-size:36px}.cms-provider-heading .cms-provider-name{font-size:34px}}
      @media(max-width:640px){.cms-category-back-wrap{margin-bottom:14px}.cms-provider-heading{gap:10px;margin-bottom:20px}.cms-provider-heading .cms-provider-main{font-size:30px}.cms-provider-heading .cms-provider-sep{font-size:24px}.cms-provider-heading .cms-provider-name{font-size:24px}}
    `;
    document.head.appendChild(style);
  }

  function removeCategoryBacks(root) {
    root.querySelectorAll('.cms-category-back-wrap').forEach((element) => element.remove());
    [...root.querySelectorAll('button, a')].forEach((element) => {
      if ((element.textContent || '').trim() !== 'Back') return;
      const wrap = element.parentElement;
      if (wrap && wrap.children.length === 1 && !wrap.classList.contains('vnd-head')) wrap.remove();
      else element.remove();
    });
  }

  function makeBack(slug) {
    const wrap = document.createElement('div');
    wrap.className = 'cms-category-back-wrap';
    const button = document.createElement('button');
    button.className = 'cms-category-back';
    button.type = 'button';
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"></path></svg><span>Back</span>';
    button.addEventListener('click', () => {
      if (location.hash.includes('?provider=')) {
        location.hash = '#/' + slug;
        return;
      }
      if (history.length > 1) history.back();
      else location.hash = '#/';
    });
    wrap.appendChild(button);
    return wrap;
  }

  function providerText(query, slug) {
    const raw = query && query.provider ? String(query.provider) : DEFAULT_PROVIDER[slug];
    if (!raw) return '';
    return decodeURIComponent(raw).replace(/\+/g, ' ');
  }

  function updateProviderHeading(target, slug, query) {
    target.querySelectorAll('.cms-provider-heading').forEach((element) => element.remove());
    const provider = providerText(query, slug);
    if (!provider) return;

    const title = TITLE_BY_ROUTE[slug] || 'Games';
    const heading = document.createElement('div');
    heading.className = 'cms-provider-heading';
    heading.innerHTML = `<span class="cms-provider-main">${title}</span><span class="cms-provider-sep">|</span><span class="cms-provider-name">${provider}</span>`;

    const firstHeader = [...target.querySelectorAll('h2')].find((h2) => /games|casino|matches|sports|fishing/i.test((h2.textContent || '').trim()));
    if (firstHeader) {
      firstHeader.style.display = 'none';
      const row = firstHeader.closest('.flex') || firstHeader.parentElement;
      target.insertBefore(heading, row || target.firstChild);
    } else {
      target.insertBefore(heading, target.firstChild);
    }
  }

  function enhance(detail) {
    const slug = detail && detail.slug;
    if (!CATEGORY_ROUTES.has(slug)) return;
    const section = document.querySelector('#container section');
    const target = section && section.querySelector('.container');
    if (!target) return;
    ensureStyle();

    removeCategoryBacks(target);
    target.insertBefore(makeBack(slug), target.firstChild);
    updateProviderHeading(target, slug, detail.query || {});
  }

  document.addEventListener('page:rendered', (event) => {
    enhance(event.detail || {});
  });
})();
