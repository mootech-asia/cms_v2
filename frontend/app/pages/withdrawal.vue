<script setup lang="ts">
import { computed, ref } from 'vue';

type Mode = 'withdraw' | 'management';
type Method = 'bank' | 'crypto';
const mode = ref<Mode>('withdraw');
const method = ref<Method>('bank');
const accountMethod = ref<Method>('bank');
const withdrawalAmount = ref('');
const withdrawalPassword = ref('');
const showPassword = ref(false);
const walletType = ref('');
const walletAddress = ref('');
const cryptoWithdrawAmount = ref('');
const cryptoWithdrawPassword = ref('');
const selectedBank = ref('');
const accountNumber = ref('');
const accountPassword = ref('');
const managementWalletType = ref('');
const managementWalletAddress = ref('');
const managementWalletPassword = ref('');

const cryptoWithdrawReady = computed(() => [walletType.value, walletAddress.value, cryptoWithdrawAmount.value, cryptoWithdrawPassword.value].some(Boolean));
const bankManagementReady = computed(() => [selectedBank.value, accountNumber.value.trim(), accountPassword.value.trim()].some(Boolean));
const cryptoManagementReady = computed(() => [managementWalletType.value, managementWalletAddress.value, managementWalletPassword.value].some(Boolean));

const modal = ref<{ type: 'success' | 'warning'; message?: string } | null>(null);
function submitWithdraw() {
  if (withdrawalAmount.value.trim() === '') { modal.value = { type: 'warning', message: 'invalid' }; return; }
  modal.value = { type: 'success', message: 'Withdrawal request submitted successfully.' };
}
</script>

<template>
  <div class="min-h-screen bg-[#0f1419] overflow-x-hidden">
    <MemberHeader />
    <div class="flex min-h-screen">
      <MemberSidebar />
      <main class="flex-1 min-w-0 p-4 md:p-8 pb-24">
        <InnerBack />
        <h1 class="text-white text-2xl md:text-3xl mb-6 md:mb-8">Withdrawl</h1>
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
            <div class="mb-6 md:mb-8">
              <div class="accts-head">
                <button type="button" class="accts-nav" aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
                <h2 class="accts-title">My Bank Accounts <span>1 / 5</span></h2>
                <button type="button" class="accts-nav" aria-label="Next"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
              </div>
              <div class="bound-card relative overflow-hidden rounded-2xl">
                <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1200 320" preserveAspectRatio="none" fill="none">
                  <path d="M0,232 C380,162 780,300 1200,92" stroke="rgba(190,245,225,0.18)" stroke-width="1.2" />
                  <path d="M0,275 C380,205 740,330 1200,120" stroke="rgba(190,245,225,0.10)" stroke-width="1.2" />
                </svg>
                <div class="relative bound-inner">
                  <div class="bound-pill">Bank Name</div>
                  <div class="bound-num"><p class="bn-label">Account number</p><p class="bn-value">＊＊＊＊5567</p></div>
                  <div class="bound-foot"><span class="bound-name">M＊＊＊＊＊＊＊</span><span class="bound-date">Bind Date<br><b>2025-09-05</b></span></div>
                </div>
              </div>
              <button class="refresh flex items-center gap-2 mt-4 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
                <span class="text-sm">Refresh</span>
              </button>
            </div>
            <div class="mb-6 md:mb-8">
              <h2 class="text-white text-lg md:text-xl font-semibold mb-4 text-center">Main Wallet</h2>
              <div class="text-center mb-4">
                <p class="text-white text-2xl md:text-4xl font-bold">₩ 0.00</p>
              </div>
              <div class="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-6">
                <div class="text-center">
                  <p class="text-red-400 text-sm">*Rollover Achieved</p>
                  <p class="text-red-400 font-semibold text-sm md:text-base">amount: ₩0.00</p>
                </div>
                <div class="text-center">
                  <p class="text-red-400 text-sm">Target amount:</p>
                  <p class="text-red-400 font-semibold text-sm md:text-base">₩0.00</p>
                </div>
              </div>
              <div class="mb-4">
                <h2 class="section-title">Withdrawal Amount &amp; Password</h2>
              </div>
              <div class="mb-4">
                <input v-model="withdrawalAmount" class="field" type="text" placeholder="₩ 10,000 ~ ₩ 9,000,000">
              </div>
              <div class="mb-4 relative">
                <input v-model="withdrawalPassword" class="field" :type="showPassword ? 'text' : 'password'" placeholder="* * * * * *">
                <button type="button" class="eye absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300" @click="showPassword = !showPassword">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>
              <div class="flex justify-center gap-8 mb-6">
                <div class="text-center">
                  <p class="text-red-400 text-sm">*Rollover Achieved</p>
                  <p class="text-red-400 font-semibold">amount: ₩0.00</p>
                </div>
                <div class="text-center">
                  <p class="text-red-400 text-sm">Target amount:</p>
                  <p class="text-red-400 font-semibold">₩0.00</p>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-3 md:gap-4">
              <button class="submit-ready w-full py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base" @click="submitWithdraw"><span>Submit</span></button>
              <NuxtLink class="back-flat w-full py-3 md:py-4 rounded-lg transition-colors font-semibold text-sm md:text-base" to="/account">Back</NuxtLink>
            </div>
          </section>

          <section v-else class="payment-card">
            <h2 class="section-title">Crypto Wallet</h2>
            <div class="wallet-empty"><div class="coin-empty coin-lg">₿</div><div>Empty wallet list</div><button class="add-wallet"><span style="font-size:20px;line-height:1">+</span>Add wallet</button></div>
            <div class="balance-grid"><span>Central Wallet:</span><strong>0.00</strong><span>Available Amount:</span><strong>0.00</strong></div>
            <h2 class="section-title mt-6">Withdrawal Amount &amp; Password</h2>
            <div class="form-grid mt-6">
              <label>Wallet type:</label><select v-model="walletType" class="field"><option value="">Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input v-model="walletAddress" class="field" placeholder="Please fill in wallet address">
              <label>Withdrawal Amount:</label><input v-model="cryptoWithdrawAmount" class="field" placeholder="100,000 ~ 20,000,000">
              <label>Transaction Password:</label><input v-model="cryptoWithdrawPassword" class="field" type="password" placeholder="Please fill in the transaction password">
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
              <label>Select Bank:</label><select v-model="selectedBank" class="field"><option value="">Please Select a Bank</option><option>Shinhan Bank</option><option>KB Bank</option></select>
              <label>Name on Card:</label><input class="field" value="T***" disabled>
              <label>Account Number:</label><input v-model="accountNumber" class="field" placeholder="Please Enter Account/Card/Phone number">
              <label>Transaction Password:</label><input v-model="accountPassword" class="field" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="action" :class="{ ready: bankManagementReady }" :disabled="!bankManagementReady">Submit</button>
          </template>

          <template v-else>
            <div class="account-summary">
              <h2 class="section-title">Bound wallet <span>(0/1)</span></h2>
              <div class="bound-wallet"><div class="coin-empty coin-md">₿</div><div>Empty wallet list</div></div>
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
    <MemberModal v-if="modal" :type="modal.type" :message="modal.message" @confirm="modal = null" @cancel="modal = null" />
  </div>
</template>

<style scoped>
.mode-tabs{display:flex;gap:32px;width:100%;max-width:56rem;margin:0 auto 24px;border-bottom:1px solid #263241}.mode-tabs button{position:relative;padding:0 0 12px;background:none;border:0;color:#9ca3af;font-weight:600}.mode-tabs button.active{color:#98e7d2}.mode-tabs button.active:after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:3px;border-radius:99px;background:#98e7d2}.payment-tabs{display:flex;gap:12px;width:100%;max-width:56rem;margin:0 auto 24px}.payment-tabs.inner{margin:0 0 24px}.payment-tabs button{display:flex;align-items:center;justify-content:center;gap:10px;min-width:170px;padding:12px 18px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;font-weight:600}.payment-tabs svg{width:22px;height:22px}.payment-tabs button.active{border-color:#98e7d2;background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622}.payment-card{width:100%;max-width:56rem;margin:0 auto;padding:32px;background:#1a2128;border:1px solid #1f2937;border-radius:10px}.section-title{display:flex;align-items:center;gap:8px;padding-left:12px;border-left:4px solid #aae5d3;color:#aae5d3;font-size:20px;font-weight:600}.section-title span{color:#d1d5db}.bank-empty{background:linear-gradient(105deg,rgb(22,63,52) 0%,rgb(15,42,35) 28%,rgb(11,24,21) 55%,rgb(10,14,18) 100%)}.coin-empty{background:rgba(26,33,40,.6)}.add-account{border:0;background:#313e40;color:#aae5d3}.refresh{background:none;border:0;color:#9ca3af}.refresh:hover{color:#fff}.field{width:100%;min-height:50px;padding:12px 16px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db;outline:none}.field:focus{border-color:#98e7d2}select.field{appearance:none;padding-right:36px}.eye{background:none;border:0}.submit-gray{border:0;background:#4b5563;color:#fff}.back-flat{display:flex;align-items:center;justify-content:center;border:1px solid #374151;background:#0f1419;color:#fff;text-decoration:none}.back-flat:hover{border-color:#4b5563}.wallet-empty{display:flex;min-height:292px;margin-top:24px;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:0;border-radius:16px;background:linear-gradient(105deg,#163f34 0%,#0f2a23 28%,#0b1815 55%,#0a0e12 100%);color:#d1d5db;padding:48px}.wallet-empty .coin-lg,.bound-wallet .coin-md{display:flex;align-items:center;justify-content:center;border:2px dashed #4b5563;border-radius:50%;background:rgba(26,33,40,.6);color:#9ca3af;font-weight:600}.wallet-empty .coin-lg{width:96px;height:96px;font-size:40px;margin-bottom:16px}.add-wallet{display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:8px 24px;border-radius:10px;border:0;background:#313e40;color:#aae5d3;font-weight:600;font-size:16px;cursor:pointer}.balance-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:8px 20px;margin-top:24px;color:#d1d5db}.balance-grid strong{color:#aae5d3;font-size:20px;font-weight:600}.form-grid{display:grid;grid-template-columns:190px minmax(0,1fr);gap:16px 20px;align-items:center;color:#d1d5db}.form-grid label{font-weight:600}.account-summary{margin-bottom:32px}.registered-card{display:flex;align-items:center;gap:16px;width:100%;height:140px;margin-top:24px;padding:24px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#d1d5db}.registered-card .bank-logo{display:grid;place-items:center;width:80px;height:56px;border-radius:10px;background:#dbeafe;color:#0f172a;font-weight:700}.registered-card div:last-child{display:flex;flex-direction:column;gap:4px}.registered-card strong{color:white}.registered-card span{color:#9ca3af;font-size:14px}.bound-wallet{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:140px;margin-top:24px;text-align:center;color:#9ca3af;border:1px solid #374151;border-radius:10px;background:#0f1419}.bound-wallet .coin-md{width:72px;height:72px;margin-bottom:12px;font-size:32px}.action,.back{display:flex;align-items:center;justify-content:center;width:100%;height:56px;margin-top:24px;border-radius:10px;font-weight:600}.action{border:0;background:#4b5563;color:white;cursor:not-allowed}.action.ready{background:linear-gradient(90deg,#cbe8e4,#98e7d2);color:#0f1622;cursor:pointer}.back{border:1px solid #374151;background:#0f1419;color:white;text-decoration:none}.back:hover{border-color:#4b5563}@media(max-width:700px){.mode-tabs{gap:24px;margin-bottom:16px}.mode-tabs button{font-size:14px}.payment-tabs{gap:8px;margin-bottom:16px}.payment-tabs button{flex:1;min-width:0;padding:10px 12px;font-size:14px}.payment-card{padding:16px}.section-title{font-size:17px}.wallet-empty{min-height:220px;padding:24px}.wallet-empty .coin-lg{width:80px;height:80px;font-size:34px}.add-wallet{font-size:14px}.form-grid,.balance-grid{grid-template-columns:1fr;gap:8px}.form-grid label{margin-top:8px;font-size:14px}.field{min-height:48px;font-size:14px}.registered-card,.bound-wallet{height:140px;padding:16px}.registered-card .bank-logo{width:72px}.action,.back{height:48px;font-size:14px}}
.accts-head{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px}
.accts-nav{background:none;border:0;color:#9ca3af;cursor:pointer;padding:0;line-height:0}
.accts-nav:hover{color:#fff}
.accts-title{color:#fff;font-size:17px;font-weight:600}
.accts-title span{color:#9ca3af;font-weight:500}
.bound-card{min-height:150px;background:linear-gradient(105deg,#1b2536 0%,#131c2b 55%,#0d1420 100%);border:1px solid #26324a;padding:22px 26px}
.bound-inner{display:flex;flex-direction:column;min-height:106px}
.bound-pill{align-self:flex-start;background:#0f1419;color:#cbd5e1;font-size:12px;font-weight:700;padding:6px 14px;border-radius:8px}
.bound-num{text-align:center;margin-top:-4px}
.bound-num .bn-label{color:#9ca3af;font-size:13px;margin:0}
.bound-num .bn-value{color:#fff;font-size:24px;font-weight:800;letter-spacing:.12em;margin:2px 0 0}
.bound-foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:auto;padding-top:14px}
.bound-name{color:#eab308;font-weight:700;letter-spacing:.08em}
.bound-date{text-align:right;color:#9ca3af;font-size:12px}
.bound-date b{color:#e5e7eb;font-size:13px}
.submit-ready{display:flex;align-items:center;justify-content:center;border:0;background:linear-gradient(90deg,#cbe8e4,#98e7d2);cursor:pointer}
.submit-ready span{color:#0f1622;font-weight:800}
</style>
