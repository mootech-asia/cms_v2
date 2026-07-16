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
  <div>
    <CategoryHero v-if="!detail" title="PROMOTIONS" />

    <section
      class="bg-surface-deep"
      :class="detail
        ? 'pt-[28px] md:pt-10 pb-[72px] min-h-[calc(100dvh-64px)]'
        : 'py-8 min-h-[600px]'"
    >
      <div class="container mx-auto px-4">
        <!-- 列表 -->
        <div v-if="!detail" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="p in PROMOS" :key="p.id"
            class="cursor-pointer bg-surface border border-line-soft rounded-lg overflow-hidden hover:border-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[3px]"
            role="button" tabindex="0"
            @click="openDetail(p.id)"
            @keydown.enter.prevent="openDetail(p.id)"
            @keydown.space.prevent="openDetail(p.id)"
          >
            <div class="promo-card-art relative h-32 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="font-extrabold select-none text-primary text-[54px] tracking-[0.12em] opacity-[0.07]">PROMO!</span>
              </div>
              <div class="absolute top-2 right-3 flex flex-col items-end gap-[3px]">
                <div class="h-[26px] w-[26px] rounded-full bg-gradient-to-br from-primary-soft to-primary opacity-[0.85]"></div>
                <div class="promo-card-art-dot-mid h-4 w-4 rounded-full opacity-60 mr-2.5"></div>
                <div class="h-5 w-5 rounded-full bg-gradient-to-br from-primary-soft to-primary opacity-[0.45] mr-0.5"></div>
              </div>
              <div class="absolute inset-0 flex flex-col justify-center px-4">
                <p class="text-xs mb-1.5 text-primary tracking-[0.2em]">SPECIAL OFFER</p>
                <p class="text-gradient-primary text-2xl font-extrabold tracking-[0.06em]">PROMOTION</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-ink text-xl mb-4 text-center">{{ p.title }}</h3>
              <div class="space-y-3">
                <button
                  type="button"
                  class="w-full bg-g-primary text-on-primary px-4 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center font-semibold"
                  @click.stop="openDetail(p.id)"
                >Detail</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 詳情 -->
        <div v-else class="mx-auto max-w-[1180px] text-ink">
          <button class="btn-back mb-[22px] text-base md:mb-7 md:text-[15px]" type="button" aria-label="Back" @click="backToList">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            <span>Back</span>
          </button>
          <div class="flex flex-col items-center gap-7">
            <h2 class="inline-flex items-center m-0 text-ink text-[28px] md:text-display font-extrabold leading-none">Promotion</h2>
            <div
              class="promotion-detail-poster-bg relative w-full max-w-[760px] overflow-hidden rounded-lg border border-primary/[0.26] shadow-[0_24px_70px_rgba(0,0,0,0.34)] px-[22px] pt-9 pb-8 text-center md:px-[54px] md:pt-[46px] md:pb-[42px] before:content-[''] before:pointer-events-none before:absolute before:inset-3 before:rounded-md before:border before:border-primary/[0.12] md:before:inset-5"
            >
              <div class="relative z-[1] flex min-h-[640px] flex-col items-center justify-between gap-[26px] md:min-h-[680px]">
                <img class="h-[42px] object-contain mix-blend-lighten" :src="withBase('/logo.png')" alt="WIN100%">
                <div>
                  <p class="m-0 text-primary text-body font-extrabold tracking-[0.22em] uppercase">Special Offer</p>
                  <h3 class="text-gradient-primary mt-2 text-[36px] md:text-[50px] font-extrabold leading-[1.08] tracking-normal">{{ detail.headline }}</h3>
                  <p class="mt-3 text-ink text-[19px] md:text-[22px] font-extrabold">{{ detail.title }}</p>
                </div>
                <div class="mt-0.5 grid w-full grid-cols-1 gap-[22px] md:grid-cols-2 md:gap-[18px]">
                  <div class="relative rounded-lg border border-primary/[0.24] bg-surface-deep px-[18px] pt-7 pb-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div class="absolute -top-[15px] left-1/2 flex h-7 w-[34px] -translate-x-1/2 items-center justify-center rounded-full bg-g-primary text-surface-deep text-body font-extrabold shadow-[0_8px_18px_rgba(0,0,0,0.28)]">1</div>
                    <h4 class="mb-2.5 text-primary-soft text-[19px] font-extrabold">{{ detail.primary }}</h4>
                    <strong class="block text-ink text-display leading-none">{{ detail.primaryRate }}</strong>
                    <span class="block mt-2.5 text-ink-3 text-body font-bold">Max reward / rollover applies</span>
                  </div>
                  <div class="relative rounded-lg border border-primary/[0.24] bg-surface-deep px-[18px] pt-7 pb-[22px] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                    <div class="absolute -top-[15px] left-1/2 flex h-7 w-[34px] -translate-x-1/2 items-center justify-center rounded-full bg-g-primary text-surface-deep text-body font-extrabold shadow-[0_8px_18px_rgba(0,0,0,0.28)]">2</div>
                    <h4 class="mb-2.5 text-primary-soft text-[19px] font-extrabold">{{ detail.secondary }}</h4>
                    <strong class="block text-ink text-display leading-none">{{ detail.secondaryRate }}</strong>
                    <span class="block mt-2.5 text-ink-3 text-body font-bold">Max reward / rollover applies</span>
                  </div>
                </div>
                <div class="w-full m-0 py-[18px] px-5 md:py-[22px] md:px-[26px] rounded-lg border border-primary/[0.18] bg-surface-deep/[0.78] text-left">
                  <h4 class="m-0 mb-3 text-center text-primary-soft text-h2">Promotion Terms</h4>
                  <ol class="m-0 pl-[18px] text-ink-2 text-sm leading-[1.7] md:text-[15px]">
                    <li>Bonus rewards are calculated from eligible deposits and game turnover.</li>
                    <li>Cancelled bets, refunds, cashouts, and invalid results are not included.</li>
                    <li>Members must keep an active balance and meet rollover requirements.</li>
                    <li>Each completed promotion can only be claimed once.</li>
                  </ol>
                </div>
                <button class="w-full max-w-[420px] border-0 rounded-lg bg-g-primary text-on-primary text-[17px] font-extrabold px-[18px] py-3.5 cursor-pointer transition-opacity hover:opacity-[0.88] focus-visible:opacity-[0.88] focus-visible:outline-none" type="button">Claim Promotion</button>
                <p class="m-0 text-ink-3 text-[13px] leading-[1.6]">win100% reserves the right to adjust, pause, or end this promotion at any time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
