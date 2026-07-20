<script setup lang="ts">
// 登入/註冊/忘記密碼 Modal — 對齊靜態版 js/auth.js(結構、文案、驗證一致)
import { computed, onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue';

const { mode, close, submit } = useAuth();

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));

const { t } = useLocale();
const title = computed(() => t(`auth.title.${mode.value || 'login'}`));

type FieldName = 'username' | 'password' | 'confirm' | 'email' | 'realname' | 'mobile';
const FIELDS: Record<string, { name: FieldName; label: string; type: string; placeholder: string; eye?: boolean }[]> = {
  login: [
    { name: 'username', label: 'auth.label.username', type: 'text', placeholder: 'auth.ph.username' },
    { name: 'password', label: 'auth.label.password', type: 'password', placeholder: 'auth.ph.password', eye: true },
  ],
  register: [
    { name: 'username', label: 'auth.label.username', type: 'text', placeholder: 'auth.ph.username' },
    { name: 'password', label: 'auth.label.password', type: 'password', placeholder: 'auth.ph.password', eye: true },
    { name: 'confirm', label: 'auth.label.confirm', type: 'password', placeholder: 'auth.ph.confirm', eye: true },
    { name: 'email', label: 'auth.label.email', type: 'email', placeholder: 'auth.ph.email' },
    { name: 'realname', label: 'auth.label.realname', type: 'text', placeholder: 'auth.ph.realname' },
    { name: 'mobile', label: 'auth.label.mobile', type: 'tel', placeholder: 'auth.ph.mobile' },
  ],
  forgot: [
    { name: 'username', label: 'auth.label.username', type: 'text', placeholder: 'auth.ph.username' },
    { name: 'email', label: 'auth.label.email', type: 'email', placeholder: 'auth.ph.email' },
  ],
};
const fields = computed(() => FIELDS[mode.value || 'login'] || FIELDS.login!);

const values = reactive<Record<FieldName, string>>({ username: '', password: '', confirm: '', email: '', realname: '', mobile: '' });
const errors = reactive<Partial<Record<FieldName, string>>>({});
const shown = reactive<Partial<Record<FieldName, boolean>>>({});
const resetSent = ref(false);

watch(mode, () => {
  (Object.keys(values) as FieldName[]).forEach((k) => { values[k] = ''; });
  clearErrors();
  Object.keys(shown).forEach((k) => { shown[k as FieldName] = false; });
  resetSent.value = false;
});

function clearErrors() {
  (Object.keys(errors) as FieldName[]).forEach((k) => { delete errors[k]; });
}

function fieldError(name: FieldName): string {
  const raw = values[name];
  const v = raw.trim();
  switch (name) {
    case 'username':
      if (!v) return 'auth.err.username';
      if (v.length < 3 || v.length > 16) return 'auth.err.usernameLen';
      return '';
    case 'password':
      if (raw.length < 5 || raw.length > 16) return 'auth.err.passwordLen';
      return '';
    case 'confirm':
      if (raw !== values.password) return 'auth.err.confirm';
      return '';
    case 'email':
      if (!/^\S+@\S+\.\S+$/.test(v)) return 'auth.err.email';
      return '';
    case 'realname':
      if (!v) return 'auth.err.realname';
      return '';
    case 'mobile':
      if (!/^\+?[0-9][0-9 -]{6,14}$/.test(v)) return 'auth.err.mobile';
      return '';
  }
}

function onSubmit() {
  // 開發階段登入不驗證帳號密碼，按下 Login 即進入已登入狀態。
  if (mode.value === 'login') {
    clearErrors();
    submit();
    return;
  }

  clearErrors();
  let ok = true;
  for (const f of fields.value) {
    const msg = fieldError(f.name);
    if (msg) { errors[f.name] = msg; ok = false; }
  }
  if (!ok) return;
  if (mode.value === 'forgot') { resetSent.value = true; return; }
  submit();
}

function goto(m: 'login' | 'register' | 'forgot') {
  mode.value = m;
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="mode"
      class="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-scrim/70 px-4 py-6"
      @click.self="close"
    >
      <div class="relative m-auto w-full max-w-[400px] rounded-2xl border border-line-soft bg-surface shadow-2xl">
        <div class="flex items-center justify-between border-b border-line-soft px-[22px] py-[18px]">
          <h3 class="m-0 text-lg font-bold text-ink">{{ title }}</h3>
          <button class="border-0 bg-transparent p-0 text-[22px] leading-none text-ink-3" @click="close">×</button>
        </div>
        <div class="p-[22px]">
          <!-- 忘記密碼:送出後狀態 -->
          <template v-if="resetSent">
            <p class="mb-1.5 mt-2 text-center text-[15px] font-semibold text-primary">{{ t('auth.resetSentTitle') }}</p>
            <p class="mb-5 text-center text-body text-ink-3">{{ t('auth.resetSentBody') }}</p>
            <button class="a-btn" type="button" @click="goto('login')">{{ t('auth.backToLogin') }}</button>
          </template>

          <template v-else>
            <p v-if="mode === 'forgot'" class="mb-5 text-body text-ink-3">{{ t('auth.forgotHint') }}</p>

            <template v-for="f in fields" :key="f.name">
              <label class="mb-2 block text-body font-semibold text-ink-2">{{ t(f.label) }}</label>
              <div class="relative mb-4">
                <input
                  v-model="values[f.name]"
                  :type="f.eye && shown[f.name] ? 'text' : f.type"
                  :placeholder="t(f.placeholder)"
                  class="a-input"
                  :class="[f.eye ? 'pr-11' : '', errors[f.name] ? 'input-ui-invalid' : '']"
                >
                <button
                  v-if="f.eye" type="button"
                  class="absolute right-3 top-1/2 flex -translate-y-1/2 border-0 bg-transparent p-0"
                  :class="shown[f.name] ? 'text-primary' : 'text-ink-3'"
                  @click="shown[f.name] = !shown[f.name]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <p v-if="errors[f.name]" class="-mt-2.5 mb-3 text-note text-danger">{{ t(errors[f.name]!) }}</p>
            </template>

            <div v-if="mode === 'login'" class="-mt-0.5 mb-[18px] flex items-center justify-between text-body">
              <label class="flex cursor-pointer items-center gap-2 text-ink-3"><input type="checkbox" class="accent-primary">{{ t('auth.remember') }}</label>
              <a class="a-link font-semibold" @click="goto('forgot')">{{ t('auth.forgotLink') }}</a>
            </div>

            <button class="a-btn" type="button" @click="onSubmit">{{ t(`auth.submit.${mode || 'login'}`) }}</button>

            <p v-if="mode === 'login'" class="mb-0.5 mt-4 text-center text-body text-ink-3">{{ t('auth.noAccount') }} <a class="a-link" @click="goto('register')">{{ t('auth.registerLink') }}</a></p>
            <p v-else-if="mode === 'register'" class="mb-0.5 mt-4 text-center text-body text-ink-3">{{ t('auth.hasAccount') }} <a class="a-link" @click="goto('login')">{{ t('auth.loginLink') }}</a></p>
            <p v-else class="mb-0.5 mt-4 text-center text-body text-ink-3">Remember your password? <a class="a-link" @click="goto('login')">Back to Login</a></p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>
