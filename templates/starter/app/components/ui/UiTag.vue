<script setup lang="ts">
/**
 * 狀態膠囊(PrimeVue Tag 包裝)。
 * 樣式唯一來源:.pill-*(main.css);status → class 對應只在這裡做。
 */
const props = withDefaults(
  defineProps<{
    label?: string
    status?: 'ok' | 'warn' | 'bad' | 'neutral'
  }>(),
  { status: 'neutral' },
)

const cls = computed(
  () => ({ ok: 'pill-ok', warn: 'pill-warn', bad: 'pill-bad', neutral: 'pill-neutral' })[props.status],
)
</script>

<template>
  <Tag unstyled :class="cls" :value="label">
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Tag>
</template>
