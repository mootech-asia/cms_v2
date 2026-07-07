// === Banner 輪播 (乾淨重寫,資料驅動) ===
const BANNERS = [
  { badge: "WEEKLY RELOAD", title: "Bonus",  highlight: "50%", sub: "EVERY MONDAY & FRIDAY",
    cta: "Claim Now",   accent: "#98E7D2", decorColor: "#98E7D2",
    bg: "linear-gradient(to right, #0a1f18, #0f2a1e, #0f1419)" },
  { badge: "FIRST DEPOSIT", title: "Fever",  highlight: "100%", sub: "BONUS UP TO RM 500",
    cta: "Deposit Now", accent: "#B9DE5A", decorColor: "#B9DE5A",
    bg: "linear-gradient(to right, #0a1f14, #0f2a1a, #0f1419)" },
  { badge: "VIP EXCLUSIVE", title: "Unlock", highlight: "VIP", sub: "CASHBACK · REBATE · PRIORITY SUPPORT",
    cta: "Join VIP",    accent: "#A78BFA", decorColor: "#A78BFA",
    bg: "linear-gradient(to right, #160a2a, #1d0f3a, #0f1419)" },
];

function slideInner(b) {
  return `
    <div class="absolute inset-0" style="opacity:.1;background-image:linear-gradient(rgba(155,231,210,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(155,231,210,.3) 1px,transparent 1px);background-size:40px 40px"></div>
    <div class="absolute left-0 top-0 w-64 h-full" style="opacity:.2;background:radial-gradient(ellipse at left center, ${b.decorColor} 0%, transparent 70%)"></div>
    <div class="relative container mx-auto px-4 flex items-center" style="min-height:280px">
      <div class="w-full max-w-lg py-8 md:py-10 z-10">
        <div class="inline-block px-3 py-1 rounded mb-3" style="background:${b.decorColor}22;border:1px solid ${b.decorColor}44">
          <span class="text-xs tracking-widest" style="color:${b.decorColor}">${b.badge}</span>
        </div>
        <div class="mb-2">
          <span class="text-white text-3xl md:text-5xl block leading-tight">${b.title}</span>
          <span class="text-5xl md:text-8xl block leading-none" style="color:${b.accent};text-shadow:0 0 40px ${b.accent}88;font-weight:900">${b.highlight}</span>
        </div>
        <p class="text-gray-400 text-sm md:text-base mb-6 tracking-widest">${b.sub}</p>
        <button class="px-8 py-3 rounded-lg text-sm md:text-base" style="color:#111827;background:linear-gradient(135deg, ${b.decorColor}, ${b.accent})">${b.cta}</button>
      </div>
    </div>
    <div class="absolute z-20" style="bottom:12px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:12px">
      <button data-nav="prev" style="width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-size:18px;line-height:1">‹</button>
      <div class="flex items-center gap-2" data-dots></div>
      <button data-nav="next" style="width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-size:18px;line-height:1">›</button>
    </div>`;
}

function initCarousel() {
  clearInterval(window._carouselTimer);
  const section = document.querySelector('#container section');
  if (!section) return;
  let idx = 0, timer = null, startX = 0;

  const inner = document.createElement('div');
  inner.className = 'relative';
  inner.style.minHeight = '280px';
  inner.style.transition = 'all .7s';
  section.innerHTML = '';
  section.className = 'relative w-full overflow-hidden';
  section.style.minHeight = '280px';
  section.style.touchAction = 'pan-y';
  section.appendChild(inner);

  function render() {
    const b = BANNERS[idx];
    inner.style.background = b.bg;
    inner.innerHTML = slideInner(b);
    const dots = inner.querySelector('[data-dots]');
    BANNERS.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'rounded-full';
      d.style.cssText = `width:${i === idx ? 20 : 6}px;height:6px;background:${i === idx ? b.decorColor : 'rgba(255,255,255,.3)'};padding:4px;box-sizing:content-box;transition:all .3s;cursor:pointer;border:0`;
      d.addEventListener('click', () => { idx = i; render(); restart(); });
      dots.appendChild(d);
    });
    inner.querySelector('[data-nav="prev"]').addEventListener('click', () => { idx = (idx - 1 + BANNERS.length) % BANNERS.length; render(); restart(); });
    inner.querySelector('[data-nav="next"]').addEventListener('click', () => { idx = (idx + 1) % BANNERS.length; render(); restart(); });
  }
  function next() { idx = (idx + 1) % BANNERS.length; render(); }
  function restart() { clearInterval(timer); timer = setInterval(next, 5000); window._carouselTimer = timer; }

  // 手機滑動
  section.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  section.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (dx < -40) { idx = (idx + 1) % BANNERS.length; render(); restart(); }
    else if (dx > 40) { idx = (idx - 1 + BANNERS.length) % BANNERS.length; render(); restart(); }
  });

  render();
  restart();
}

window.initCarousel = initCarousel;
