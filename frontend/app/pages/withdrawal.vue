<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { computed, ref } from 'vue';
import { useBankStore } from '~/stores/bank';

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

const bankStore = useBankStore();
const acctIdx = ref(0);
const boundAccounts = computed(() => bankStore.accounts);
const boundAcct = computed(() => boundAccounts.value[Math.min(acctIdx.value, Math.max(0, boundAccounts.value.length - 1))]);
const acctTail = computed(() => (boundAcct.value ? '＊＊＊＊' + (boundAcct.value.num.replace(/\D/g, '').slice(-4) || '0000') : '＊＊＊＊0000'));
function prevAcct() {
  const total = boundAccounts.value.length;
  if (total) acctIdx.value = (Math.min(acctIdx.value, total - 1) - 1 + total) % total;
}
function nextAcct() {
  const total = boundAccounts.value.length;
  if (total) acctIdx.value = (Math.min(acctIdx.value, total - 1) + 1) % total;
}

const withdrawReady = computed(() => withdrawalAmount.value.trim() !== '' && withdrawalPassword.value.trim() !== '');
const cryptoWithdrawReady = computed(() => [walletType.value, walletAddress.value, cryptoWithdrawAmount.value, cryptoWithdrawPassword.value].some(Boolean));
const bankManagementReady = computed(() => [selectedBank.value, accountNumber.value.trim(), accountPassword.value.trim()].some(Boolean));
const cryptoManagementReady = computed(() => [managementWalletType.value, managementWalletAddress.value, managementWalletPassword.value].some(Boolean));

const modal = ref<{ type: 'success' | 'warning'; message?: string } | null>(null);
function submitWithdraw() {
  if (!withdrawReady.value) return;
  modal.value = { type: 'success', message: 'Withdrawal request submitted successfully.' };
}
</script>

<template>
  <div>
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
                <button type="button" class="accts-nav" aria-label="Previous" @click="prevAcct"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
                <h2 class="accts-title">My Bank Accounts <span>{{ boundAccounts.length ? Math.min(acctIdx, boundAccounts.length - 1) + 1 : 0 }} / {{ boundAccounts.length }}</span></h2>
                <button type="button" class="accts-nav" aria-label="Next" @click="nextAcct"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
              </div>
              <MemberCard
                :bank="boundAcct?.bank"
                :account-tail="acctTail"
                :holder="boundAcct?.holder"
                :bind-date="boundAcct?.bindDate"
              />
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
                <h2 class="pay-section-title">Withdrawal Amount &amp; Password</h2>
              </div>
              <div class="mb-4">
                <input v-model="withdrawalAmount" class="pay-field" type="text" placeholder="₩ 10,000 ~ ₩ 9,000,000">
              </div>
              <div class="mb-4 relative">
                <input v-model="withdrawalPassword" class="pay-field" :type="showPassword ? 'text' : 'password'" placeholder="* * * * * *">
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 text-gray-400 hover:text-gray-300" @click="showPassword = !showPassword">
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
              <button class="w-full py-3 md:py-4 rounded-lg font-semibold text-sm md:text-base" :class="withdrawReady ? 'submit-ready' : 'submit-idle'" :disabled="!withdrawReady" @click="submitWithdraw"><span>Submit</span></button>
            </div>
          </section>

          <section v-else class="payment-card">
            <h2 class="pay-section-title">Crypto Wallet</h2>
            <div class="wallet-empty"><div class="coin-empty coin-lg">₿</div><div>Empty wallet list</div><button class="add-wallet"><span style="font-size:20px;line-height:1">+</span>Add wallet</button></div>
            <div class="balance-grid"><span>Central Wallet:</span><strong>0.00</strong><span>Available Amount:</span><strong>0.00</strong></div>
            <h2 class="pay-section-title mt-6">Withdrawal Amount &amp; Password</h2>
            <div class="pay-form-grid mt-6">
              <label>Wallet type:</label><select v-model="walletType" class="pay-field"><option value="">Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input v-model="walletAddress" class="pay-field" placeholder="Please fill in wallet address">
              <label>Withdrawal Amount:</label><input v-model="cryptoWithdrawAmount" class="pay-field" placeholder="100,000 ~ 20,000,000">
              <label>Transaction Password:</label><input v-model="cryptoWithdrawPassword" class="pay-field" type="password" placeholder="Please fill in the transaction password">
            </div>
            <button class="pay-action" :class="{ ready: cryptoWithdrawReady }" :disabled="!cryptoWithdrawReady">Submit</button>
          </section>
        </template>

        <section v-else class="payment-card">
          <div class="payment-tabs inner">
            <button :class="{ active: accountMethod === 'bank' }" @click="accountMethod = 'bank'"><AppIcon name="card" /><span>Bank Account</span></button>
            <button :class="{ active: accountMethod === 'crypto' }" @click="accountMethod = 'crypto'"><AppIcon name="bitcoin" /><span>Crypto Wallet</span></button>
          </div>

          <template v-if="accountMethod === 'bank'">
            <div class="account-summary">
              <h2 class="pay-section-title">Registered Withdrawal Accounts <span>(1/5)</span></h2>
              <div class="registered-card"><div class="bank-logo">신한은행</div><div><strong>Shinhan Bank</strong><span>********5123</span><span>2025-01-08 21:22:25</span></div></div>
            </div>
            <div class="pay-form-grid">
              <label>Select Bank:</label><select v-model="selectedBank" class="pay-field"><option value="">Please Select a Bank</option><option>Shinhan Bank</option><option>KB Bank</option></select>
              <label>Name on Card:</label><input class="pay-field" value="T***" disabled>
              <label>Account Number:</label><input v-model="accountNumber" class="pay-field" placeholder="Please Enter Account/Card/Phone number">
              <label>Transaction Password:</label><input v-model="accountPassword" class="pay-field" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pay-action" :class="{ ready: bankManagementReady }" :disabled="!bankManagementReady">Submit</button>
          </template>

          <template v-else>
            <div class="account-summary">
              <h2 class="pay-section-title">Bound wallet <span>(0/1)</span></h2>
              <div class="bound-wallet"><div class="coin-empty coin-md">₿</div><div>Empty wallet list</div></div>
            </div>
            <div class="pay-form-grid">
              <label>Wallet type:</label><select v-model="managementWalletType" class="pay-field"><option value="">Please select wallet type</option><option>USDT TRC20</option></select>
              <label>Wallet address:</label><input v-model="managementWalletAddress" class="pay-field" placeholder="Please fill in wallet address">
              <label>Transaction Password:</label><input v-model="managementWalletPassword" class="pay-field" type="password" placeholder="Please Fill in the Transaction Password">
            </div>
            <button class="pay-action" :class="{ ready: cryptoManagementReady }" :disabled="!cryptoManagementReady">Submit</button>
          </template>
        </section>
    <MemberModal v-if="modal" :type="modal.type" :message="modal.message" @confirm="modal = null" @cancel="modal = null" />
  </div>
</template>

