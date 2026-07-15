<script setup lang="ts">
/**
 * Ticker 變體 v3:靜態「得獎徽章」列(取代 v1 的橫向跑馬燈/v2 的單筆輪播),
 * 吃同一份 tickerWins 資料,取前 4 筆同時並列顯示,不捲動不動畫,適合密集版面。
 */
import { tickerWins } from '~/config/mock/home';

const chips = tickerWins.slice(0, 4);
</script>

<template>
  <div class="overflow-x-auto border-y border-line-soft bg-surface-deep px-4 py-2 scrollbar-hide">
    <div class="flex flex-nowrap items-center justify-start gap-2 md:flex-wrap md:justify-center">
      <div
        v-for="(w, i) in chips" :key="i"
        class="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-line-soft bg-surface px-3 py-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 flex-shrink-0 text-primary">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
        <span class="whitespace-nowrap text-micro text-ink-3">
          <span class="font-semibold text-primary">{{ w.player }}</span> · <span class="text-ink">{{ w.amount }}</span> · {{ w.game }}
        </span>
      </div>
    </div>
  </div>
</template>
