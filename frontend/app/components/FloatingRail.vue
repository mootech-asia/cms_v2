<script setup lang="ts">
// 右側浮動快捷列 (Promo Channel / Live Chat / FAQ) — 對應靜態站 js/widgets.js
// 只在首頁顯示,其餘頁面隱藏
const route = useRoute();
const items = [
  { label: 'Promo Channel', icon: 'logo', to: '/promotion' },
  { label: 'Live Chat', icon: 'send', to: '/support' },
  { label: 'FAQ', icon: 'help', to: '/about?tab=faq' },
];
</script>

<template>
  <div v-if="route.path === '/'" class="qr-rail">
    <NuxtLink v-for="it in items" :key="it.label" class="qr-btn" :to="it.to" :aria-label="it.label">
      <img v-if="it.icon === 'logo'" :src="withBase('/logo.png')" alt="">
      <svg v-else-if="it.icon === 'send'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
      <span class="qr-label">{{ it.label }}</span>
    </NuxtLink>
  </div>
</template>
