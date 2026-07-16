<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const { banners } = useContentStore();
const idx = ref(0);
const paused = ref(false);
const b = computed(() => banners[idx.value]!);
const slideNumber = computed(() => String(idx.value + 1).padStart(2, '0'));
const slideTotal = computed(() => String(banners.length).padStart(2, '0'));

const mediaSrc = (src?: string) => {
  if (!src) return '';
  return /^(https?:)?\/\//.test(src) ? src : withBase(src);
};
const hideBrokenMedia = (event: Event) => {
  (event.currentTarget as HTMLImageElement).hidden = true;
};

let timer: ReturnType<typeof setInterval> | null = null;
let startX = 0;
const stop = () => {
  if (timer) clearInterval(timer);
  timer = null;
};
const next = () => {
  if (banners.length) idx.value = (idx.value + 1) % banners.length;
};
const prev = () => {
  if (banners.length) idx.value = (idx.value - 1 + banners.length) % banners.length;
};
const restart = () => {
  stop();
  if (!paused.value && banners.length > 1) timer = setInterval(next, 6000);
};
const go = (i: number) => {
  idx.value = i;
  restart();
};
const pause = () => {
  paused.value = true;
  stop();
};
const resume = () => {
  paused.value = false;
  restart();
};
const onStart = (event: TouchEvent) => {
  startX = event.touches[0]?.clientX ?? 0;
};
const onEnd = (event: TouchEvent) => {
  const dx = (event.changedTouches[0]?.clientX ?? startX) - startX;
  if (dx < -40) next();
  else if (dx > 40) prev();
  restart();
};

onMounted(restart);
onUnmounted(stop);
</script>

<template>
  <section
    v-if="b"
    class="campaign-hero relative w-full overflow-hidden"
    aria-roledescription="carousel"
    aria-label="Featured campaigns"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
    @touchstart="onStart"
    @touchend="onEnd"
  >
    <div class="banner-art campaign-hero-stage relative">
      <template v-if="b.img">
        <img
          :key="b.id"
          :src="mediaSrc(b.img)"
          :alt="b.title"
          class="operation-banner-media campaign-hero-media absolute inset-0 h-full w-full object-cover"
          :style="{ objectPosition: b.focalPoint || 'center' }"
          fetchpriority="high"
          @error="hideBrokenMedia"
        >
        <div class="operation-banner-scrim absolute inset-0" />
        <div class="campaign-hero-vignette absolute inset-0" />
      </template>
      <template v-else>
        <div class="banner-art-grid absolute inset-0" />
        <div class="banner-art-glow absolute left-0 top-0 h-full w-64" />
      </template>

      <div class="campaign-hero-content container relative z-10 mx-auto flex px-6 md:px-12 xl:px-16">
        <div class="campaign-hero-copy flex w-full flex-col justify-center py-12 md:py-16">
          <div class="campaign-hero-eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden="true" class="h-px w-9 bg-primary" />
            <span class="text-xs font-extrabold tracking-[0.18em] text-primary">{{ b.badge }}</span>
          </div>
          <div class="mb-4">
            <span class="campaign-hero-title block font-semibold leading-tight text-ink">{{ b.title }}</span>
            <span class="campaign-hero-highlight block font-black leading-none text-primary text-glow-primary">{{ b.highlight }}</span>
          </div>
          <p class="campaign-hero-sub mb-7 max-w-xl text-sm font-semibold tracking-[0.12em] text-ink-2 md:text-base">{{ b.sub }}</p>
          <div>
            <button class="btn-primary btn-md campaign-hero-cta text-sm md:text-base">{{ b.cta }}</button>
          </div>
        </div>
      </div>

      <div class="campaign-hero-counter absolute right-6 top-6 z-20 hidden items-baseline gap-1.5 text-ink md:flex xl:right-10 xl:top-8">
        <span class="text-xl font-black">{{ slideNumber }}</span>
        <span class="text-xs text-ink-3">/ {{ slideTotal }}</span>
      </div>

      <button type="button" class="campaign-hero-arrow campaign-hero-arrow--prev" aria-label="Previous campaign" @click="prev(); restart()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      </button>
      <button type="button" class="campaign-hero-arrow campaign-hero-arrow--next" aria-label="Next campaign" @click="next(); restart()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      <div class="campaign-hero-pagination absolute inset-x-0 bottom-5 z-20 flex justify-center">
        <div class="flex items-center gap-2">
          <button
            v-for="(slide, i) in banners"
            :key="slide.id"
            type="button"
            class="campaign-hero-dot"
            :class="{ 'campaign-hero-dot--active': i === idx }"
            :aria-label="`Go to campaign ${i + 1}`"
            :aria-current="i === idx ? 'true' : undefined"
            @click="go(i)"
          />
        </div>
      </div>
    </div>
  </section>
</template>
