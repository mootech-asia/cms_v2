// === 內頁:廠商選擇 → 遊戲列表 (hot-games 直接顯示) + 頂部 Back (原生 JS) ===
(function () {
  const PAGE_TITLES = {
    slot: 'Slot Games',
    live: 'Live Casino',
    fish: 'Fishing Games',
    'hot-games': 'Hot Games',
    'mini-games': 'Mini Games',
  };
  const DIRECT = new Set(['hot-games']); // 直接顯示遊戲列表,不選廠商
  const BACK_PAGES = new Set([...Object.keys(PAGE_TITLES), 'sport', 'promotion']);

  const SLOT_VENDORS = [
    'Pragmatic Play', 'PG Soft', 'CQ9 Gaming', 'Hacksaw Gaming', 'NetEnt', 'Nolimit City',
    'Big Time Gaming', 'Booongo', 'JILI', 'PlayStar', 'Yggdrasil', 'Evoplay',
    'Skywind', 'Spadegaming', "Play'n GO", 'Microgaming', 'Habanero', 'Playtech',
    'Red Tiger', 'Relax Gaming', 'Push Gaming', 'Wazdan', 'Blueprint', 'Quickspin',
    'Thunderkick', 'ELK Studios', 'Playson', 'Kalamba', 'Fantasma', 'Dragoon Soft',
  ];
  const LIVE_VENDORS = [
    'Evolution Gaming', 'Pragmatic Play Live', 'Sexy Gaming', 'Yeebet Live', 'WM Casino', 'Dream Gaming',
    'SA Gaming', 'Ezugi', 'Playtech Live', 'BG Big Gaming', 'Allbet', 'Asia Gaming',
    'eBET', 'VIVO Gaming', 'Microgaming Live', 'AE Sexy', 'OG Casino', 'Green Dragon',
    'N2 Live', 'Ho Gaming', 'Bet Games', 'Skywind Live', 'CQ9 Live', 'PP Live Deluxe',
    'Royal Gaming', 'Lucky Streak', 'Betradar Live', 'Xpro Gaming', 'Winfinity', 'Atmosfera',
  ];
  const vendorsFor = (slug) => (slug === 'live' ? LIVE_VENDORS : SLOT_VENDORS);

  const IMG = '_external/images.unsplash.com/';
  const PHOTOS = [
    'photo-1604028297236-42130c7dcc3a__w-400', 'photo-1604028296525-8304e1a4969f__w-400',
    'photo-1534620780923-1ce0db377c3f__w-400', 'photo-1590336225155-d7e19a3a954f__w-400',
    'photo-1771775606196-70dccc0d9bde__w-400', 'photo-1525018667593-176858caed6a__w-400',
  ];
  const photo = (i) => IMG + PHOTOS[((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length];

  const BACK_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
  const SEARCH_SVG = '<svg class="s-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';

  function injectStyle() {
    if (document.getElementById('vnd-style')) return;
    const s = document.createElement('style');
    s.id = 'vnd-style';
    s.textContent = `
      #inner-back{padding:0 0 18px}
      #inner-back button{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:#fff;font-size:22px;font-weight:700;cursor:pointer;padding:0}
      #inner-back button:hover{color:#98E7D2}
      #inner-back svg{width:24px;height:24px}
      .vnd-head{display:flex;flex-direction:column;gap:16px;margin-bottom:26px}
      @media(min-width:768px){.vnd-head{flex-direction:row;align-items:center;justify-content:space-between}}
      .vnd-head h2{color:#fff;font-size:26px;font-weight:600;margin:0}
      .vnd-search{position:relative;display:flex;gap:10px}
      .vnd-search input{background:#1a2128;border:1px solid #374151;border-radius:10px;padding:11px 14px 11px 38px;color:#fff;outline:none;min-width:220px}
      .vnd-search input:focus{border-color:#98E7D2}
      .vnd-search .s-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#9ca3af;width:16px;height:16px}
      .vnd-search .s-btn{background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;border:0;border-radius:10px;padding:0 20px;font-weight:700;cursor:pointer;white-space:nowrap}
      .vnd-grid{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:16px}
      @media(min-width:640px){.vnd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(min-width:1024px){.vnd-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
      .vnd-card{position:relative;display:flex;align-items:center;justify-content:center;height:112px;border-radius:14px;border:1px solid #212b3d;overflow:hidden;cursor:pointer;background:#161e2c;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
      .vnd-card:hover{border-color:#98E7D2;transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.45)}
      .vnd-card .vnd-name{padding:0 16px;text-align:center;color:#fff;font-size:20px;font-weight:800;line-height:1.2;letter-spacing:.01em}
    `;
    document.head.appendChild(s);
  }

  let currentSlug = null;
  let viewVendor = null;

  function goBack() {
    if (!DIRECT.has(currentSlug) && viewVendor) { viewVendor = null; renderVendorGrid(); return; }
    if (window.history.length > 1) window.history.back();
    else location.hash = '#/home';
  }

  function contentInner() {
    const section = document.querySelector('#container section');
    return section && section.querySelector(':scope > div');
  }
  function grid() { return document.querySelector('#container [data-vnd-grid="1"]'); }

  function scaffold(slug) {
    const ph = DIRECT.has(slug) ? 'Search Game' : 'Vendor Name';
    return `
      <div id="inner-back"><button type="button">${BACK_SVG}<span>Back</span></button></div>
      <div class="vnd-head">
        <h2 data-vnd-title>${PAGE_TITLES[slug]}</h2>
        <div class="vnd-search">
          ${SEARCH_SVG}
          <input type="text" placeholder="${ph}">
          <button class="s-btn" type="button">Search</button>
        </div>
      </div>
      <div class="vnd-grid" data-vnd-grid="1"></div>`;
  }

  function vendorCard(name) {
    // 廠商文字為佔位;之後由後台以廠商 logo 取代
    return `<button class="vnd-card" data-vendor="${name}"><span class="vnd-name">${name}</span></button>`;
  }

  function gameCard(provider, i) {
    // 遊戲卡(圖片 + Game Name + Provider + Play Now),無最愛星號
    return `<div class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group">
        <div class="aspect-[4/3] relative overflow-hidden">
          <img src="${photo(i)}" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
        </div>
        <div class="p-4">
          <h3 class="text-white mb-1 truncate">Game Name</h3>
          <p class="text-gray-400 text-sm mb-3 truncate">${provider}</p>
          <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
        </div>
      </div>`;
  }

  function renderVendorGrid() {
    const g = grid();
    if (!g) return;
    g.className = 'vnd-grid';
    g.dataset.vndGrid = '1';
    g.innerHTML = vendorsFor(currentSlug).map((v) => vendorCard(v)).join('');
  }

  function renderGameGrid(cards) {
    const g = grid();
    if (!g) return;
    g.className = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4';
    g.dataset.vndGrid = '1';
    g.innerHTML = cards;
  }
  function renderGameList(vendor) {
    renderGameGrid(Array.from({ length: 24 }, (_, i) => gameCard(vendor, i)).join(''));
  }
  function renderGamesDirect(slug) {
    const vs = vendorsFor(slug);
    renderGameGrid(Array.from({ length: 30 }, (_, i) => gameCard(vs[i % vs.length], i)).join(''));
  }

  function build(slug) {
    const inner = contentInner();
    if (!inner) return;
    currentSlug = slug;
    viewVendor = null;
    inner.innerHTML = scaffold(slug);
    if (DIRECT.has(slug)) renderGamesDirect(slug);
    else renderVendorGrid();
  }

  function injectBackOnly() {
    const inner = contentInner();
    if (!inner || document.getElementById('inner-back')) return;
    const bar = document.createElement('div');
    bar.id = 'inner-back';
    bar.innerHTML = `<button type="button">${BACK_SVG}<span>Back</span></button>`;
    inner.insertBefore(bar, inner.firstChild);
  }

  // ---- 事件 ----
  document.addEventListener('click', (e) => {
    if (e.target.closest('#inner-back button')) { e.preventDefault(); goBack(); return; }
    if (!currentSlug || !PAGE_TITLES[currentSlug]) return;
    const card = e.target.closest('.vnd-card');
    if (card && !DIRECT.has(currentSlug)) {
      viewVendor = card.dataset.vendor;
      renderGameList(viewVendor);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.addEventListener('input', (e) => {
    const input = e.target;
    if (!input || input.tagName !== 'INPUT' || !input.closest('.vnd-search')) return;
    if (!currentSlug || !PAGE_TITLES[currentSlug]) return;
    const q = input.value.trim().toLowerCase();
    const showingVendors = !DIRECT.has(currentSlug) && !viewVendor;
    if (showingVendors) {
      document.querySelectorAll('#container .vnd-card').forEach((c) => {
        c.style.display = (!q || (c.dataset.vendor || '').toLowerCase().includes(q)) ? '' : 'none';
      });
    } else {
      document.querySelectorAll('#container [data-vnd-grid="1"] > div').forEach((c) => {
        c.style.display = (!q || (c.textContent || '').toLowerCase().includes(q)) ? '' : 'none';
      });
    }
  });

  document.addEventListener('page:rendered', (e) => {
    const slug = e.detail && e.detail.slug;
    if (!slug || !BACK_PAGES.has(slug)) { currentSlug = null; return; }
    injectStyle();
    if (PAGE_TITLES[slug]) build(slug);
    else { currentSlug = null; injectBackOnly(); }
  });
})();
