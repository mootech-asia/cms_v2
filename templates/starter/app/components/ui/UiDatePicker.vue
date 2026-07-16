<script setup lang="ts">
/**
 * 統一日期選擇器(PrimeVue DatePicker 包裝)。
 * 外觀由 Win100 preset 集中控制;紀錄頁日期區間查詢用 selection-mode="range"。
 */
const model = defineModel<Date | Date[] | null>()

withDefaults(
  defineProps<{
    placeholder?: string
    dateFormat?: string
    selectionMode?: 'single' | 'range' | 'multiple'
    showIcon?: boolean
    disabled?: boolean
  }>(),
  { dateFormat: 'yy-mm-dd', selectionMode: 'single', showIcon: true },
)
</script>

<template>
  <DatePicker
    v-model="model"
    class="w-full"
    :placeholder="placeholder"
    :date-format="dateFormat"
    :selection-mode="selectionMode"
    :show-icon="showIcon"
    :disabled="disabled"
  />
</template>
