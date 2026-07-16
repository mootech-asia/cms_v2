<script setup lang="ts">
/**
 * 範例區塊:Hero 輪播 v2 — 置中卡片版。同內容同皮膚,只換版面。
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
const { banners } = useContentStore();

const idx = ref(0);
const b = computed(() => banners[idx.value]!);
let timer: ReturnType<typeof setInterval> | null = null;
const next = () => { idx.value = (idx.value + 1) % banners.length; };
onMounted(() => { timer = setInterval(next, 5000); });
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <section class="w-full bg-surface-deep">
    <div
      class="container mx-auto my-4 flex flex-col items-center overflow-hidden rounded-xl border border-line-soft px-8 py-12 text-center md:py-16"
      :style="{ background: b.bg, transition: 'background .7s' }"
    >
      <div class="mb-3 inline-flex rounded-full border border-line px-4 py-1">
        <span class="text-note tracking-wide2" :style="{ color: b.accent }">{{ b.badge }}</span>
      </div>
      <p class="text-h1 leading-tight text-ink md:text-display">
        {{ b.title }}
        <span class="font-black" :style="{ color: b.accent }">{{ b.highlight }}</span>
      </p>
      <p class="mt-2 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
      <button type="button" class="btn-primary btn-md mt-6">{{ b.cta }}</button>
      <div class="mt-6 flex gap-1.5">
        <button
          v-for="(s, i) in banners" :key="s.id" type="button"
          class="h-1.5 rounded-full transition-all"
          :class="i === idx ? 'w-6 bg-g-primary' : 'w-1.5 bg-surface-2'"
          :aria-label="`slide ${i + 1}`"
          @click="idx = i"
        />
      </div>
    </div>
  </section>
</template>
