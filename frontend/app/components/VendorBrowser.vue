<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ title: string; kind: string; direct?: boolean }>();
const route = useRoute();
const router = useRouter();

const SLOT_VENDORS = [
  'Pragmatic Play', 'PG Soft', 'CQ9 Gaming', 'Hacksaw Gaming', 'NetEnt', 'Nolimit City',
  'Big Time Gaming', 'Booongo', 'JILI', 'PlayStar', 'Yggdrasil', 'Evoplay',
  'Skywind', 'Spadegaming', "Play'n GO", 'Microgaming', 'Habanero', 'Playtech',
  'Red Tiger', 'Relax Gaming', 'Push Gaming', 'Wazdan', 'Blueprint', 'Quickspin',
  'Thunderkick', 'ELK Studios', 'Playson', 'Kalamba', 'Fantasma', 'Dragoon Soft',
];
const LIVE_VENDORS = [
  'Evolution Gaming', 'Pragmatic Play Live', 'Sexy Gaming', 'Yeebet Live', 'WM Casino', 'Dream Gaming',
  'SA Gaming', 'Ezugi', 'Playtech Live', 'BG Big Gaming', 'Allbet', 'Asia Gaming',
  'eBET', 'VIVO Gaming', 'Microgaming Live', 'AE Sexy', 'OG Casino', 'Green Dragon',
  'N2 Live', 'Ho Gaming', 'Bet Games', 'Skywind Live', 'CQ9 Live', 'PP Live Deluxe',
  'Royal Gaming', 'Lucky Streak', 'Betradar Live', 'Xpro Gaming', 'Winfinity', 'Atmosfera',
];
const PHOTOS = [
  'photo-1604028297236-42130c7dcc3a__w-400', 'photo-1604028296525-8304e1a4969f__w-400',
  'photo-1534620780923-1ce0db377c3f__w-400', 'photo-1590336225155-d7e19a3a954f__w-400',
  'photo-1771775606196-70dccc0d9bde__w-400', 'photo-1525018667593-176858caed6a__w-400',
];
const photo = (i: number) => `/_external/images.unsplash.com/${PHOTOS[((i % PHOTOS.length) + PHOTOS.length) % PHOTOS.length]}`;

const vendors = computed(() => (props.kind === 'live' ? LIVE_VENDORS : SLOT_VENDORS));
const active = ref<string | null>(null);
const q = ref('');

const routeProvider = computed(() => {
  const value = route.query.provider;
  return typeof value === 'string' && value.trim() ? value.trim() : null;
});
const selectedProvider = computed(() => active.value || routeProvider.value);
// Back 只在「已進入某廠商的遊戲列表」時顯示;direct 頁(hot-games)與頂層廠商格都不顯示
const showBack = computed(() => !props.direct && Boolean(selectedProvider.value));
const showingVendors = computed(() => !props.direct && !selectedProvider.value);
const filteredVendors = computed(() => {
  const s = q.value.trim().toLowerCase();
  return vendors.value.filter((v) => !s || v.toLowerCase().includes(s));
});
// Load More:每次 +12,最多 3 次(與靜態版 category-load-more.js 一致)
const MAX_LOADS = 3;
const loads = ref(0);
const games = computed(() => {
  const provider = selectedProvider.value;
  const base = props.direct ? 30 : 24;
  const total = base + loads.value * 12;
  const list = props.direct
    ? Array.from({ length: total }, (_, i) => ({ provider: vendors.value[i % vendors.value.length]!, i }))
    : (provider ? Array.from({ length: total }, (_, i) => ({ provider, i })) : []);
  const s = q.value.trim().toLowerCase();
  return s ? list.filter((g) => g.provider.toLowerCase().includes(s)) : list;
});
function loadMore() {
  if (loads.value < MAX_LOADS) loads.value++;
}

function back() {
  // 從遊戲列表回到本分類的廠商格
  active.value = null;
  loads.value = 0;
  if (routeProvider.value) router.replace({ query: {} });
}
function openVendor(v: string) {
  active.value = v;
  loads.value = 0;
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <section class="py-8 bg-surface-deep min-h-[400px]">
    <div class="container mx-auto px-4">
      <div v-if="showBack" class="pb-[18px]">
        <button type="button" class="btn-back" @click="back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          <span>Back</span>
        </button>
      </div>

      <div class="vnd-head">
        <h2 class="vnd-title" :class="{ 'vnd-title-inline': selectedProvider }">
          <template v-if="selectedProvider">
            <span>{{ title }}</span>
            <span class="vnd-provider-badge">{{ selectedProvider }}</span>
          </template>
          <template v-else>{{ title }}</template>
        </h2>
        <div class="vnd-search">
          <svg class="s-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input v-model="q" type="text" :placeholder="showingVendors ? 'Vendor Name' : 'Search Game'">
          <button class="s-btn" type="button">Search</button>
        </div>
      </div>

      <div v-if="showingVendors" class="vnd-grid">
        <button v-for="v in filteredVendors" :key="v" class="vnd-card" @click="openVendor(v)">
          <span class="vnd-name">{{ v }}</span>
        </button>
      </div>

      <div v-if="!showingVendors" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="g in games" :key="`${g.provider}-${g.i}`"
          class="group cursor-pointer overflow-hidden rounded-lg border border-line-soft bg-surface transition-colors hover:border-primary"
        >
          <div class="aspect-[4/3] relative overflow-hidden">
            <img :src="photo(g.i)" alt="Game Name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
          </div>
          <div class="p-4">
            <h3 class="mb-1 truncate text-ink">Game Name</h3>
            <p class="mb-3 truncate text-note text-ink-3">{{ g.provider }}</p>
            <button class="btn-primary btn-sm w-full">Play Now</button>
          </div>
        </div>
      </div>

      <div v-if="!showingVendors && loads < MAX_LOADS" class="cms-load-more-wrap mt-8 flex justify-center">
        <button type="button" class="cms-load-more-button rounded-lg px-8 py-3 transition-colors" @click="loadMore">Load More</button>
      </div>
    </div>
  </section>
</template>
