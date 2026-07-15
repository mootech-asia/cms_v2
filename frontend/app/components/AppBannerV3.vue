<script setup lang="ts">
/**
 * Banner 變體 v3:分割式 — 左半主打 slide、右半其餘 slides 的直欄縮圖清單(可點切換)。
 * 吃同一份 config/mock/home.ts banners 內容與皮膚 token,只換版面。
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { banners } from '~/config/mock/home';

const idx = ref(0);
const b = computed(() => banners[idx.value]!);
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
        class="relative flex min-h-[240px] items-center overflow-hidden rounded-xl border border-line-soft md:col-span-2"
        :style="{ background: b.bg, transition: 'background .7s' }"
      >
        <div class="relative z-10 px-6 py-8 md:px-10">
          <div
            class="mb-3 inline-flex rounded px-3 py-1"
            :style="{ background: b.accent + '22', border: `1px solid ${b.accent}44` }"
          >
            <span class="text-note tracking-wide2" :style="{ color: b.accent }">{{ b.badge }}</span>
          </div>
          <p class="text-h1 leading-tight text-ink md:text-display">{{ b.title }}</p>
          <p class="text-5xl font-black leading-none md:text-7xl" :style="{ color: b.accent }">{{ b.highlight }}</p>
          <p class="mt-3 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
          <button
            type="button"
            class="btn-primary btn-md mt-5"
            :style="{ background: `linear-gradient(135deg, ${b.accent}, ${b.accent})` }"
          >{{ b.cta }}</button>
        </div>
      </div>
      <!-- 其餘 slides 直欄縮圖 -->
      <div class="grid grid-rows-3 gap-3">
        <button
          v-for="(s, i) in banners" :key="s.id" type="button"
          class="flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors"
          :class="i === idx ? 'border-primary' : 'border-line-soft hover:border-line'"
          :style="{ background: s.bg }"
          @click="go(i)"
        >
          <span class="text-h2 font-black leading-none" :style="{ color: s.accent }">{{ s.highlight }}</span>
          <span class="min-w-0">
            <span class="block truncate text-body font-semibold text-ink">{{ s.title }}</span>
            <span class="block truncate text-micro tracking-wide2 text-ink-3">{{ s.badge }}</span>
          </span>
        </button>
      </div>
    </div>
  </section>
</template>
