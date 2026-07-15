<script setup lang="ts">
/**
 * Ticker 變體 v2:直向單筆輪播(取代 v1 的橫向跑馬燈),
 * 吃同一份 tickerWins 資料,每隔數秒淡入淡出切換下一筆,佔用高度更小。
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { tickerWins } from '~/config/mock/home';

const idx = ref(0);
const current = computed(() => tickerWins[idx.value]!);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    idx.value = (idx.value + 1) % tickerWins.length;
  }, 3000);
});
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <div class="flex items-center gap-2 overflow-hidden border-y border-line-soft bg-surface-deep px-4 py-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5 flex-shrink-0 text-primary">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
    <Transition name="tkv2" mode="out-in">
      <p :key="idx" class="truncate text-xs text-ink-3">
        Congratulations&nbsp;<span class="text-primary">{{ current.player }}</span>&nbsp;winning&nbsp;<span class="text-ink">{{ current.amount }}</span>&nbsp;in {{ current.game }}
      </p>
    </Transition>
  </div>
</template>
