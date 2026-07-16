<script setup lang="ts">
/**
 * 範例區塊:Hero 輪播 v1(預設版面)— 左靠文字 + 圓點導航。
 * 內容吃 content store 的 banners;視覺只用皮膚 token。
 * 這是「區塊 + 3 變體」規範的示範(docs/template-guide.md §4)。
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
      class="container mx-auto my-4 overflow-hidden rounded-xl border border-line-soft px-8 py-12 md:py-16"
      :style="{ background: b.bg, transition: 'background .7s' }"
    >
      <div class="mb-3 inline-flex rounded border border-line px-3 py-1">
        <span class="text-note tracking-wide2" :style="{ color: b.accent }">{{ b.badge }}</span>
      </div>
      <p class="text-h1 leading-tight text-ink md:text-display">{{ b.title }}</p>
      <p class="text-5xl font-black leading-none md:text-7xl" :style="{ color: b.accent }">{{ b.highlight }}</p>
      <p class="mt-3 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
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
