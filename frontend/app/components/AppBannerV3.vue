<script setup lang="ts">
/**
 * Banner 變體 v3:分割式 — 左半主打 slide、右半其餘 slides 的直欄縮圖清單(可點切換)。
 * 吃同一份 config/mock/home.ts banners 內容與皮膚 token,只換版面。
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
const { banners } = useContentStore();

const idx = ref(0);
const b = computed(() => banners[idx.value]!);
const mediaSrc = (src?: string) => {
  if (!src) return '';
  return /^(https?:)?\/\//.test(src) ? src : withBase(src);
};
const hideBrokenMedia = (event: Event) => {
  (event.currentTarget as HTMLImageElement).hidden = true;
};
let timer: ReturnType<typeof setInterval> | null = null;

const next = () => { idx.value = (idx.value + 1) % banners.length; };
const go = (i: number) => { idx.value = i; restart(); };
const restart = () => { if (timer) clearInterval(timer); timer = setInterval(next, 5000); };

onMounted(restart);
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <section class="w-full bg-surface-deep">
    <div class="container mx-auto grid gap-3 px-4 py-4 md:grid-cols-3">
      <!-- 主打 slide -->
      <div
        class="relative flex min-h-[240px] items-center overflow-hidden rounded-xl border border-line-soft md:col-span-2 banner-art"
      >
        <template v-if="b.img">
          <img :src="mediaSrc(b.img)" :alt="b.title" class="operation-banner-media absolute inset-0 h-full w-full object-cover" :style="{ objectPosition: b.focalPoint || 'center' }" fetchpriority="high" @error="hideBrokenMedia">
          <div class="operation-banner-scrim absolute inset-0" />
        </template>
        <div class="relative z-10 px-6 py-8 md:px-10">
          <div
            class="mb-3 inline-flex rounded border border-primary/25 bg-primary/10 px-3 py-1"
          >
            <span class="text-note tracking-wide2 text-primary">{{ b.badge }}</span>
          </div>
          <p class="text-h1 leading-tight text-ink md:text-display">{{ b.title }}</p>
          <p class="text-5xl font-black leading-none md:text-7xl text-primary">{{ b.highlight }}</p>
          <p class="mt-3 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
          <button
            type="button"
            class="btn-primary btn-md mt-5"
          >{{ b.cta }}</button>
        </div>
      </div>
      <!-- 其餘 slides 直欄縮圖 -->
      <div class="grid auto-rows-fr gap-3">
        <button
          v-for="(s, i) in banners" :key="s.id" type="button"
          class="banner-art relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors"
          :class="i === idx ? 'border-primary' : 'border-line-soft hover:border-line'"
          @click="go(i)"
        >
          <template v-if="s.img">
            <img :src="mediaSrc(s.img)" :alt="s.title" class="operation-banner-media absolute inset-0 h-full w-full object-cover" :style="{ objectPosition: s.focalPoint || 'center' }" loading="lazy" @error="hideBrokenMedia">
            <div class="absolute inset-0 bg-scrim/50" />
          </template>
          <span class="relative z-10 text-h2 font-black leading-none text-primary">{{ s.highlight }}</span>
          <span class="relative z-10 min-w-0">
            <span class="block truncate text-body font-semibold text-ink">{{ s.title }}</span>
            <span class="block truncate text-micro tracking-wide2 text-ink-3">{{ s.badge }}</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
