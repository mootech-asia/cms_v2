<script setup lang="ts">
/**
 * MiniGamesGrid 變體 v3:不使用分頁,三個分類(Mini/Slot/Live)直向堆疊、
 * 各自以標籤 + 小型水平縮圖列呈現,訪客不需點擊即可同時看到三類遊戲。
 * 吃同一份 config/mock/home.ts miniGamesTabs 內容與皮膚 token。
 */
import { miniGamesImgs, miniGamesTabs } from '~/config/mock/home';

const IMG = '/_external/images.unsplash.com/';
const pic = (i: number) => IMG + miniGamesImgs[i % miniGamesImgs.length];
const mk = (names: string[]) => names.map((title, i) => ({ title, img: pic(i) }));

const sections = miniGamesTabs.map((t) => ({ ...t, games: mk(t.names) }));
</script>

<template>
  <section class="py-12 bg-surface-deep">
    <div class="container mx-auto px-4">
      <div class="space-y-8">
        <div v-for="s in sections" :key="s.key">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-ink text-sm md:text-base font-bold">{{ s.label }}</h3>
            <NuxtLink class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors" :to="s.route">Show all</NuxtLink>
          </div>
          <div class="flex overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
            <div v-for="g in s.games" :key="g.title" class="flex-shrink-0 w-20 md:w-24 snap-start cursor-pointer group">
              <div class="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-line group-hover:border-primary transition-colors">
                <img :src="g.img" :alt="g.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
              </div>
              <h4 class="text-ink text-[11px] md:text-xs text-center mt-1.5 truncate">{{ g.title }}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
