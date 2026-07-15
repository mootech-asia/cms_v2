<script setup lang="ts">
/**
 * Promotion 變體 v3:精簡橫向列表(取代 v1 的大型裝飾浮水印卡片),
 * 每列 icon/徽章 + 名稱 + View CTA,直向堆疊,適合側欄或折疊線以下的密集版位。
 * 吃同一份 config/mock/home.ts promoCards 內容與皮膚 token。
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
      <div class="flex flex-col divide-y divide-line-soft border border-line-soft rounded-xl overflow-hidden">
        <div
          v-for="p in promoCards" :key="p.id"
          class="flex items-center gap-3 px-4 py-3 bg-surface-deep hover:bg-surface-2 transition-colors cursor-pointer"
          @click="goDetail(p.id)"
        >
          <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-g-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift w-4 h-4 text-on-primary">
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-ink text-sm truncate">{{ p.name }}</p>
            <p class="text-ink-4 text-[11px] tracking-wide2">SPECIAL OFFER</p>
          </div>
          <button
            type="button"
            class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs text-on-primary transition-opacity hover:opacity-90 bg-g-primary"
            @click.stop="goDetail(p.id)"
          >View</button>
        </div>
      </div>
    </div>
  </section>
</template>
