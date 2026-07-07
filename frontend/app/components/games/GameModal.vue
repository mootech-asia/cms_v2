<script setup lang="ts">
import type { GameModalData } from '~/composables/useGamesPage';

defineProps<{ data: GameModalData | null }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <div
    v-if="data"
    style="position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,.72); display: flex; align-items: center; justify-content: center; padding: 16px;"
    @click.self="emit('close')"
  >
    <div style="background: #1a2128; border: 1px solid #2a3441; border-radius: 16px; max-width: 420px; width: 100%; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.5);">
      <div style="position: relative;">
        <img :src="data.src" :alt="data.name" style="width: 100%; height: 200px; object-fit: cover;">
        <button
          style="position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.6); color: #fff; border: 0; cursor: pointer; font-size: 18px; line-height: 1;"
          @click="emit('close')"
        >×</button>
      </div>
      <div style="padding: 20px;">
        <h3 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 4px;">{{ data.name }}</h3>
        <p style="color: #9ca3af; font-size: 13px; margin: 0 0 16px;">{{ data.provider }}</p>
        <button style="width: 100%; padding: 12px; border-radius: 10px; border: 0; cursor: pointer; font-weight: 600; color: #111827; background: linear-gradient(90deg, #CBE8E4, #98E7D2);">Play Now</button>
      </div>
    </div>
  </div>
</template>
