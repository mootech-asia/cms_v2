<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
const { banners } = useContentStore();

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
    <div class="banner-art relative" :style="{ minHeight: '280px' }">
      <template v-if="b.img">
        <img :src="withBase(b.img)" :alt="b.title" class="absolute inset-0 h-full w-full object-cover">
        <div class="absolute inset-0 bg-scrim/40" />
      </template>
      <template v-else>
        <div class="banner-art-grid absolute inset-0" />
        <div class="banner-art-glow absolute left-0 top-0 w-64 h-full" />
      </template>
      <div class="relative container mx-auto px-4 flex items-center" style="min-height:280px">
        <div class="w-full max-w-lg py-8 md:py-10 z-10">
          <div class="inline-block px-3 py-1 rounded mb-3 bg-primary/10 border border-primary/25">
            <span class="text-xs tracking-widest text-primary">{{ b.badge }}</span>
          </div>
          <div class="mb-2">
            <span class="text-ink text-3xl md:text-5xl block leading-tight">{{ b.title }}</span>
            <span class="text-glow-primary text-5xl md:text-8xl block leading-none font-black text-primary">{{ b.highlight }}</span>
          </div>
          <p class="text-ink-3 text-sm md:text-base mb-6 tracking-widest">{{ b.sub }}</p>
          <button class="btn-primary btn-md text-sm md:text-base">{{ b.cta }}</button>
        </div>
      </div>
      <button :style="arrow" style="position:absolute;z-index:20;left:20px;top:50%;transform:translateY(-50%)" @click="prev(); restart()">‹</button>
      <button :style="arrow" style="position:absolute;z-index:20;right:20px;top:50%;transform:translateY(-50%)" @click="next(); restart()">›</button>
      <div class="absolute z-20" style="bottom:12px;left:0;right:0;display:flex;align-items:center;justify-content:center">
        <div class="flex items-center gap-2">
          <button
            v-for="(s, i) in banners" :key="s.id" class="rounded-full"
            :class="i === idx ? 'bg-primary' : 'bg-ink/30'"
            :style="{ width: i === idx ? '20px' : '6px', height: '6px', padding: '4px', boxSizing: 'content-box', transition: 'all .3s', cursor: 'pointer', border: '0' }"
            @click="go(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
