<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { computed, ref } from 'vue';

const nickname = useState<string>('member:nickname', () => 'meqomcao');
const draft = ref(nickname.value);
const showSuccess = ref(false);

const normalized = computed(() => draft.value.trim());
const ready = computed(() => (
  normalized.value.length >= 2
  && normalized.value.length <= 20
  && normalized.value !== nickname.value
));

function submit() {
  if (!ready.value) return;
  nickname.value = normalized.value;
  showSuccess.value = true;
}
function closeSuccess() {
  showSuccess.value = false;
  navigateTo('/account');
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl text-ink md:mb-8 md:text-3xl">Change Nickname</h1>
    <div class="mf-card">
      <div class="mf-section"><span>Nickname</span></div>

      <label class="mb-2 block text-sm font-semibold text-ink-2" for="current-nickname">Current Nickname</label>
      <div class="mf-field">
        <input id="current-nickname" class="mf-input plain" :value="nickname" disabled>
      </div>

      <label class="mb-2 block text-sm font-semibold text-ink-2" for="new-nickname">New Nickname</label>
      <div class="mf-field">
        <input
          id="new-nickname"
          v-model="draft"
          class="mf-input plain"
          maxlength="20"
          autocomplete="nickname"
          placeholder="Please enter a new nickname"
          @keyup.enter="submit"
        >
      </div>

      <p class="mf-hint">Use 2-20 characters. The new nickname must be different from the current nickname.</p>
      <button type="button" class="mf-submit" :class="{ ready }" :disabled="!ready" @click="submit">
        <span>Submit</span>
      </button>
    </div>

    <MemberModal
      v-if="showSuccess"
      type="success"
      title="Success!"
      message="Nickname updated successfully."
      @confirm="closeSuccess"
      @cancel="closeSuccess"
    />
  </div>
</template>
