<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{ title: string; kind: string; direct?: boolean }>();

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

const showingVendors = computed(() => !props.direct && !active.value);
const filteredVendors = computed(() => {
  const s = q.value.trim().toLowerCase();
  return vendors.value.filter((v) => !s || v.toLowerCase().includes(s));
});
const games = computed(() => {
  const list = props.direct
    ? Array.from({ length: 30 }, (_, i) => ({ provider: vendors.value[i % vendors.value.length]!, i }))
    : (active.value ? Array.from({ length: 24 }, (_, i) => ({ provider: active.value as string, i })) : []);
  if (!props.direct) return list; // vendor game list is not text-filtered
  const s = q.value.trim().toLowerCase();
  return s ? list.filter((g) => g.provider.toLowerCase().includes(s)) : list;
});

const router = useRouter();
function back() {
  if (!props.direct && active.value) { active.value = null; return; }
  router.back();
}
function openVendor(v: string) {
  active.value = v;
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <section class="py-8 bg-[#0f1419] min-h-[400px]">
    <div class="container mx-auto px-4">
      <div id="inner-back">
        <button type="button" @click="back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          <span>Back</span>
        </button>
      </div>

      <div class="vnd-head">
        <h2>{{ title }}</h2>
        <div class="vnd-search">
          <svg class="s-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input v-model="q" type="text" :placeholder="direct ? 'Search Game' : 'Vendor Name'">
          <button class="s-btn" type="button">Search</button>
        </div>
      </div>

      <div v-if="showingVendors" class="vnd-grid">
        <button v-for="v in filteredVendors" :key="v" class="vnd-card" @click="openVendor(v)">
          <span class="vnd-name">{{ v }}</span>
        </button>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
    </div>
  </section>
</template>

<style scoped>
#inner-back{padding:0 0 18px}
#inner-back button{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:#fff;font-size:22px;font-weight:700;cursor:pointer;padding:0}
#inner-back button:hover{color:#98E7D2}
#inner-back svg{width:24px;height:24px}
.vnd-head{display:flex;flex-direction:column;gap:16px;margin-bottom:26px}
@media(min-width:768px){.vnd-head{flex-direction:row;align-items:center;justify-content:space-between}}
.vnd-head h2{color:#fff;font-size:26px;font-weight:600;margin:0}
.vnd-search{position:relative;display:flex;gap:10px}
.vnd-search input{background:#1a2128;border:1px solid #374151;border-radius:10px;padding:11px 14px 11px 38px;color:#fff;outline:none;min-width:220px}
.vnd-search input:focus{border-color:#98E7D2}
.vnd-search .s-icon{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:#9ca3af;width:16px;height:16px}
.vnd-search .s-btn{background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1622;border:0;border-radius:10px;padding:0 20px;font-weight:700;cursor:pointer;white-space:nowrap}
.vnd-grid{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:16px}
@media(min-width:640px){.vnd-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(min-width:1024px){.vnd-grid{grid-template-columns:repeat(4,minmax(0,1fr))}}
.vnd-card{position:relative;display:flex;align-items:center;justify-content:center;height:140px;border-radius:16px;border:1px solid rgba(152,231,210,.32);overflow:hidden;cursor:pointer;background:linear-gradient(135deg,#0c2018 0%,#0e2a1f 45%,#0a1512 100%);transition:border-color .18s ease,transform .18s ease,box-shadow .18s ease}
.vnd-card::before{content:"";position:absolute;width:190px;height:190px;left:-46px;top:-64px;border-radius:50%;background:radial-gradient(circle,rgba(152,231,210,.22),transparent 65%);pointer-events:none}
.vnd-card::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,255,255,.06),transparent 42%);pointer-events:none}
.vnd-card:hover{border-color:#98E7D2;transform:translateY(-3px);box-shadow:0 0 0 1px rgba(152,231,210,.5),0 16px 34px rgba(0,0,0,.55)}
.vnd-card:hover::before{background:radial-gradient(circle,rgba(152,231,210,.32),transparent 65%)}
.vnd-card .vnd-name{position:relative;z-index:1;padding:0 18px;text-align:center;color:#fff;font-size:22px;font-weight:800;line-height:1.2;letter-spacing:.01em;text-shadow:0 2px 12px rgba(0,0,0,.55)}
</style>
