<script setup lang="ts">
/**
 * 會員卡 v2:簡易清單列(取代 v1 的銀行卡擬物卡面),
 * 左邊銀行名+遮罩帳號、右邊持卡人+綁定日期,純 Tailwind token,無裝飾 SVG。
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
  <div class="flex flex-col gap-3 rounded-ui border border-line-soft bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-center gap-3">
      <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-2">
        <AppIcon name="bank" class="h-4 w-4" />
      </span>
      <div>
        <p class="text-note text-ink-3">{{ bank || 'Bank Name' }}</p>
        <p class="text-body font-bold tracking-numeric text-ink">{{ accountTail }}</p>
      </div>
    </div>
    <div class="text-left sm:text-right">
      <p class="text-body font-semibold text-ink-2">{{ holder || 'M＊＊＊＊＊＊＊' }}</p>
      <p class="text-note text-ink-3">Bind Date <b class="text-ink-2">{{ bindDate || '—' }}</b></p>
    </div>
  </div>
</template>
