<script setup lang="ts">
import { ref, watch } from 'vue';
const root = ref<HTMLElement | null>(null);
const { modal } = useGamesPage(root);
const route = useRoute();
const providers = ['Sexy', 'Pragmatic Play', 'Yeebet', 'Favorites'];
const provider = ref(providers.includes(String(route.query.tab)) ? String(route.query.tab) : 'Sexy');
watch(() => route.query.tab, (tab) => {
  if (providers.includes(String(tab))) provider.value = String(tab);
});
const tabCls = (p: string) => (p === provider.value ? 'text-[#98E7D2]' : 'text-gray-400 hover:text-gray-300');
</script>

<template>
  <div ref="root" class="min-h-screen bg-[#0f1419]" style="overflow-x: hidden;">
    <AppHeader />
    <div class="py-20" style="background: linear-gradient(to right, rgb(192, 38, 211), rgb(124, 58, 237), rgb(37, 99, 235));">
    <div class="container mx-auto px-4 text-center">
    <h1 class="text-5xl md:text-7xl text-white mb-4">LIVE CASINO GAMES</h1>
    </div>
    </div>
    <section class="py-8 min-h-[400px]" style="background: linear-gradient(rgb(26, 13, 46), rgb(18, 10, 30), rgb(15, 20, 25));">
    <div class="container mx-auto px-4">
    <div class="flex items-center gap-8 border-b border-gray-800 mb-8">
    <button v-for="p in ['Sexy','Pragmatic Play','Yeebet','Favorites']" :key="p" class="pb-4 px-2 transition-colors relative" :class="tabCls(p)" @click="provider = p">{{ p }}<div v-if="provider === p" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2]"></div></button>
    </div>
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
    <h2 class="text-white text-2xl md:text-3xl">Live Matches</h2>
    <div class="flex items-center gap-3">
    <div class="relative flex-1 md:w-64">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
    <circle cx="11" cy="11" r="8">
    </circle>
    <path d="m21 21-4.3-4.3">
    </path>
    </svg>
    <input type="text" placeholder="Search" class="w-full bg-[#1a2128] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#98E7D2]">
    </div>
    <button class="bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel w-4 h-4">
    <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z">
    </path>
    </svg>
    <span class="hidden md:inline">Filter</span>
    </button>
    </div>
    </div>
    <div class="text-center py-20">
    <p class="text-gray-400 text-lg">Coming Soon</p>
    </div>
    </div>
    </section>
    <AppFooter />
    <MobileBottomNav />
    <GamesGameModal :data="modal" @close="modal = null" />
  </div>
</template>
