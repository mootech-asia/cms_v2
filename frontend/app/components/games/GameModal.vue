<script setup lang="ts">
import type { GameModalData } from '~/composables/useGamesPage';

defineProps<{ data: GameModalData | null }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <div
    v-if="data"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-[420px] overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-[0_20px_60px_rgba(0,0,0,.5)]">
      <div class="relative">
        <img :src="data.src" :alt="data.name" class="h-[200px] w-full object-cover">
        <button
          class="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border-0 bg-black/60 text-lg leading-none text-ink"
          @click="emit('close')"
        >×</button>
      </div>
      <div class="p-5">
        <h3 class="m-0 mb-1 text-h2 font-bold text-ink">{{ data.name }}</h3>
        <p class="m-0 mb-4 text-note text-ink-3">{{ data.provider }}</p>
        <button type="button" class="btn-primary btn-md w-full">Play Now</button>
      </div>
    </div>
  </div>
</template>
