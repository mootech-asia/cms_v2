<script setup lang="ts">
/**
 * 卡片容器。樣式唯一來源:.card-ui(main.css)。
 * title 給字串或用 #title 槽;padded=false 時內容自行控 padding。
 */
withDefaults(
  defineProps<{
    title?: string
    padded?: boolean
  }>(),
  { padded: true },
)
</script>

<template>
  <div class="card-ui" :class="{ 'p-5': padded }">
    <UiSectionTitle v-if="title || $slots.title" class="mb-4">
      <slot name="title">{{ title }}</slot>
    </UiSectionTitle>
    <slot />
  </div>
</template>
