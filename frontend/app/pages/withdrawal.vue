<script setup lang="ts">
import { computed, ref } from 'vue';

type Mode = 'withdraw' | 'management';
type Method = 'bank' | 'crypto';
const mode = ref<Mode>('withdraw');
const method = ref<Method>('bank');
const accountMethod = ref<Method>('bank');
const withdrawalAmount = ref('');
const withdrawalPassword = ref('');
const walletType = ref('');
const walletAddress = ref('');
const accountNumber = ref('');
const accountPassword = ref('');
const managementWalletType = ref('');
const managementWalletAddress = ref('');
const managementWalletPassword = ref('');

const withdrawReady = computed(() => withdrawalAmount.value.trim() !== '' || withdrawalPassword.value.trim() !== '');
const cryptoWithdrawReady = computed(() => [walletType.value, walletAddress.value, withdrawalAmount.value, withdrawalPassword.value].some(Boolean));
const bankManagementReady = computed(() => accountNumber.value.trim() !== '' || accountPassword.value.trim() !== '');
const cryptoManagementReady = computed(() => [managementWalletType.value, managementWalletAddress.value, managementWalletPassword.value].some(Boolean));
</script>

<template>
  <div class="min-h-screen bg-[#0f1419] overflow-x-hidden">
    <MemberHeader />
    <div class="flex min-h-screen">
      <MemberSidebar />
      <main class="flex-1 min-w-0 p-4 md:p-8 pb-24">
        <h1 class="text-white text-2xl md:text-3xl mb-6 md:mb-8">Withdrawal</h1>
        <div class="mode-tabs">
          <button :class="{ active: mode === 'withdraw' }" @click="mode = 'withdraw'">Withdraw</button>
          <button :class="{ active: mode === 'management' }" @click="mode = 'management'">Account Management</button>
        </div>

        <template v-if="mode === 'withdraw'">
          <div class="payment-tabs">
            <button :class="{ active: method === 'bank' }" @click="method = 'bank'"><AppIcon name="card" /><span>Bank Card</span></button>
            <button :class="{ active: method === 'crypto' }" @click="method = 'crypto'"><AppIcon name="bitcoin" /><span>Crypto Wallet</span></button>
          </div>

          <section v-if="method === 'bank'" class="payment-card">
            <h2 class="section-title">My Bank Accounts</h2>
            <div class="bank-empty">
              <div class="coin"><AppIcon name="card" /></div>
              <strong>Empty Bank Account</strong>
              <button>Add Account</button>
            </div>
            <button class="refresh">↻ <span>Refresh</span></button>
            <div class="wallet-balance">
              <h2>Main Wallet</h2><strong>₩ 0.00</strong>
              <div><span>*Rollover Achieved amount: ₩0.00</span><span>Target amount: ₩0.00</span></div>
            </div>
            <h2 class="section-title mt-8">Withdrawal Amount &amp; Password</h2>
            <div class="form-stack">
              <input v-model="withdrawalAmount" class="field" placeholder="₩ 10,000 ~ ₩ 9,000,000">
              <input v-model="withdrawalPassword" class="field" type="password" placeholder="Transaction Password">
            </div>
            <button class="action" :class="{ ready: withdrawReady }" :disabled="!withdrawReady">Submit</button>
            <NuxtLink class="back" to="/account">Back</NuxtLink>
          </section>

          <section v-else class="payment-card">
            <h2 class="section-title">Crypto Wallet</h2>
            <div class="wallet-empty"><div class="coin">₿</div><span>Empty wallet list</span><button>+ Add wallet</button></div>
            <div class="balance-grid"><span>Central Wallet:</span><strong>0.00</strong><span>Available Amount:</span><strong>0.00</strong></div>
            <h2 class="section-title mt-8">Withdrawal Amount &amp; Password</h2>
            <div class="form-grid">
              <label>Wallet type:</label><select v-model="walletType" class="field"><option value="">Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input v-model="walletAddress" class="field" placeholder="Please fill in wallet address">
              <label>Withdrawal Amount:</label><input v-model="withdrawalAmount" class="field" placeholder="100,000 ~ 20,000,000">
              <label>Transaction Password:</label><input v-model="withdrawalPassword" class="field" type="password" placeholder="Please fill in the transaction password">
            </div>
            <button class="action" :class="{ ready: cryptoWithdrawReady }" :disabled="!cryptoWithdrawReady">Submit</button>
            <button class="back" @click="method = 'bank'">Back</button>
          </section>
        </template>

        <section v-else class="payment-card">
          <div class="payment-tabs inner">
            <button :class="{ active: accountMethod === 'bank' }" @click="accountMethod = 'bank'"><AppIcon name="card" /><span>Bank Account</span></button>
            <button :class="{ active: accountMethod === 'crypto' }" @click="accountMethod = 'crypto'"><AppIcon name="bitcoin" /><span>Crypto Wallet</span></button>
          </div>

          <template v-if="accountMethod === 'bank'">
            <div class="account-summary">
              <h2 class="section-title">Registered Withdrawal Accounts <span>(1/5)</span></h2>
              <div class="registered-card"><div class="bank-logo">신한은행</div><div><strong>Shinhan Bank</strong><span>********5123</span><span>2025-01-08 21:22:25</span></div></div>
            </div>
            <div class="form-grid">
              <label>Select Bank:</label><select class="field"><option>Please Select a Bank</option><option>Shinhan Bank</option></select>
              <label>Name on Card:</label><input class="field" value="T***" disabled>
              <label>Account Number:</label><input v-model="accountNumber" class="field" placeholder="Please Enter Account/Card/Phone number">
              <label>Transaction Password:</label><input v-model="accountPassword" class="field" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="action" :class="{ ready: bankManagementReady }" :disabled="!bankManagementReady">Submit</button>
          </template>

          <template v-else>
            <div class="account-summary">
              <h2 class="section-title">Bound wallet <span>(0/1)</span></h2>
              <div class="bound-wallet"><div class="coin">₿</div><span>Empty wallet list</span></div>
            </div>
            <div class="form-grid">
              <label>Wallet type:</label><select v-model="managementWalletType" class="field"><option value="">Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input v-model="managementWalletAddress" class="field" placeholder="Please fill in wallet address">
              <label>Transaction Password:</label><input v-model="managementWalletPassword" class="field" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="action" :class="{ ready: cryptoManagementReady }" :disabled="!cryptoManagementReady">Submit</button>
          </template>
          <button class="back" @click="mode = 'withdraw'">Back</button>
        </section>
      </main>
    </div>
    <MobileBottomNav />
  </div>
</template>

<style scoped>
.mode-tabs{display:flex;gap:32px;width:100%;max-width:56rem;margin:0 auto 24px;border-bottom:1px solid #263241}.mode-tabs button{position:relative;padding:0 0 12px;background:none;border:0;color:#9ca3af;font-weight:600}.mode-tabs button.active{color:#98e7d2}.mode-tabs button.active:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:99px;background:#98e7d2}.payment-tabs{display:flex;gap:12px;width:100%;max-width:56rem;margin:0 auto 24px}.payment-tabs.inner{margin:0 0 24px}.payment-tabs button{display:flex;align-items:center;justify-content:center;gap:10px;min-width:170px;padding:12px 18px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;font-weight:600}.payment-tabs svg{width:22px;height:22px}.payment-tabs button.active{border-color:#98e7d2;background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622}.payment-card{width:100%;max-width:56rem;margin:0 auto;padding:32px;background:#1a2128;border:1px solid #1f2937;border-radius:10px}.section-title{display:flex;align-items:center;gap:8px;padding-left:12px;border-left:4px solid #aae5d3;color:#aae5d3;font-size:20px;font-weight:600}.section-title span{color:#d1d5db}.bank-empty{position:relative;display:flex;min-height:260px;margin-top:24px;flex-direction:column;align-items:center;justify-content:center;gap:16px;overflow:hidden;border-radius:10px;background:linear-gradient(105deg,#163f34,#0f2a23 35%,#0a0e12)}.bank-empty:after{content:"";position:absolute;inset:55% -5% -30%;border-top:1px solid rgba(190,245,225,.32);border-radius:50%;background:rgba(152,231,210,.08)}.bank-empty>*{position:relative;z-index:1}.coin{display:grid;place-items:center;width:72px;height:72px;border-radius:50%;background:#222d39;color:#7d8797;font-size:32px}.coin svg{width:36px;height:36px}.bank-empty button,.wallet-empty button{padding:10px 20px;border:0;border-radius:10px;background:#313e40;color:#aae5d3;font-weight:600}.refresh{margin-top:16px;background:none;border:0;color:#9ca3af}.wallet-balance{text-align:center;color:white}.wallet-balance h2{margin-top:28px;font-size:20px}.wallet-balance>strong{display:block;margin:14px 0;font-size:36px}.wallet-balance div{display:flex;justify-content:center;gap:32px;color:#fb7185;font-size:14px}.form-stack{display:grid;gap:16px;margin-top:24px}.field{width:100%;min-height:50px;padding:12px 16px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;outline:none}.field:focus{border-color:#98e7d2}.wallet-empty,.bound-wallet{display:flex;min-height:220px;margin-top:24px;flex-direction:column;align-items:center;justify-content:center;gap:16px;border:1px dashed #374151;border-radius:10px;background:#101821;color:#9ca3af}.balance-grid{display:grid;grid-template-columns:190px 1fr;gap:12px;margin-top:24px;color:#d1d5db}.balance-grid strong{color:#98e7d2;font-size:20px}.form-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center;color:#d1d5db}.account-summary{margin-bottom:32px}.registered-card{display:flex;align-items:center;gap:16px;width:100%;height:140px;margin-top:24px;padding:24px;border:1px solid #3d655c;border-radius:10px;background:#203432;color:#d1d5db}.registered-card .bank-logo{display:grid;place-items:center;width:80px;height:56px;border-radius:10px;background:#dbeafe;color:#0f172a;font-weight:700}.registered-card div:last-child{display:flex;flex-direction:column;gap:4px}.registered-card strong{color:white}.registered-card span{color:#9ca3af;font-size:14px}.bound-wallet{height:140px;min-height:140px;margin-top:24px;border-style:solid}.bound-wallet .coin{width:60px;height:60px}.action,.back{display:flex;align-items:center;justify-content:center;width:100%;height:56px;margin-top:24px;border-radius:10px;font-weight:600}.action{border:0;background:#4b5563;color:white;cursor:not-allowed}.action.ready{background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622;cursor:pointer}.back{border:1px solid #374151;background:#0f1419;color:white;text-decoration:none}.back:hover{border-color:#4b5563}@media(max-width:700px){.mode-tabs{gap:24px;margin-bottom:16px}.mode-tabs button{font-size:14px}.payment-tabs{gap:8px;margin-bottom:16px}.payment-tabs button{flex:1;min-width:0;padding:10px 12px;font-size:14px}.payment-card{padding:16px}.section-title{font-size:17px}.bank-empty{min-height:220px}.wallet-balance>strong{font-size:28px}.wallet-balance div{flex-direction:column;gap:4px}.form-grid,.balance-grid{grid-template-columns:1fr;gap:8px}.form-grid label{margin-top:8px;font-size:14px}.field{min-height:48px;font-size:14px}.registered-card,.bound-wallet{height:140px;padding:16px}.registered-card .bank-logo{width:72px}.action,.back{height:48px;font-size:14px}}
</style>
