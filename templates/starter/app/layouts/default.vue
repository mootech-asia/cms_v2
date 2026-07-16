<script setup lang="ts">
import { BLOCKS } from '~/config/blocks';

/** chrome(header/footer)變體由 site store 驅動,設計後台(/studio)可切換 */
const siteStore = useSiteStore();
const headerComp = computed(() => BLOCKS['site-header'].variants[siteStore.chrome.header] ?? BLOCKS['site-header'].variants.v1);
const footerComp = computed(() => BLOCKS['site-footer'].variants[siteStore.chrome.footer] ?? BLOCKS['site-footer'].variants.v1);
</script>

<template>
  <div class="min-h-screen overflow-x-hidden bg-surface-deep">
    <component :is="headerComp" />
    <slot />
    <component :is="footerComp" />
  </div>
</template>
