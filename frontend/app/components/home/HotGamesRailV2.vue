<script setup lang="ts">
/**
 * HotGamesRail 變體 v2:固定網格(取代 v1 的水平捲動軌道),
 * 吃同一份 config/mock/home.ts hotGames 內容與皮膚 token,一次顯示全部項目。
 */
import { hotGames } from '~/config/mock/home'
</script>

<template>
  <section class="py-6 bg-surface">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-ink flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame w-5 h-5 text-primary">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z">
            </path>
          </svg>
          <span class="text-base md:text-lg">Hot Games</span>
        </h2>
        <a class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors" :href="withBase('/hot-games')">Show all</a>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-5 gap-3">
        <div v-for="g in hotGames" :key="g.title" class="cursor-pointer group">
          <div class="relative rounded-xl overflow-hidden bg-surface" style="height: 170px;">
            <img :src="withBase(g.img)" :alt="g.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-2 left-2 bg-scrim/70 text-ink text-[10px] px-2 py-0.5 rounded">{{ g.bonus }}</div>
            <div class="absolute inset-0 bg-scrim/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button class="bg-g-primary text-on-primary text-xs px-3 py-1.5 rounded-lg">Play Now</button>
            </div>
          </div>
          <div class="mt-1.5">
            <p class="text-ink text-xs truncate">{{ g.title }}</p>
            <p class="text-ink-4 text-[10px] truncate">{{ g.provider }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
