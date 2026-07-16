<script setup lang="ts">
/**
 * 範例區塊:卡片區 v1 — 響應式網格。內容吃 content store 的 promoCards
 * (客戶後台「促銷管理」的編輯對象)。
 */
const { promoCards } = useContentStore();
</script>

<template>
  <section class="w-full bg-surface-deep">
    <div class="container mx-auto px-4 py-6">
      <UiSectionTitle text="Cards" />
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="p in promoCards" :key="p.id"
          class="group cursor-pointer overflow-hidden rounded-xl border border-line-soft bg-surface transition-colors hover:border-primary"
        >
          <div class="flex h-28 items-center justify-center bg-surface-2">
            <span class="text-h1 font-black text-ink-4 transition-colors group-hover:text-primary">{{ p.name.slice(0, 1) }}</span>
          </div>
          <div class="flex items-center justify-between p-4">
            <span class="truncate text-body font-semibold text-ink">{{ p.name }}</span>
            <button type="button" class="btn-primary btn-sm shrink-0">View</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
