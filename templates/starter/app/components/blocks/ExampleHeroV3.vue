<script setup lang="ts">
/**
 * 範例區塊:Hero 輪播 v3 — 分割式:左主打 slide、右側其餘 slides 清單(可點切換)。
 * 同內容同皮膚,只換版面。
 */
import { ref, computed } from 'vue';
const { banners } = useContentStore();

const idx = ref(0);
const b = computed(() => banners[idx.value]!);
</script>

<template>
  <section class="w-full bg-surface-deep">
    <div class="container mx-auto grid gap-3 px-4 py-4 md:grid-cols-3">
      <div
        class="rounded-xl border border-line-soft px-6 py-10 md:col-span-2"
        :style="{ background: b.bg, transition: 'background .7s' }"
      >
        <span class="text-note tracking-wide2" :style="{ color: b.accent }">{{ b.badge }}</span>
        <p class="mt-2 text-h1 leading-tight text-ink">
          {{ b.title }} <span class="font-black" :style="{ color: b.accent }">{{ b.highlight }}</span>
        </p>
        <p class="mt-2 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
        <button type="button" class="btn-primary btn-sm mt-5">{{ b.cta }}</button>
      </div>
      <div class="flex flex-col gap-3">
        <button
          v-for="(s, i) in banners" :key="s.id" type="button"
          class="flex flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors"
          :class="i === idx ? 'border-primary' : 'border-line-soft hover:border-line'"
          :style="{ background: s.bg }"
          @click="idx = i"
        >
          <span class="text-h2 font-black" :style="{ color: s.accent }">{{ s.highlight }}</span>
          <span class="min-w-0">
            <span class="block truncate text-body font-semibold text-ink">{{ s.title }}</span>
            <span class="block truncate text-micro tracking-wide2 text-ink-3">{{ s.badge }}</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
