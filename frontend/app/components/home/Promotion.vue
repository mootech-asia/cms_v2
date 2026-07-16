<script setup lang="ts">
const { promoCards } = useContentStore();

// Detail → promotion 詳情頁(id 對應 js/promotion-detail.js 的 PROMOS)
const router = useRouter();
function goDetail(id: string) {
  router.push({ path: '/promotion', query: { detail: id } });
}
</script>

<template>
<section class="py-6 bg-surface">
<div class="container mx-auto px-4">
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-2 md:gap-4">
<h2 class="text-ink flex items-center gap-1.5">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-4 h-4 md:w-5 md:h-5 text-primary">
<rect x="3" y="8" width="18" height="4" rx="1">
</rect>
<path d="M12 8v13">
</path>
<path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7">
</path>
<path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5">
</path>
</svg>
<span class="text-sm md:text-lg">Promotion</span>
</h2>
</div>
<div class="flex items-center gap-1 md:gap-2">
<a class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors" :href="withBase('/promotion')">Show all</a>
<button class="text-ink-3 hover:text-ink p-1 md:p-1.5 border border-line rounded transition-colors">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left w-3 h-3 md:w-4 md:h-4">
<path d="m15 18-6-6 6-6">
</path>
</svg>
</button>
<button class="text-ink-3 hover:text-ink p-1 md:p-1.5 border border-line rounded transition-colors">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right w-3 h-3 md:w-4 md:h-4">
<path d="m9 18 6-6-6-6">
</path>
</svg>
</button>
</div>
</div>
<div class="hidden md:grid md:grid-cols-4 gap-3">
<div v-for="p in promoCards" :key="p.id" class="bg-surface-deep border border-line-soft rounded-xl overflow-hidden hover:border-primary transition-colors cursor-pointer group">
<div class="promo-card-art relative h-28 overflow-hidden">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-extrabold select-none text-primary" style="font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div class="promo-card-art-dot" style="width: 26px; height: 26px; opacity: 0.85;">
</div>
<div class="promo-card-art-dot-mid" style="width: 16px; height: 16px; opacity: 0.6; margin-right: 10px;">
</div>
<div class="promo-card-art-dot" style="width: 20px; height: 20px; opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5 text-primary" style="letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-gradient-primary text-2xl font-extrabold tracking-wide2">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-ink text-sm mb-3 text-center">{{ p.name }}</h3>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-on-primary transition-opacity hover:opacity-90 flex items-center justify-center bg-g-primary" @click="goDetail(p.id)">Detail</button>
</div>
</div>
</div>
</div>
<div class="flex md:hidden overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide pb-2">
<div v-for="p in promoCards" :key="p.id" class="flex-shrink-0 snap-start" style="width: 220px;">
<div class="bg-surface-deep border border-line-soft rounded-xl overflow-hidden hover:border-primary transition-colors cursor-pointer group">
<div class="promo-card-art relative h-28 overflow-hidden">
<div class="absolute inset-0 flex items-center justify-center">
<span class="font-extrabold select-none text-primary" style="font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
</div>
<div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
<div class="promo-card-art-dot" style="width: 26px; height: 26px; opacity: 0.85;">
</div>
<div class="promo-card-art-dot-mid" style="width: 16px; height: 16px; opacity: 0.6; margin-right: 10px;">
</div>
<div class="promo-card-art-dot" style="width: 20px; height: 20px; opacity: 0.45; margin-right: 2px;">
</div>
</div>
<div class="absolute inset-0 flex flex-col justify-center px-4">
<p class="text-xs mb-1.5 text-primary" style="letter-spacing: 0.2em;">SPECIAL OFFER</p>
<p class="text-gradient-primary text-2xl font-extrabold tracking-wide2">PROMOTION</p>
</div>
</div>
<div class="p-4">
<h3 class="text-ink text-sm mb-3 text-center">{{ p.name }}</h3>
<div class="space-y-2">
<button class="w-full px-3 py-2 rounded-lg text-xs text-on-primary transition-opacity hover:opacity-90 flex items-center justify-center bg-g-primary" @click="goDetail(p.id)">Detail</button>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
</template>
