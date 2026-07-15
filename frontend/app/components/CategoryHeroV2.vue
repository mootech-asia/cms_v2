<script setup lang="ts">
/**
 * 類別頁 hero 橫幅 v2:左靠 + 裝飾圖示徽章(取代 v1 的置中大字),
 * 吃同一個 title prop/預設 slot 與 bg-g-hero token,只換版面。
 */
defineProps<{ title?: string }>();
</script>

<template>
  <div class="bg-g-hero py-16 md:py-20">
    <div class="container mx-auto flex items-center gap-4 px-4">
      <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-line-soft bg-surface/40 md:h-20 md:w-20">
        <AppIcon name="grid" class="h-7 w-7 text-ink md:h-10 md:w-10" />
      </div>
      <h1 class="text-4xl text-ink md:text-7xl"><slot>{{ title }}</slot></h1>
    </div>
  </div>
</template>
