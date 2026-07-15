<script setup lang="ts">
import { tickerWins } from '~/config/mock/home'
</script>

<template>
  <div class="bg-surface-deep border-y border-line-soft py-2 overflow-hidden">
    <div class="overflow-hidden">
      <div class="flex gap-0 animate-ticker whitespace-nowrap">
        <span v-for="(w, i) in tickerWins" :key="'a-' + i" class="text-xs text-ink-3 px-4 flex-shrink-0">Congratulations&nbsp;<span class="text-primary">{{ w.player }}</span>&nbsp;winning&nbsp;<span class="text-ink">{{ w.amount }}</span>&nbsp;in {{ w.game }}<span class="mx-3 text-line">·</span>
        </span>
        <span v-for="(w, i) in tickerWins" :key="'b-' + i" class="text-xs text-ink-3 px-4 flex-shrink-0">Congratulations&nbsp;<span class="text-primary">{{ w.player }}</span>&nbsp;winning&nbsp;<span class="text-ink">{{ w.amount }}</span>&nbsp;in {{ w.game }}<span class="mx-3 text-line">·</span>
        </span>
      </div>
    </div>
  </div>
</template>
