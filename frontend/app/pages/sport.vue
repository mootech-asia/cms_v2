<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const root = ref<HTMLElement | null>(null);
const { modal } = useGamesPage(root);
const route = useRoute();
const providers = ['BTI', 'SABA', 'Favorites'];
const provider = ref(providers.includes(String(route.query.tab)) ? String(route.query.tab) : 'BTI');
watch(() => route.query.tab, (tab) => {
  if (providers.includes(String(tab))) provider.value = String(tab);
});
const tabCls = (p: string) => (p === provider.value ? 'text-primary' : 'text-gray-400 hover:text-gray-300');

// 賽事卡資料(與靜態版 pages/sport.html 相同 8 筆);Load More 每次循環補 8 張、最多 3 次
const MATCHES = [
  { league: 'Premier League', home: { abbr: 'MU', name: 'Manchester United' }, away: { abbr: 'LIV', name: 'Liverpool' }, score: '2 - 1', time: "Live 67'" },
  { league: 'NBA', home: { abbr: 'LAL', name: 'Lakers' }, away: { abbr: 'GSW', name: 'Warriors' }, score: '98 - 105', time: 'Live Q3' },
  { league: 'La Liga', home: { abbr: 'RMA', name: 'Real Madrid' }, away: { abbr: 'FCB', name: 'Barcelona' }, score: '1 - 1', time: "Live 82'" },
  { league: 'MLB', home: { abbr: 'NYY', name: 'Yankees' }, away: { abbr: 'BOS', name: 'Red Sox' }, score: '4 - 3', time: 'Live 7th' },
  { league: 'Champions League', home: { abbr: 'PSG', name: 'PSG' }, away: { abbr: 'FCB', name: 'Bayern Munich' }, score: '3 - 2', time: "Live 55'" },
  { league: 'NBA', home: { abbr: 'BOS', name: 'Celtics' }, away: { abbr: 'MIA', name: 'Heat' }, score: '102 - 99', time: 'Live Q4' },
  { league: 'Premier League', home: { abbr: 'ARS', name: 'Arsenal' }, away: { abbr: 'CHE', name: 'Chelsea' }, score: '1 - 0', time: "Live 78'" },
  { league: 'Serie A', home: { abbr: 'JUV', name: 'Juventus' }, away: { abbr: 'INT', name: 'Inter Milan' }, score: '0 - 0', time: "Live 23'" },
];
const MAX_LOADS = 3;
const loads = ref(0);
const shownMatches = computed(() => {
  const list = [];
  for (let i = 0; i < MATCHES.length * (1 + loads.value); i++) list.push(MATCHES[i % MATCHES.length]!);
  return list;
});
function loadMore() {
  if (loads.value < MAX_LOADS) loads.value++;
}
</script>

<template>
  <div ref="root">
    <CategoryHero title="SPORTS BETTING" />
    <section class="py-8 bg-surface-deep min-h-[400px]">
    <div class="container mx-auto px-4">
    <div class="flex items-center gap-8 border-b border-gray-800 mb-8">
    <button v-for="p in ['BTI','SABA','Favorites']" :key="p" class="pb-4 px-2 transition-colors relative" :class="tabCls(p)" @click="provider = p">{{ p }}<div v-if="provider === p" class="absolute bottom-0 left-0 right-0 h-0.5 bg-g-primary"></div></button>
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
    <input type="text" placeholder="Search" class="w-full bg-surface border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary">
    </div>
    <button class="bg-g-primary text-gray-900 px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-funnel w-4 h-4">
    <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z">
    </path>
    </svg>
    <span class="hidden md:inline">Filter</span>
    </button>
    </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="(m, mi) in shownMatches" :key="mi" class="cursor-pointer bg-surface border border-gray-800 rounded-xl hover:border-primary transition-colors">
    <div class="p-4">
    <div class="flex items-center justify-between mb-3">
    <span class="text-gray-500 text-[10px] truncate max-w-[120px]">{{ m.league }}</span>
    <div class="flex items-center gap-2">
    <button class="focus:outline-none transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-3.5 h-3.5 text-gray-600">
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z">
    </path>
    </svg>
    </button>
    <span class="flex items-center gap-1 text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded">
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
    </div>
    <div class="flex items-center justify-between gap-2 mb-4">
    <div class="flex flex-col items-center gap-1.5 flex-1">
    <div class="w-9 h-9 rounded-full bg-surface-deep border border-gray-700 flex items-center justify-center">
    <span class="text-[10px] text-gray-300 font-semibold">{{ m.home.abbr }}</span>
    </div>
    <span class="text-white text-[10px] text-center leading-tight">{{ m.home.name }}</span>
    </div>
    <div class="text-center flex-shrink-0">
    <div class="text-primary text-xl font-bold leading-none">{{ m.score }}</div>
    <div class="text-gray-500 text-[10px] mt-0.5">{{ m.time }}</div>
    </div>
    <div class="flex flex-col items-center gap-1.5 flex-1">
    <div class="w-9 h-9 rounded-full bg-surface-deep border border-gray-700 flex items-center justify-center">
    <span class="text-[10px] text-gray-300 font-semibold">{{ m.away.abbr }}</span>
    </div>
    <span class="text-white text-[10px] text-center leading-tight">{{ m.away.name }}</span>
    </div>
    </div>
    <button class="w-full py-1.5 rounded-lg text-xs text-gray-900 transition-opacity hover:opacity-90 bg-g-primary">Place Bet</button>
    </div>
    </div>
    </div>
    <div v-if="loads < MAX_LOADS" class="cms-load-more-wrap flex justify-center mt-8">
    <button type="button" class="cms-load-more-button px-8 py-3 rounded-lg transition-colors" @click="loadMore">Load More</button>
    </div>
    </div>
    </section>
    <GamesGameModal :data="modal" @close="modal = null" />
  </div>
</template>
