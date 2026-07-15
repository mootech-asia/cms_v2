<script setup lang="ts">
import { sportsMatches } from '~/config/mock/home'
</script>

<template>
  <section class="py-6 bg-surface-deep">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-ink flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-5 h-5 text-primary">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6">
            </path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18">
            </path>
            <path d="M4 22h16">
            </path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22">
            </path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22">
            </path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z">
            </path>
          </svg>
          <span class="text-base md:text-lg">Live Sport</span>
        </h2>
        <div class="flex items-center gap-2">
          <a class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors flex items-center gap-1.5" href="/sport">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-3 h-3 text-primary">
              <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
              </path>
              <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
              </path>
              <circle cx="12" cy="12" r="2">
              </circle>
              <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
              </path>
              <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
              </path>
            </svg>View All Live</a>
          <button class="text-ink-3 hover:text-ink p-1.5 border border-line rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-4 h-4">
              <path d="m15 18-6-6 6-6">
              </path>
            </svg>
          </button>
          <button class="text-ink-3 hover:text-ink p-1.5 border border-line rounded transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-4 h-4">
              <path d="m9 18 6-6-6-6">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div class="relative rounded-xl overflow-hidden mb-4" style="background: linear-gradient(135deg, rgb(10, 32, 16) 0%, rgb(20, 53, 32) 30%, rgb(26, 74, 40) 60%, rgb(15, 42, 24) 100%); min-height: 160px;">
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, rgba(185, 222, 90, 0.4) 1px, transparent 1px); background-size: 20px 20px;">
        </div>
        <div class="absolute top-4 left-4 flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-g-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy w-4 h-4 text-on-primary">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6">
              </path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18">
              </path>
              <path d="M4 22h16">
              </path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22">
              </path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22">
              </path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z">
              </path>
            </svg>
          </div>
          <div>
            <p class="text-primary text-xs font-semibold">UEFA</p>
            <p class="text-ink-3 text-[10px]">World Cup</p>
          </div>
        </div>
        <div class="relative flex flex-col md:flex-row items-center justify-center md:justify-between px-6 pt-16 pb-10 gap-4">
          <div class="text-center md:text-left">
            <p class="text-ink-3 text-xs tracking-widest uppercase mb-1">The World's Biggest Event</p>
            <h3 class="text-ink text-2xl md:text-4xl mb-1" style="font-weight:800;">FIFA WORLD CUP</h3>
            <p class="text-primary text-xl md:text-2xl mb-3" style="font-weight: 700;">2026</p>
            <div class="inline-block bg-g-primary text-on-primary px-4 py-1.5 rounded">
              <span class="text-xs font-semibold">Prize Pool:&nbsp;</span>
              <span class="text-sm font-bold">RM 4,700,000</span>
            </div>
          </div>
          <div class="hidden md:block opacity-40">
            <svg width="100" height="120" viewBox="0 0 120 140" fill="none">
              <path d="M30 10 h60 v50 a30 30 0 0 1 -60 0 Z" fill="none" stroke="#B9DE5A" stroke-width="3">
              </path>
              <rect x="45" y="90" width="30" height="25" fill="#B9DE5A" opacity="0.6">
              </rect>
              <rect x="30" y="115" width="60" height="8" rx="4" fill="#B9DE5A" opacity="0.8">
              </rect>
              <path d="M10 10 h20 v30 a20 20 0 0 1 -20 0 Z" fill="none" stroke="#B9DE5A" stroke-width="2">
              </path>
              <path d="M90 10 h20 v30 a20 20 0 0 1 -20 0 Z" fill="none" stroke="#B9DE5A" stroke-width="2">
              </path>
            </svg>
          </div>
        </div>
      </div>
      <div class="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
        <div v-for="m in sportsMatches" :key="m.league + m.teamA.code" class="flex-shrink-0 snap-start cursor-pointer bg-surface border border-line-soft rounded-xl hover:border-primary transition-colors" style="min-width: 220px;">
          <div class="p-4">
            <div class="flex items-center justify-between mb-3">
              <span class="text-ink-4 text-[10px] truncate max-w-[120px]">{{ m.league }}</span>
              <span class="flex items-center gap-1 text-[10px] bg-danger/20 text-danger border border-danger/30 px-1.5 py-0.5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radio w-2.5 h-2.5 animate-pulse">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9">
                  </path>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5">
                  </path>
                  <circle cx="12" cy="12" r="2">
                  </circle>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5">
                  </path>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19">
                  </path>
                </svg>LIVE</span>
            </div>
            <div class="flex items-center justify-between gap-2 mb-4">
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-surface-deep border border-line flex items-center justify-center">
                  <span class="text-[10px] text-ink-2 font-semibold">{{ m.teamA.code }}</span>
                </div>
                <span class="text-ink text-[10px] text-center leading-tight">{{ m.teamA.name }}</span>
              </div>
              <div class="text-center flex-shrink-0">
                <div class="text-primary text-xl font-bold leading-none">{{ m.score }}</div>
                <div class="text-ink-4 text-[10px] mt-0.5">{{ m.minute }}</div>
              </div>
              <div class="flex flex-col items-center gap-1.5 flex-1">
                <div class="w-9 h-9 rounded-full bg-surface-deep border border-line flex items-center justify-center">
                  <span class="text-[10px] text-ink-2 font-semibold">{{ m.teamB.code }}</span>
                </div>
                <span class="text-ink text-[10px] text-center leading-tight">{{ m.teamB.name }}</span>
              </div>
            </div>
            <button class="w-full py-1.5 rounded-lg text-xs text-on-primary transition-opacity hover:opacity-90 bg-g-primary">Place Bet</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
