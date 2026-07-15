<script setup lang="ts">
/**
 * MiniGamesGrid 變體 v2:分頁改為藥丸按鈕(取代 v1 的底線指示器),
 * 遊戲縮圖改為自動換行的網格(取代水平捲動軌道)。
 * 吃同一份 config/mock/home.ts miniGamesTabs 內容與皮膚 token。
 */
import { ref, computed } from 'vue';
import { miniGamesImgs, miniGamesTabs } from '~/config/mock/home';

const IMG = '/_external/images.unsplash.com/';
const pic = (i: number) => IMG + miniGamesImgs[i % miniGamesImgs.length];
const mk = (names: string[]) => names.map((title, i) => ({ title, img: pic(i) }));

const tabs = miniGamesTabs.map((t) => ({ ...t, games: mk(t.names) }));

const active = ref('mini');
const games = computed(() => tabs.find((t) => t.key === active.value)!.games);
const routes: Record<string, string> = Object.fromEntries(tabs.map((t) => [t.key, t.route]));

const pillClass = (key: string) =>
  key === active.value
    ? 'bg-g-primary text-on-primary'
    : 'bg-surface text-ink-3 hover:text-ink-2';
</script>

<template>
  <section class="py-12 bg-surface-deep">
    <div class="container mx-auto px-4">
      <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex items-center gap-2">
          <button
            v-for="t in tabs" :key="t.key" type="button"
            class="px-4 py-1.5 rounded-full text-xs md:text-sm transition-colors"
            :class="pillClass(t.key)"
            @click="active = t.key"
          >{{ t.label }}</button>
        </div>
        <NuxtLink class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors self-start md:self-auto" :to="routes[active]">Show all</NuxtLink>
      </div>
      <div :key="active" class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 animate-slideIn">
        <div v-for="g in games" :key="g.title" class="cursor-pointer group">
          <div class="aspect-square rounded-lg overflow-hidden border-2 border-line group-hover:border-primary transition-colors">
            <img :src="g.img" :alt="g.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
          </div>
          <h3 class="text-ink text-xs text-center mt-2 truncate">{{ g.title }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>
