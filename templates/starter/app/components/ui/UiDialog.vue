<script setup lang="ts">
/**
 * 統一彈窗(PrimeVue Dialog 包裝)。
 * 外觀由 Win100 preset 集中控制;槽位:header / default / footer。
 */
const visible = defineModel<boolean>('visible', { default: false })

withDefaults(
  defineProps<{
    header?: string
    width?: string
    modal?: boolean
  }>(),
  { width: '28rem', modal: true },
)
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :header="header"
    :modal="modal"
    :draggable="false"
    :style="{ width, maxWidth: '92vw' }"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
