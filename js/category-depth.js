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

  function escapeHtml(value) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(value).replace(/[&<>"']/g, (char) => map[char]);
  }

  function ensureStyle() {
    if (document.getElementById('cms-category-depth-style')) return;
    const style = document.createElement('style');
    style.id = 'cms-category-depth-style';
    style.textContent = `
      .cms-category-back-wrap{display:flex;align-items:center;margin:0 0 16px}
      .cms-category-back{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 14px;border-radius:8px;border:1px solid rgba(152,231,210,.22);background:#1a2128;color:#f9fafb;font-size:15px;font-weight:800;line-height:1;cursor:pointer;transition:background-color .18s ease,border-color .18s ease,color .18s ease}
      .cms-category-back:hover,.cms-category-back:focus-visible{background:#304242;border-color:rgba(170,229,211,.38);color:#AAE5D3;outline:none}
      .cms-category-back svg{width:18px;height:18px;stroke-width:2.8;flex:0 0 auto}
      .cms-provider-inline{display:inline-flex!important;align-items:center;gap:12px;flex-wrap:wrap;line-height:1.15}
      .cms-provider-badge{display:inline-flex;align-items:center;justify-content:center;min-height:28px;padding:5px 12px;border-radius:999px;border:1px solid rgba(152,231,210,.3);background:rgba(152,231,210,.1);color:#98E7D2;font-size:14px;font-weight:900;line-height:1;letter-spacing:0}
      @media(max-width:640px){.cms-category-back-wrap{margin-bottom:14px}.cms-provider-inline{gap:9px}.cms-provider-badge{min-height:26px;padding:4px 10px;font-size:13px}}
    `;
    document.head.appendChild(style);
  }

  function removeCategoryBacks(root) {
    root.querySelectorAll('.cms-category-back-wrap').forEach((element) => element.remove());
  }

  function resetProviderHeading(root) {
    root.querySelectorAll('.cms-provider-heading').forEach((element) => element.remove());
    root.querySelectorAll('[data-cms-provider-title]').forEach((heading) => {
      heading.innerHTML = escapeHtml(heading.dataset.cmsProviderTitle || heading.textContent || '');
      heading.classList.remove('cms-provider-inline');
      delete heading.dataset.cmsProviderTitle;
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
      location.hash = '#/' + slug;
    });
    wrap.appendChild(button);
    return wrap;
  }

  function hasProviderQuery(query) {
    return Boolean(query && Object.prototype.hasOwnProperty.call(query, 'provider') && String(query.provider).trim());
  }

  function providerText(query, slug) {
    const raw = hasProviderQuery(query) ? String(query.provider) : DEFAULT_PROVIDER[slug];
    if (!raw) return '';
    return decodeURIComponent(raw).replace(/\+/g, ' ');
  }

  function findPrimaryTitle(target, slug) {
    const title = TITLE_BY_ROUTE[slug] || 'Games';
    return [...target.querySelectorAll('h2')].find((h2) => {
      const text = (h2.textContent || '').trim();
      return text && (/games|casino|matches|sports|fishing/i.test(text) || text === title);
    });
  }

  function updateProviderHeading(target, slug, query) {
    resetProviderHeading(target);
    const provider = providerText(query, slug);
    if (!provider) return false;

    const title = TITLE_BY_ROUTE[slug] || 'Games';
    const heading = findPrimaryTitle(target, slug);
    if (heading) {
      heading.dataset.cmsProviderTitle = title;
      heading.classList.add('cms-provider-inline');
      heading.innerHTML = `<span>${escapeHtml(title)}</span><span class="cms-provider-badge">${escapeHtml(provider)}</span>`;
      return true;
    }

    const fallback = document.createElement('div');
    fallback.className = 'cms-provider-heading cms-provider-inline mb-8 text-white text-2xl md:text-3xl font-bold';
    fallback.innerHTML = `<span>${escapeHtml(title)}</span><span class="cms-provider-badge">${escapeHtml(provider)}</span>`;
    target.insertBefore(fallback, target.firstChild);
    return true;
  }

  function enhance(detail) {
    const slug = detail && detail.slug;
    if (!CATEGORY_ROUTES.has(slug)) return;
    const section = document.querySelector('#container section');
    const target = section && section.querySelector('.container');
    if (!target) return;
    ensureStyle();

    removeCategoryBacks(target);
    const query = detail.query || {};
    updateProviderHeading(target, slug, query);
    if (hasProviderQuery(query)) target.insertBefore(makeBack(slug), target.firstChild);
  }

  document.addEventListener('page:rendered', (event) => {
    enhance(event.detail || {});
  });
})();
