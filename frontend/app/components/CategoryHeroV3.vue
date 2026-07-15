<script setup lang="ts">
/**
 * 類別頁 hero 橫幅 v3:精簡版(較矮的高度 + 較小字級),取代 v1 的
 * 大尺寸置中標題,適合不需要巨大 hero 的頁面。吃同一個 title prop/
 * 預設 slot 與 bg-g-hero token,只換版面。
 */
defineProps<{ title?: string }>();
</script>

<template>
  <div class="bg-g-hero py-8 md:py-10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-h1 text-ink md:text-display"><slot>{{ title }}</slot></h1>
    </div>
  </div>
</template>
