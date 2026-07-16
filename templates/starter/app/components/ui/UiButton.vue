<script setup lang="ts">
/**
 * 統一按鈕(PrimeVue Button 包裝)。
 * 樣式唯一來源:assets/css/main.css @layer components 的 .btn-*;
 * 此處只做 variant/size → class 的對應,禁止在使用端另寫按鈕樣式。
 */
const props = withDefaults(
  defineProps<{
    label?: string
    variant?: 'primary' | 'ghost' | 'back'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const cls = computed(() => [
  { primary: 'btn-primary', ghost: 'btn-ghost', back: 'btn-back' }[props.variant],
  /* back 變體自帶固定尺寸(h-10 膠囊),不吃 size */
  props.variant === 'back' ? '' : { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' }[props.size],
])
</script>

<template>
  <Button
    unstyled
    :class="cls"
    :label="label"
    :type="type"
    :loading="loading"
    :disabled="disabled"
    :pt="{ loadingIcon: { class: 'mr-2 h-4 w-4 animate-spin' } }"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </Button>
</template>
