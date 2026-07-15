<script setup lang="ts">
/**
 * Promotion 變體 v2:單一 2x2 固定網格(取代 v1 的桌面 grid + 行動版橫向捲動雙重版面),
 * 一份會自動 reflow 的 responsive 區塊。吃同一份 config/mock/home.ts promoCards 內容與皮膚 token。
 */
import { promoCards } from '~/config/mock/home';

const router = useRouter();
function goDetail(id: string) {
  router.push({ path: '/promotion', query: { detail: id } });
}
</script>

<template>
  <section class="py-6 bg-surface">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-ink flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-4 h-4 md:w-5 md:h-5 text-primary">
            <rect x="3" y="8" width="18" height="4" rx="1" />
            <path d="M12 8v13" />
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
          </svg>
          <span class="text-sm md:text-lg">Promotion</span>
        </h2>
        <a class="text-ink-3 hover:text-ink text-xs px-3 py-1.5 border border-line rounded transition-colors" href="/promotion">Show all</a>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="p in promoCards" :key="p.id" class="bg-surface-deep border border-line-soft rounded-xl overflow-hidden hover:border-primary transition-colors cursor-pointer group">
          <div class="relative h-28 overflow-hidden" style="background: linear-gradient(135deg, rgb(9, 29, 20) 0%, rgb(13, 42, 30) 50%, rgb(10, 26, 18) 100%);">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="font-extrabold select-none text-primary" style="font-size: 54px; letter-spacing: 0.12em; opacity: 0.07;">PROMO!</span>
            </div>
            <div class="absolute top-2 right-3 flex flex-col items-end" style="gap: 3px;">
              <div style="width: 26px; height: 26px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.85;" />
              <div style="width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, rgb(152, 231, 210), rgb(109, 213, 189)); opacity: 0.6; margin-right: 10px;" />
              <div style="width: 20px; height: 20px; border-radius: 50%; background: linear-gradient(135deg, rgb(203, 232, 228), rgb(152, 231, 210)); opacity: 0.45; margin-right: 2px;" />
            </div>
            <div class="absolute inset-0 flex flex-col justify-center px-4">
              <p class="text-xs mb-1.5" style="color: rgb(152, 231, 210); letter-spacing: 0.2em;">SPECIAL OFFER</p>
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
  </section>
</template>
