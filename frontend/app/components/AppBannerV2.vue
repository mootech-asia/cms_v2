<script setup lang="ts">
/**
 * Banner 變體 v2:置中卡片式(取代 v1 的左靠+雷達點陣背景),
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
  <section class="relative w-full overflow-hidden bg-surface-deep" style="min-height:280px">
    <div class="relative flex min-h-[280px] items-center justify-center text-center" :style="{ background: b.bg, transition: 'background .7s' }">
      <div class="relative z-10 mx-auto max-w-md px-4 py-8">
        <div
          class="mx-auto mb-4 inline-flex rounded-full border px-4 py-1"
          :style="{ borderColor: b.accent + '55', background: b.accent + '18' }"
        >
          <span class="text-note font-bold tracking-wide2" :style="{ color: b.accent }">{{ b.badge }}</span>
        </div>
        <p class="text-h1 font-bold text-ink">{{ b.title }}</p>
        <p class="text-display font-black leading-none" :style="{ color: b.accent }">{{ b.highlight }}</p>
        <p class="mt-3 text-note tracking-wide2 text-ink-3">{{ b.sub }}</p>
        <button
          type="button"
          class="btn-primary btn-md mt-6"
          :style="{ background: `linear-gradient(135deg, ${b.accent}, ${b.accent})` }"
        >{{ b.cta }}</button>
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2">
      <button
        v-for="(s, i) in banners" :key="s.id" type="button"
        class="h-1.5 rounded-full border-0 p-0.5 box-content transition-all"
        :style="{ width: i === idx ? '20px' : '6px', background: i === idx ? b.accent : 'rgba(255,255,255,.3)' }"
        @click="go(i)"
      />
    </div>
  </section>
</template>
