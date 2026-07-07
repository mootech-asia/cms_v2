<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Banner {
  id: number; badge: string; title: string; highlight: string;
  sub: string; cta: string; accent: string; bg: string;
}

const banners: Banner[] = [
  { id: 1, badge: 'WEEKLY RELOAD', title: 'Bonus', highlight: '50%', sub: 'EVERY MONDAY & FRIDAY', cta: 'Claim Now', accent: '#98E7D2', bg: 'linear-gradient(to right,#0a1f18,#0f2a1e,#0f1419)' },
  { id: 2, badge: 'FIRST DEPOSIT', title: 'Fever', highlight: '100%', sub: 'BONUS UP TO RM 500', cta: 'Deposit Now', accent: '#B9DE5A', bg: 'linear-gradient(to right,#0a1f14,#0f2a1a,#0f1419)' },
  { id: 3, badge: 'VIP EXCLUSIVE', title: 'Unlock', highlight: 'VIP', sub: 'CASHBACK · REBATE · PRIORITY SUPPORT', cta: 'Join VIP', accent: '#A78BFA', bg: 'linear-gradient(to right,#160a2a,#1d0f3a,#0f1419)' },
];

const idx = ref(0);
const b = computed(() => banners[idx.value]!);
let timer: ReturnType<typeof setInterval> | null = null;
let startX = 0;

const next = () => { idx.value = (idx.value + 1) % banners.length; };
const prev = () => { idx.value = (idx.value - 1 + banners.length) % banners.length; };
const go = (i: number) => { idx.value = i; restart(); };
const restart = () => { if (timer) clearInterval(timer); timer = setInterval(next, 5000); };
const onStart = (e: TouchEvent) => { startX = e.touches[0]!.clientX; };
const onEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0]!.clientX - startX;
  if (dx < -40) { next(); restart(); } else if (dx > 40) { prev(); restart(); }
};

onMounted(restart);
onUnmounted(() => { if (timer) clearInterval(timer); });

const arrow = 'width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.45);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-size:18px;line-height:1';
</script>

<template>
  <section class="relative w-full overflow-hidden" style="min-height:280px;touch-action:pan-y" @touchstart="onStart" @touchend="onEnd">
    <div class="relative" :style="{ minHeight: '280px', background: b.bg, transition: 'all .7s' }">
      <div class="absolute inset-0" style="opacity:.1;background-image:linear-gradient(rgba(155,231,210,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(155,231,210,.3) 1px,transparent 1px);background-size:40px 40px" />
      <div class="absolute left-0 top-0 w-64 h-full" :style="{ opacity: .2, background: `radial-gradient(at left center, ${b.accent} 0%, transparent 70%)` }" />
      <div class="relative container mx-auto px-4 flex items-center" style="min-height:280px">
        <div class="w-full max-w-lg py-8 md:py-10 z-10">
          <div class="inline-block px-3 py-1 rounded mb-3" :style="{ background: b.accent + '22', border: `1px solid ${b.accent}44` }">
            <span class="text-xs tracking-widest" :style="{ color: b.accent }">{{ b.badge }}</span>
          </div>
          <div class="mb-2">
            <span class="text-white text-3xl md:text-5xl block leading-tight">{{ b.title }}</span>
            <span class="text-5xl md:text-8xl block leading-none" :style="{ color: b.accent, textShadow: `0 0 40px ${b.accent}88`, fontWeight: 900 }">{{ b.highlight }}</span>
          </div>
          <p class="text-gray-400 text-sm md:text-base mb-6 tracking-widest">{{ b.sub }}</p>
          <button
            class="px-8 py-3 rounded-lg text-gray-900 text-sm md:text-base transition-opacity hover:opacity-90"
            :style="{ background: `linear-gradient(135deg, ${b.accent}, ${b.accent})` }"
          >{{ b.cta }}</button>
        </div>
      </div>
      <div class="absolute z-20" style="bottom:12px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:12px">
        <button :style="arrow" @click="prev(); restart()">‹</button>
        <div class="flex items-center gap-2">
          <button
            v-for="(s, i) in banners" :key="s.id" class="rounded-full"
            :style="{ width: i === idx ? '20px' : '6px', height: '6px', background: i === idx ? b.accent : 'rgba(255,255,255,.3)', padding: '4px', boxSizing: 'content-box', transition: 'all .3s', cursor: 'pointer', border: '0' }"
            @click="go(i)"
          />
        </div>
        <button :style="arrow" @click="next(); restart()">›</button>
      </div>
    </div>
  </section>
</template>
