<script setup lang="ts">
// 登入/註冊/忘記密碼 Modal — 對齊靜態版 js/auth.js(結構、文案、驗證一致)
import { computed, onMounted, onBeforeUnmount, reactive, ref, watch } from 'vue';

const { mode, close, submit } = useAuth();

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));

const TITLES: Record<string, string> = { login: 'Login', register: 'Register', forgot: 'Forgot Password' };
const title = computed(() => TITLES[mode.value || 'login'] || 'Login');

type FieldName = 'username' | 'password' | 'confirm' | 'email' | 'realname' | 'mobile';
const FIELDS: Record<string, { name: FieldName; label: string; type: string; placeholder: string; eye?: boolean }[]> = {
  login: [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', eye: true },
  ],
  register: [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', eye: true },
    { name: 'confirm', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password', eye: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { name: 'realname', label: 'Real Name', type: 'text', placeholder: 'Enter your real name' },
    { name: 'mobile', label: 'Mobile Number', type: 'tel', placeholder: 'Enter your mobile number' },
  ],
  forgot: [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
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
      if (!v) return 'Please enter your username.';
      if (v.length < 3 || v.length > 16) return 'Username must be 3-16 characters.';
      return '';
    case 'password':
      if (raw.length < 5 || raw.length > 16) return 'Length must be 5-16 characters.';
      return '';
    case 'confirm':
      if (raw !== values.password) return 'The two passwords do not match.';
      return '';
    case 'email':
      if (!/^\S+@\S+\.\S+$/.test(v)) return 'Please enter a valid email address.';
      return '';
    case 'realname':
      if (!v) return 'Please enter your real name.';
      return '';
    case 'mobile':
      if (!/^\+?[0-9][0-9 -]{6,14}$/.test(v)) return 'Please enter a valid mobile number.';
      return '';
  }
}

function onSubmit() {
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
      style="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:flex-start;justify-content:center;padding:24px 16px;overflow-y:auto"
      @click.self="close"
    >
      <div style="background:#1a2330;border:1px solid #2a3441;border-radius:16px;max-width:400px;width:100%;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.5);margin:auto">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #2a3441">
          <h3 style="color:#fff;font-size:18px;font-weight:700;margin:0">{{ title }}</h3>
          <button style="background:none;border:0;color:#9ca3af;cursor:pointer;font-size:22px;line-height:1;padding:0" @click="close">×</button>
        </div>
        <div style="padding:22px">
          <!-- 忘記密碼:送出後狀態 -->
          <template v-if="resetSent">
            <p style="text-align:center;color:#98E7D2;font-size:15px;font-weight:600;margin:8px 0 6px">Reset link sent</p>
            <p style="text-align:center;color:#9ca3af;font-size:14px;line-height:1.5;margin:0 0 20px">If the account exists, password reset instructions have been sent to your email.</p>
            <button class="a-btn" type="button" @click="goto('login')">Back to Login</button>
          </template>

          <template v-else>
            <p v-if="mode === 'forgot'" style="color:#9ca3af;font-size:14px;line-height:1.5;margin:0 0 20px">Enter your username and email address to receive password reset instructions.</p>

            <template v-for="f in fields" :key="f.name">
              <label class="a-label">{{ f.label }}</label>
              <div style="position:relative;margin-bottom:16px">
                <input
                  v-model="values[f.name]"
                  :type="f.eye && shown[f.name] ? 'text' : f.type"
                  :placeholder="f.placeholder"
                  class="a-input"
                  :style="{ paddingRight: f.eye ? '44px' : undefined, borderColor: errors[f.name] ? '#F87171' : undefined }"
                >
                <button
                  v-if="f.eye" type="button"
                  style="position:absolute;top:50%;right:12px;transform:translateY(-50%);background:none;border:0;cursor:pointer;padding:0;display:flex"
                  :style="{ color: shown[f.name] ? '#98E7D2' : '#9ca3af' }"
                  @click="shown[f.name] = !shown[f.name]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <p v-if="errors[f.name]" style="color:#F87171;font-size:13px;margin:-10px 0 12px">{{ errors[f.name] }}</p>
            </template>

            <div v-if="mode === 'login'" style="display:flex;justify-content:space-between;align-items:center;margin:-2px 0 18px;font-size:14px">
              <label style="color:#9ca3af;display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" style="accent-color:#98E7D2">Remember me</label>
              <a class="a-link" style="font-weight:600" @click="goto('forgot')">Forgot Password?</a>
            </div>

            <button class="a-btn" type="button" @click="onSubmit">{{ mode === 'register' ? 'Next Step' : mode === 'forgot' ? 'Send Reset Link' : 'Login' }}</button>

            <p v-if="mode === 'login'" style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Don't have an account? <a class="a-link" @click="goto('register')">Register</a></p>
            <p v-else-if="mode === 'register'" style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Already have an account? <a class="a-link" @click="goto('login')">Login</a></p>
            <p v-else style="text-align:center;color:#9ca3af;font-size:14px;margin:16px 0 2px">Remember your password? <a class="a-link" @click="goto('login')">Back to Login</a></p>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.a-input{width:100%;box-sizing:border-box;background:#0f1622;border:1px solid #2a3441;border-radius:10px;padding:12px 14px;color:#fff;font-size:14px;outline:none}
.a-label{display:block;color:#d1d5db;font-size:14px;font-weight:600;margin-bottom:8px}
.a-btn{width:100%;padding:13px;border:0;border-radius:10px;cursor:pointer;font-weight:700;font-size:15px;color:#0f1622;background:linear-gradient(90deg,#CBE8E4,#98E7D2);margin-top:4px}
.a-link{color:#98E7D2;font-weight:700;cursor:pointer;text-decoration:none}
</style>
