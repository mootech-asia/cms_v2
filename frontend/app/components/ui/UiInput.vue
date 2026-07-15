<script setup lang="ts">
/**
 * 統一文字輸入框(PrimeVue InputText 包裝)。
 * 樣式唯一來源:.input-ui / .input-ui-invalid(main.css)。
 */
const model = defineModel<string>()

withDefaults(
  defineProps<{
    placeholder?: string
    type?: string
    disabled?: boolean
    invalid?: boolean
  }>(),
  { type: 'text' },
)
</script>

<template>
  <InputText
    v-model="model"
    unstyled
    class="input-ui"
    :class="{ 'input-ui-invalid': invalid }"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>
