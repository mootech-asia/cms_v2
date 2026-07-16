<script setup lang="ts">
/**
 * 範例區塊:卡片區 v2 — 精簡直列(側欄/摺下密度用)。同內容同皮膚,只換版面。
 */
const { promoCards } = useContentStore();
</script>

<template>
  <section class="w-full bg-surface-deep">
    <div class="container mx-auto px-4 py-6">
      <UiSectionTitle text="Cards" />
      <ul class="mt-4 space-y-2">
        <li
          v-for="p in promoCards" :key="p.id"
          class="flex cursor-pointer items-center gap-3 rounded-ui border border-line-soft bg-surface px-4 py-3 transition-colors hover:border-primary"
        >
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-body font-black text-ink-3">{{ p.name.slice(0, 1) }}</span>
          <span class="min-w-0 flex-1 truncate text-body font-semibold text-ink">{{ p.name }}</span>
          <button type="button" class="btn-primary btn-sm shrink-0">View</button>
        </li>
      </ul>
    </div>
  </section>
</template>
