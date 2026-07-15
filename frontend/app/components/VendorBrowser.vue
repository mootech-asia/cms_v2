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
  <section class="py-8 bg-[#0f1419] min-h-[400px]">
    <div class="container mx-auto px-4">
      <div v-if="showBack" id="inner-back">
        <button type="button" class="cms-back-button" @click="back">
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
          class="bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors cursor-pointer group"
        >
          <div class="aspect-[4/3] relative overflow-hidden">
            <img :src="photo(g.i)" alt="Game Name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300">
          </div>
          <div class="p-4">
            <h3 class="text-white mb-1 truncate">Game Name</h3>
            <p class="text-gray-400 text-sm mb-3 truncate">{{ g.provider }}</p>
            <button class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm">Play Now</button>
          </div>
        </div>
      </div>

      <div v-if="!showingVendors && loads < MAX_LOADS" class="cms-load-more-wrap flex justify-center mt-8">
        <button type="button" class="cms-load-more-button px-8 py-3 rounded-lg transition-colors" @click="loadMore">Load More</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
#inner-back{padding:0 0 18px}
.vnd-head{display:flex;flex-direction:column;gap:16px;margin-bottom:26px}
@media(min-width:768px){.vnd-head{flex-direction:row;align-items:center;justify-content:space-between}}
.vnd-title{color:#fff;font-size:26px;font-weight:800;margin:0}
.vnd-title.vnd-title-inline{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.vnd-provider-badge{display:inline-flex;align-items:center;justify-content:center;min-height:28px;padding:5px 12px;border-radius:999px;border:1px solid rgba(152,231,210,.3);background:rgba(152,231,210,.1);color:#98E7D2;font-size:14px;font-weight:800;line-height:1}
.vnd-search{position:relative;display:flex;gap:10px}
.vnd-search input{background:#1a2128;border:1px solid #374151;border-radius:10px;padding:11px 14px 11px 38px;color:#fff;outline:none;min-width:220px}
.vnd-search input:focus{border-color:#98E7D2}
.vnd-search .s-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#9ca3af;width:16px;height:16px}
.vnd-search .s-btn{background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;border:0;border-radius:10px;padding:0 20px;font-weight:700;cursor:pointer;white-space:nowrap}
.vnd-grid{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:16px}
@media(min-width:640px){.vnd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1024px){.vnd-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.vnd-card{position:relative;display:flex;align-items:center;justify-content:center;height:112px;border-radius:14px;border:1px solid #212b3d;overflow:hidden;cursor:pointer;background:#161e2c;transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
.vnd-card:hover{border-color:#98E7D2;transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.45)}
.vnd-card .vnd-name{padding:0 16px;text-align:center;color:#fff;font-size:20px;font-weight:800;line-height:1.2;letter-spacing:.01em}
.cms-load-more-button{min-width:160px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.2);color:#d1d5db;font-weight:600;cursor:pointer;box-shadow:none;transition:background-color .18s ease,border-color .18s ease,color .18s ease,box-shadow .18s ease,transform .18s ease}
.cms-load-more-button:hover,.cms-load-more-button:focus-visible{background:#304242;border-color:rgba(170,229,211,.22);color:#AAE5D3;box-shadow:inset 0 0 0 1px rgba(170,229,211,.03),0 0 0 1px rgba(41,68,72,.35);transform:translateY(-1px);outline:none}
.cms-load-more-button:active{transform:translateY(0)}
</style>
