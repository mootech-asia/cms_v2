<script setup lang="ts">
/**
 * 會員卡 v1(取代 withdrawal.vue 內嵌的 .bound-card 銀行卡擬物卡面)。
 * 純展示,綁定帳戶清單/上下切換邏輯留在呼叫端(withdrawal.vue)。
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
  <div class="bound-card relative overflow-hidden rounded-2xl">
    <svg class="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 1200 320" preserveAspectRatio="none" fill="none">
      <path d="M0,232 C380,162 780,300 1200,92" stroke="rgba(190,245,225,0.18)" stroke-width="1.2" />
      <path d="M0,275 C380,205 740,330 1200,120" stroke="rgba(190,245,225,0.10)" stroke-width="1.2" />
    </svg>
    <div class="relative bound-inner">
      <div class="bound-pill">{{ bank || 'Bank Name' }}</div>
      <div class="bound-num"><p class="bn-label">Account number</p><p class="bn-value">{{ accountTail }}</p></div>
      <div class="bound-foot"><span class="bound-name">{{ holder || 'M＊＊＊＊＊＊＊' }}</span><span class="bound-date">Bind Date<br><b>{{ bindDate || '—' }}</b></span></div>
    </div>
  </div>
</template>
