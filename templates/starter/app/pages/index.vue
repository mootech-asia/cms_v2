<script setup lang="ts">
/** 頁面 = 設定檔驅動渲染:區塊/變體/順序/開關都在 site store(後台可調),不寫死 */
const site = useSiteStore();
</script>

<template>
  <div>
    <BlockRenderer :sections="site.sectionsFor('home')" />
  </div>
</template>
