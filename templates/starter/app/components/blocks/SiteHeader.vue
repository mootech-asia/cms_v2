<script setup lang="ts">
/**
 * 全站 chrome:頂部導覽(骨架佔位)。起新模板時替換品牌與導覽項,
 * 主要模板的 header 也應做 3 變體(參考 WIN100 的 AppHeaderV2/V3)。
 */
const nav = [
  { label: 'Home', to: '/' },
  { label: 'UI Kit', to: '/ui-kit' },
];
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-line-soft bg-surface">
    <div class="container mx-auto flex h-14 items-center justify-between px-4">
      <NuxtLink to="/" class="text-h2 font-black tracking-wide2 text-gradient-primary">BRAND</NuxtLink>
      <nav class="flex items-center gap-4">
        <NuxtLink
          v-for="n in nav" :key="n.to" :to="n.to"
          class="text-body text-ink-3 transition-colors hover:text-ink"
        >{{ n.label }}</NuxtLink>
        <button type="button" class="btn-primary btn-sm">Sign In</button>
      </nav>
    </div>
  </header>
</template>
