<script setup lang="ts">
import { computed } from 'vue';

// 與靜態版 js/promotion-detail.js 相同的資料
const PROMOS = [
  { id: 'riobet-casino', title: 'RioBet Casino', headline: 'Unlimited Daily Bonus', primary: 'Sports / Slots', primaryRate: '5%', secondary: 'Casino / Mini Games', secondaryRate: '3%' },
  { id: 'bitstarz-casino', title: 'BitStarz Casino', headline: 'Weekly Reload Bonus', primary: 'Slots', primaryRate: '50%', secondary: 'Live Casino', secondaryRate: '10%' },
  { id: 'icecasino', title: 'IceCasino', headline: 'Member Exclusive Bonus', primary: 'Hot Games', primaryRate: '30%', secondary: 'Mini Games', secondaryRate: '8%' },
  { id: 'gamdom-casino', title: 'Gamdom Casino', headline: 'Daily Cashback Boost', primary: 'Sports', primaryRate: '15%', secondary: 'Fish Games', secondaryRate: '6%' },
];

const route = useRoute();
const router = useRouter();
const detail = computed(() => {
  const id = typeof route.query.detail === 'string' ? route.query.detail : '';
  return id ? (PROMOS.find((p) => p.id === id) || PROMOS[0]) : null;
});
function openDetail(id: string) {
  router.push({ query: { detail: id } });
}
function backToList() {
  router.push({ query: {} });
}
</script>

<template>
  <div class="min-h-screen bg-[#0f1419]" style="overflow-x: hidden;">
    <AppHeader />
    <div v-if="!detail" class="hero-band py-16 md:py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-7xl text-white mb-4">PROMOTIONS</h1>
      </div>
    </div>

    <section class="py-8 bg-[#0f1419] min-h-[600px]" :class="{ 'promotion-detail-section': detail }">
      <div class="container mx-auto px-4">
        <!-- 列表 -->
        <div v-if="!detail" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="p in PROMOS" :key="p.id"
            class="promotion-clickable bg-[#1a2128] border border-gray-800 rounded-lg overflow-hidden hover:border-[#98E7D2] transition-colors"
            role="button" tabindex="0"
            @click="openDetail(p.id)"
            @keydown.enter.prevent="openDetail(p.id)"
            @keydown.space.prevent="openDetail(p.id)"
          >
            <div class="relative h-32 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="fw-800 select-none" style="color: rgb(152, 231, 210); font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
              </div>
              <div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
                <div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;"></div>
                <div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;"></div>
                <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;"></div>
              </div>
              <div class="absolute inset-0 flex flex-col justify-center px-4">
                <p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
                <p class="text-2xl fw-800" style="background: linear-gradient(90deg, rgb(203, 232, 228), rgb(152, 231, 210)) text; -webkit-text-fill-color: transparent; letter-spacing: 0.06em;">PROMOTION</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-white text-xl mb-4 text-center">{{ p.title }}</h3>
              <div class="space-y-3">
                <button
                  type="button"
                  class="w-full bg-gradient-to-r from-[#CBE8E4] to-[#98E7D2] text-gray-900 px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center font-semibold"
                  @click.stop="openDetail(p.id)"
                >Detail</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 詳情 -->
        <div v-else class="promotion-detail-page">
          <button class="promotion-detail-back cms-back-button" type="button" aria-label="Back" @click="backToList">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>Back</span>
          </button>
          <div class="promotion-detail-shell">
            <h2 class="promotion-detail-heading">Promotion</h2>
            <div class="promotion-detail-poster">
              <div class="promotion-detail-content">
                <img class="promotion-detail-logo" src="/logo.png" alt="WIN100%">
                <div>
                  <p class="promotion-detail-kicker">Special Offer</p>
                  <h3 class="promotion-detail-title">{{ detail.headline }}</h3>
                  <p class="promotion-detail-subtitle">{{ detail.title }}</p>
                </div>
                <div class="promotion-detail-offers">
                  <div class="promotion-detail-offer">
                    <div class="promotion-detail-rank">1</div>
                    <h4>{{ detail.primary }}</h4>
                    <strong>{{ detail.primaryRate }}</strong>
                    <span>Max reward / rollover applies</span>
                  </div>
                  <div class="promotion-detail-offer">
                    <div class="promotion-detail-rank">2</div>
                    <h4>{{ detail.secondary }}</h4>
                    <strong>{{ detail.secondaryRate }}</strong>
                    <span>Max reward / rollover applies</span>
                  </div>
                </div>
                <div class="promotion-detail-rules">
                  <h4>Promotion Terms</h4>
                  <ol>
                    <li>Bonus rewards are calculated from eligible deposits and game turnover.</li>
                    <li>Cancelled bets, refunds, cashouts, and invalid results are not included.</li>
                    <li>Members must keep an active balance and meet rollover requirements.</li>
                    <li>Each completed promotion can only be claimed once.</li>
                  </ol>
                </div>
                <button class="promotion-detail-cta" type="button">Claim Promotion</button>
                <p class="promotion-detail-note">win100% reserves the right to adjust, pause, or end this promotion at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AppFooter />
    <MobileBottomNav />
  </div>
</template>

<style scoped>
section.promotion-detail-section{background:#0f1419;min-height:calc(100dvh - 64px);padding-top:40px;padding-bottom:72px}
.promotion-clickable{cursor:pointer}
.promotion-clickable:focus-visible{outline:2px solid #98E7D2;outline-offset:3px}
.promotion-detail-page{max-width:1180px;margin:0 auto;color:#fff}
.promotion-detail-back{margin-bottom:28px}
.promotion-detail-heading{display:inline-flex;align-items:center;margin:0;color:#fff;font-size:30px;font-weight:800;line-height:1}
.promotion-detail-shell{display:flex;flex-direction:column;align-items:center;gap:28px}
.promotion-detail-poster{position:relative;width:min(100%,760px);overflow:hidden;border:1px solid rgba(152,231,210,.26);border-radius:8px;background:linear-gradient(180deg,#1a2128 0%,#141c24 58%,#101820 100%);box-shadow:0 24px 70px rgba(0,0,0,.34);padding:46px 54px 42px;text-align:center}
.promotion-detail-poster:before{content:"";position:absolute;inset:20px;border:1px solid rgba(152,231,210,.12);border-radius:6px;pointer-events:none}
.promotion-detail-content{position:relative;z-index:1;display:flex;min-height:680px;flex-direction:column;align-items:center;justify-content:space-between;gap:26px}
.promotion-detail-logo{height:42px;object-fit:contain;mix-blend-mode:lighten}
.promotion-detail-kicker{margin:0;color:#98E7D2;font-size:14px;font-weight:800;letter-spacing:.22em;text-transform:uppercase}
.promotion-detail-title{margin:8px 0 0;font-size:50px;font-weight:800;line-height:1.08;background:linear-gradient(90deg,#CBE8E4,#98E7D2);-webkit-background-clip:text;background-clip:text;color:transparent}
.promotion-detail-subtitle{margin:12px 0 0;color:#fff;font-size:22px;font-weight:800}
.promotion-detail-offers{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;width:100%;margin-top:2px}
.promotion-detail-offer{position:relative;border:1px solid rgba(152,231,210,.24);border-radius:8px;background:#0f1419;padding:28px 18px 22px;box-shadow:inset 0 1px 0 rgba(255,255,255,.03)}
.promotion-detail-rank{position:absolute;top:-15px;left:50%;transform:translateX(-50%);width:34px;height:28px;border-radius:999px;display:flex;align-items:center;justify-content:center;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#0f1419;font-size:14px;font-weight:800;box-shadow:0 8px 18px rgba(0,0,0,.28)}
.promotion-detail-offer h4{margin:0 0 10px;color:#CBE8E4;font-size:19px;font-weight:800}
.promotion-detail-offer strong{display:block;color:#fff;font-size:30px;line-height:1}
.promotion-detail-offer span{display:block;margin-top:10px;color:#9ca3af;font-size:14px;font-weight:700}
.promotion-detail-rules{width:100%;margin:0;padding:22px 26px;border:1px solid rgba(152,231,210,.18);border-radius:8px;background:rgba(15,20,25,.78);text-align:left}
.promotion-detail-rules h4{margin:0 0 12px;text-align:center;color:#CBE8E4;font-size:18px}
.promotion-detail-rules ol{margin:0;padding-left:18px;color:#d1d5db;font-size:15px;line-height:1.7}
.promotion-detail-note{margin:0;color:#9ca3af;font-size:13px;line-height:1.6}
.promotion-detail-cta{width:min(100%,420px);border:0;border-radius:8px;background:linear-gradient(90deg,#CBE8E4,#98E7D2);color:#07131c;font-size:17px;font-weight:800;padding:14px 18px;cursor:pointer;transition:opacity .16s ease}
.promotion-detail-cta:hover,.promotion-detail-cta:focus-visible{opacity:.88;outline:none}
@media(max-width:768px){
  section.promotion-detail-section{padding-top:28px}
  .promotion-detail-back{font-size:16px;margin-bottom:22px}
  .promotion-detail-heading{font-size:28px}
  .promotion-detail-poster{padding:36px 22px 32px}
  .promotion-detail-poster:before{inset:12px}
  .promotion-detail-content{min-height:640px}
  .promotion-detail-title{font-size:36px}
  .promotion-detail-subtitle{font-size:19px}
  .promotion-detail-offers{grid-template-columns:1fr;gap:22px}
  .promotion-detail-rules{padding:18px 20px}
  .promotion-detail-rules ol{font-size:14px}
}
</style>
