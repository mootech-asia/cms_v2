<script setup lang="ts">
/**
 * 皮膚即時切換:<html data-theme> 綁 site store 的 skin,
 * 換膚不需重新整理頁面(/studio 即時預覽的基礎)。
 */
const siteStore = useSiteStore();
useHead({
  htmlAttrs: { 'data-theme': computed(() => siteStore.skin) },
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>
