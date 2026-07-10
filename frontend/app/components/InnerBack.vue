<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <div id="inner-back">
    <button type="button" @click="router.back()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
      <span>Back</span>
    </button>
  </div>
</template>

<style scoped>
#inner-back{align-self:flex-start;width:100%;padding:0 0 18px}
#inner-back button{display:inline-flex;align-items:center;gap:6px;background:none;border:0;color:#fff;font-size:22px;font-weight:700;cursor:pointer;padding:0}
#inner-back button:hover{color:#98E7D2}
#inner-back svg{width:24px;height:24px}
</style>
