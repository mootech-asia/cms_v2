<script setup lang="ts">
/**
 * mint 左槓區塊標題。樣式唯一來源:.section-title(main.css)。
 * 全站所有「左側 4px 薄荷槓 + 標題」一律用本元件,禁止自寫。
 */
withDefaults(
  defineProps<{
    text?: string
    tag?: string
  }>(),
  { tag: 'h2' },
)
</script>

<template>
  <component :is="tag" class="section-title">
    <slot>{{ text }}</slot>
  </component>
</template>
