<script setup lang="ts">
/**
 * 統一下拉選單(PrimeVue Select 包裝)。
 * 外觀由 nuxt.config 的 Win100 preset 集中控制(規範 1-B.4),
 * 使用端不得覆寫顏色。
 */
const model = defineModel<unknown>()

defineProps<{
  options: unknown[]
  optionLabel?: string
  optionValue?: string
  placeholder?: string
  disabled?: boolean
}>()
</script>

<template>
  <Select
    v-model="model"
    class="w-full"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
