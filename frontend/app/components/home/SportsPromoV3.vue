<script setup lang="ts">
/**
 * Live Sport 變體 v3:密集網格(取代 v1 的橫向捲動賽事卡),
 * 保留同一份 featured match(FIFA World Cup)概念與 sportsMatches 資料,
 * 手機 2 欄、桌面 4 欄的小型賽事磚,不需捲動即可看到更多場次。
 */
import { sportsMatches } from '~/config/mock/home'
</script>

<template>
  <section class="bg-surface-deep py-6">
    <div class="container mx-auto px-4">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="flex items-center gap-2 text-ink">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-primary">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
          <span class="text-base md:text-lg">Live Sport</span>
        </h2>
        <a class="flex items-center gap-1.5 rounded border border-line px-3 py-1.5 text-xs text-ink-3 transition-colors hover:text-ink" :href="withBase('/sport')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 text-primary">
            <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
            <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
            <circle cx="12" cy="12" r="2" />
            <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
            <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
          </svg>View All Live</a>
      </div>

      <div class="relative mb-4 overflow-hidden rounded-xl" style="background: linear-gradient(135deg, rgb(10, 32, 16) 0%, rgb(20, 53, 32) 30%, rgb(26, 74, 40) 60%, rgb(15, 42, 24) 100%); min-height: 140px;">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, rgba(185, 222, 90, 0.4) 1px, transparent 1px); background-size: 20px 20px;" />
        <div class="absolute left-4 top-4 flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-g-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-on-primary">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-semibold text-primary">UEFA</p>
            <p class="text-[10px] text-ink-3">World Cup</p>
          </div>
        </div>
        <div class="relative flex flex-col items-center justify-center gap-3 px-6 pb-6 pt-12 text-center">
          <div>
            <p class="mb-1 text-xs uppercase tracking-widest text-ink-3">The World's Biggest Event</p>
            <h3 class="mb-1 text-xl text-ink md:text-2xl" style="font-weight:800;">FIFA WORLD CUP</h3>
            <p class="mb-2 text-lg text-primary md:text-xl" style="font-weight: 700;">2026</p>
            <div class="inline-block rounded bg-g-primary px-4 py-1.5 text-on-primary">
              <span class="text-xs font-semibold">Prize Pool:&nbsp;</span>
              <span class="text-sm font-bold">RM 4,700,000</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
        <div
          v-for="m in sportsMatches" :key="m.league + m.teamA.code"
          class="cursor-pointer rounded-lg border border-line-soft bg-surface p-2.5 transition-colors hover:border-primary"
        >
          <div class="mb-1.5 flex items-center justify-between gap-1">
            <span class="max-w-[70px] truncate text-[9px] text-ink-4">{{ m.league }}</span>
            <span class="flex flex-shrink-0 items-center gap-0.5 rounded border border-danger/30 bg-danger/20 px-1 py-0.5 text-[9px] text-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-2 w-2 animate-pulse">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>LIVE</span>
          </div>
          <div class="flex items-center justify-between gap-1">
            <span class="flex-1 truncate text-[10px] font-semibold text-ink-2">{{ m.teamA.code }}</span>
            <span class="flex-shrink-0 text-xs font-bold text-primary">{{ m.score }}</span>
            <span class="flex-1 truncate text-right text-[10px] font-semibold text-ink-2">{{ m.teamB.code }}</span>
          </div>
          <div class="mt-1 text-center text-[9px] text-ink-4">{{ m.minute }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
