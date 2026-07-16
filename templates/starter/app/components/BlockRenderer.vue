<script setup lang="ts">
import { BLOCKS, type SectionConfig } from '~/config/blocks';

/**
 * 依 page-config 渲染區塊序列:順序 = 陣列順序,
 * 變體 = BLOCKS[block].variants[variant ?? 'v1'],enabled=false 跳過。
 */
const props = defineProps<{ sections: SectionConfig[] }>();
const resolve = (s: SectionConfig) => BLOCKS[s.block]?.variants[s.variant ?? 'v1'] ?? null;
</script>

<template>
  <template v-for="s in props.sections" :key="s.id">
    <component :is="resolve(s)!" v-if="s.enabled !== false && resolve(s)" v-bind="s.props" />
  </template>
</template>
