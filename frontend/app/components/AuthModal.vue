<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue';

const { mode, close, submit } = useAuth();

const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));
const isReg = computed(() => mode.value === 'register');

const inp =
  'width:100%;box-sizing:border-box;background:#0f1419;border:1px solid #374151;border-radius:8px;padding:10px 14px;color:#fff;margin-bottom:14px;outline:none';
</script>

<template>
  <Teleport to="body">
    <div
      v-if="mode"
      style="position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:16px"
      @click.self="close"
    >
      <div style="background:#1a2128;border:1px solid #2a3441;border-radius:16px;max-width:380px;width:100%;padding:24px;position:relative;box-shadow:0 20px 60px rgba(0,0,0,.5)">
        <button
          style="position:absolute;top:14px;right:14px;width:30px;height:30px;border-radius:50%;background:#0f1419;color:#fff;border:0;cursor:pointer;font-size:16px"
          @click="close"
        >×</button>
        <h3 style="color:#fff;font-size:18px;font-weight:700;margin:0 0 18px">Welcome to WIN100%</h3>
        <div>
          <div style="display:flex;border-bottom:1px solid #2a3441;margin-bottom:20px">
            <button
              :style="`flex:1;padding:12px;background:none;border:0;cursor:pointer;font-weight:600;font-size:15px;color:${isReg ? '#9ca3af' : '#98E7D2'};border-bottom:2px solid ${isReg ? 'transparent' : '#98E7D2'}`"
              @click="mode = 'login'"
            >Login</button>
            <button
              :style="`flex:1;padding:12px;background:none;border:0;cursor:pointer;font-weight:600;font-size:15px;color:${isReg ? '#98E7D2' : '#9ca3af'};border-bottom:2px solid ${isReg ? '#98E7D2' : 'transparent'}`"
              @click="mode = 'register'"
            >Register</button>
          </div>
          <label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Username</label>
          <input type="text" placeholder="Enter your username" :style="inp">
          <label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Password</label>
          <input type="password" placeholder="Enter your password" :style="inp">
          <template v-if="isReg">
            <label style="display:block;color:#9ca3af;font-size:13px;margin-bottom:6px">Confirm Password</label>
            <input type="password" placeholder="Re-enter password" :style="inp">
          </template>
          <div v-else style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;font-size:13px">
            <label style="color:#9ca3af;display:flex;align-items:center;gap:6px"><input type="checkbox">Remember me</label>
            <a style="color:#98E7D2;cursor:pointer">Forgot Password?</a>
          </div>
          <button
            style="width:100%;padding:12px;border:0;border-radius:10px;cursor:pointer;font-weight:700;color:#111827;background:linear-gradient(90deg,#CBE8E4,#98E7D2)"
            @click="submit"
          >{{ isReg ? 'Register Now' : 'Login' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
