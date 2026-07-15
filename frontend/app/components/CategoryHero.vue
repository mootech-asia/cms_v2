<script setup lang="ts">
/**
 * 類別頁 hero 橫幅 v1(取代 mini-games/sport/fish/hot-games/slot/promotion
 * 六頁重複貼上的同一段 markup)。變體登錄於 app/config/blocks.ts 的 `category-hero`。
 */
defineProps<{ title?: string }>();
</script>

<template>
  <div class="bg-g-hero py-16 md:py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="mb-4 text-4xl text-ink md:text-7xl"><slot>{{ title }}</slot></h1>
    </div>
  </div>
</template>
