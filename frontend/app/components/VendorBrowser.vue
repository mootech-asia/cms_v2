<script setup lang="ts">
import { ref, computed } from 'vue';
import { CATEGORY_VENDOR_OPERATION_MEDIA } from '~/config/operational-media';

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
const LIVE_GAME_NAMES = [
  'Lightning Roulette', 'VIP Baccarat', 'Speed Blackjack', 'Dragon Tiger',
  'Casino Hold’em', 'Immersive Roulette', 'No Commission Baccarat', 'Sic Bo Live',
  'Power Blackjack', 'Golden Roulette', 'Baccarat Control Squeeze', 'Three Card Poker',
];
const isLive = computed(() => props.kind === 'live');
const categoryMedia = computed(() => {
  if (props.kind === 'live') return CATEGORY_VENDOR_OPERATION_MEDIA.live;
  if (props.kind === 'fish') return CATEGORY_VENDOR_OPERATION_MEDIA.fish;
  if (props.kind === 'mini-games') return CATEGORY_VENDOR_OPERATION_MEDIA.miniGames;
  return CATEGORY_VENDOR_OPERATION_MEDIA.slot;
});
const operationalMedia = (i: number) => {
  const list = categoryMedia.value;
  return list[((i % list.length) + list.length) % list.length]!;
};
const gameTitle = (i: number) => isLive.value ? LIVE_GAME_NAMES[i % LIVE_GAME_NAMES.length]! : 'Game Name';
const gameImage = (i: number) => operationalMedia(i).image;
const gameFocalPoint = (i: number) => operationalMedia(i).focalPoint;
const mediaSrc = (src: string) => /^(https?:)?\/\//.test(src) ? src : withBase(src);
const hideBrokenMedia = (event: Event) => {
  (event.currentTarget as HTMLImageElement).hidden = true;
};

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
        <button
          v-for="(v, i) in filteredVendors"
          :key="v"
          class="vnd-card group relative isolate min-h-[136px] overflow-hidden"
          @click="openVendor(v)"
        >
          <img
            :src="mediaSrc(operationalMedia(i).image)"
            alt=""
            aria-hidden="true"
            class="vnd-card-media absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            :style="{ objectPosition: operationalMedia(i).focalPoint }"
            loading="lazy"
            @error="hideBrokenMedia"
          >
          <div class="vnd-card-scrim absolute inset-0" />
          <span class="relative z-[1] flex h-full w-full flex-col items-center justify-end gap-2 p-4">
            <span class="vnd-name">{{ v }}</span>
            <span
              v-if="isLive"
              class="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-deep/85 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] text-ink-2"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              LIVE STUDIO
            </span>
          </span>
        </button>
      </div>

      <div v-if="!showingVendors" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          v-for="g in games" :key="`${g.provider}-${g.i}`"
          class="group cursor-pointer overflow-hidden rounded-lg border border-line-soft bg-surface transition-colors hover:border-primary"
        >
          <div class="aspect-[4/3] relative overflow-hidden">
            <img
              :src="mediaSrc(gameImage(g.i))"
              :alt="gameTitle(g.i)"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              :style="{ objectPosition: gameFocalPoint(g.i) }"
              loading="lazy"
              @error="hideBrokenMedia"
            >
            <div v-if="isLive" class="absolute inset-0 bg-gradient-to-t from-surface-deep/65 via-transparent to-transparent" />
            <span
              v-if="isLive"
              class="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-deep/90 px-2 py-1 text-[10px] font-extrabold tracking-[0.12em] text-ink"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              LIVE DEALER
            </span>
          </div>
          <div class="p-4">
            <h3 class="mb-1 truncate text-ink">{{ gameTitle(g.i) }}</h3>
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
