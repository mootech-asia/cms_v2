<script setup lang="ts">
/**
 * 會員卡 v3:精簡 chip 版(取代 v1 的銀行卡擬物卡面),單行顯示
 * 「銀行名 •••• 末四碼」,適合下拉選單/側欄等窄空間;
 * holder/bindDate 有值才顯示第二行,缺值時不報錯、直接省略。
 * 變體登錄於 app/config/blocks.ts 的 `member-card`。
 */
defineProps<{
  bank?: string;
  accountTail: string;
  holder?: string;
  bindDate?: string;
}>();
</script>

<template>
  <div class="inline-flex max-w-full flex-col gap-0.5 rounded-full border border-line-soft bg-surface-2 px-4 py-2">
    <span class="flex items-center gap-1.5 text-note font-semibold text-ink">
      <AppIcon name="bank" class="h-3.5 w-3.5 text-ink-3" />
      <span class="truncate">{{ bank || 'Bank' }} •••• {{ accountTail }}</span>
    </span>
    <span v-if="holder || bindDate" class="truncate text-micro text-ink-3">
      <template v-if="holder">{{ holder }}</template>
      <template v-if="holder && bindDate"> · </template>
      <template v-if="bindDate">{{ bindDate }}</template>
    </span>
  </div>
</template>
