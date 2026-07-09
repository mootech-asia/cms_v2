<script setup lang="ts">
import { computed, ref } from 'vue';

const DEMO_BANKS = ['Bank of America', 'Shinhan Bank', 'KB Kookmin Bank', 'Woori Bank', 'NH Nonghyup Bank', 'Hana Bank', '산림조합중앙회 Bank'];

type Account = { bank: string; num: string };
type Modal = { type: 'success' | 'warning' | 'confirm'; message?: string; onConfirm?: () => void } | null;

const view = ref<'empty' | 'form' | 'list'>('empty');
const accounts = ref<Account[]>([]);
const bank = ref('');
const cardNum = ref('');
const txnPw = ref('');
const showCard = ref(false);
const showTxn = ref(false);
const bankMenuOpen = ref(false);
const bankSearch = ref('');
const modal = ref<Modal>(null);

const formReady = computed(() => bank.value !== '' && cardNum.value.trim() !== '' && txnPw.value.trim() !== '');
const filteredBanks = computed(() => DEMO_BANKS.filter((b) => b.toLowerCase().includes(bankSearch.value.toLowerCase())));

function maskCard(num: string) {
  const digits = num.replace(/\s/g, '');
  return '********' + (digits.slice(-4) || '0000');
}
function openForm() {
  bank.value = '';
  cardNum.value = '';
  txnPw.value = '';
  bankSearch.value = '';
  bankMenuOpen.value = false;
  view.value = 'form';
}
function back() {
  view.value = accounts.value.length ? 'list' : 'empty';
}
function selectBank(b: string) {
  bank.value = b;
  bankMenuOpen.value = false;
}
function submit() {
  if (!formReady.value) return;
  accounts.value.push({ bank: bank.value, num: maskCard(cardNum.value) });
  modal.value = { type: 'success', onConfirm: () => { view.value = 'list'; } };
}
function askDelete(i: number) {
  const acct = accounts.value[i];
  modal.value = {
    type: 'confirm',
    message: acct ? acct.num + ' ?' : '',
    onConfirm: () => {
      accounts.value.splice(i, 1);
      view.value = accounts.value.length ? 'list' : 'empty';
      modal.value = { type: 'success' };
    },
  };
}
function closeModal(confirmed: boolean) {
  const m = modal.value;
  modal.value = null;
  if (confirmed) m?.onConfirm?.();
}
</script>

<template>
  <div class="min-h-screen bg-[#0f1419] overflow-x-hidden">
    <MemberHeader />
    <div class="flex min-h-screen">
      <MemberSidebar active="/security" />
      <main class="flex-1 min-w-0 p-4 md:p-8 pb-24">
        <h1 class="text-white text-2xl md:text-3xl mb-6 md:mb-8">Banking Details</h1>
        <div class="mf-wrap">
          <!-- Empty -->
          <template v-if="view === 'empty'">
            <div class="mf-empty">
              <div class="mf-empty-coin"><AppIcon name="bank" /></div>
              <p class="mf-empty-title">Empty Bank Account</p>
              <button type="button" class="mf-add-btn" @click="openForm">Add Account</button>
            </div>
            <button type="button" class="mf-fab" @click="openForm"><AppIcon name="plus" /></button>
          </template>

          <!-- Add form -->
          <template v-else-if="view === 'form'">
            <div class="mf-card">
              <div class="mf-section"><span>Bank Information</span></div>
              <div class="mf-select-wrap">
                <button type="button" class="mf-select" :class="{ placeholder: !bank }" @click="bankMenuOpen = !bankMenuOpen">
                  {{ bank || 'Choose a Bank' }}<AppIcon name="chevron-down" />
                </button>
                <template v-if="bankMenuOpen">
                  <div class="mf-select-back" @click="bankMenuOpen = false" />
                  <div class="mf-select-menu">
                    <div class="mf-select-search"><AppIcon name="search" /><input v-model="bankSearch" type="text" placeholder="search a bank"></div>
                    <div class="mf-select-opts">
                      <div v-for="b in filteredBanks" :key="b" class="mf-select-opt" @click="selectBank(b)">{{ b }}</div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="mf-field"><input class="mf-input plain" disabled placeholder=""></div>
              <div class="mf-field">
                <input class="mf-input" :type="showCard ? 'text' : 'password'" v-model="cardNum" placeholder="Enter your card number">
                <button type="button" class="mf-eye" @click="showCard = !showCard"><AppIcon name="eye" /></button>
              </div>
              <div class="mf-section"><span>Transaction Password</span></div>
              <div class="mf-field">
                <input class="mf-input" :type="showTxn ? 'text' : 'password'" v-model="txnPw" placeholder="Please  fill in the transaction password">
                <button type="button" class="mf-eye" @click="showTxn = !showTxn"><AppIcon name="eye" /></button>
              </div>
              <button type="button" class="mf-submit" :class="{ ready: formReady }" :disabled="!formReady" @click="submit"><span>Submit</span></button>
              <button type="button" class="mf-back" @click="back"><span>Back</span></button>
            </div>
          </template>

          <!-- Account list -->
          <template v-else>
            <div v-for="(a, i) in accounts" :key="i" class="mf-acct" @click="askDelete(i)">
              <span class="mf-acct-check"><AppIcon name="check" /></span>
              <div>
                <p class="mf-acct-title">Active Bank Account</p>
                <p class="mf-acct-bank">{{ a.bank }}</p>
                <p class="mf-acct-num">{{ a.num }}</p>
              </div>
            </div>
            <button type="button" class="mf-fab" @click="openForm"><AppIcon name="plus" /></button>
          </template>
        </div>
      </main>
    </div>
    <MobileBottomNav />
    <MemberModal v-if="modal" :type="modal.type" :message="modal.message" @confirm="closeModal(true)" @cancel="closeModal(false)" />
  </div>
</template>

<style scoped>
.mf-wrap{max-width:56rem;margin:0 auto;width:100%}
.mf-card{background:#1a2128;border:1px solid #1f2937;border-radius:12px;padding:24px;width:100%;box-sizing:border-box}
.mf-field{position:relative;margin-bottom:16px}
.mf-input{box-sizing:border-box;width:100%;min-height:52px;background:#0f1419;border:1px solid #374151;border-radius:10px;padding:14px 46px 14px 16px;color:#fff;font-size:15px;outline:none}
.mf-input.plain{padding-right:16px}
.mf-input::placeholder{color:#6b7280}
.mf-input:focus{border-color:#98E7D2}
.mf-input:disabled{background:#232b36;color:#6b7280;cursor:not-allowed}
.mf-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:0;color:#9ca3af;cursor:pointer;padding:0;line-height:0}
.mf-eye:hover{color:#d1d5db}
.mf-eye :deep(svg){width:20px;height:20px}
.mf-submit{display:block;width:100%;padding:15px;border:0;border-radius:10px;background:#4b5563;font-weight:700;font-size:16px;cursor:not-allowed;text-align:center}
.mf-submit span{color:#e5e7eb}
.mf-submit.ready{background:#0a1526;cursor:pointer}
.mf-submit.ready span{background:linear-gradient(90deg,#ff4d9d 10%,#ff8a3d 60%,#ffb43d);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;font-weight:800}
.mf-back{display:block;width:100%;margin-top:14px;padding:15px;border:1px solid #374151;border-radius:10px;background:#0f1419;color:#fff;font-weight:700;font-size:16px;text-align:center;cursor:pointer;box-sizing:border-box}
.mf-back:hover{border-color:#4b5563}
.mf-section{display:flex;justify-content:center;margin:8px 0 20px}
.mf-section span{display:inline-block;padding:10px 22px;border-radius:999px;background:#0a1526;color:#aae5d3;font-weight:700;font-size:15px}
.mf-select-wrap{position:relative;margin-bottom:16px}
.mf-select{box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:52px;background:#fff;border:1px solid #d1d5db;border-radius:10px;padding:12px 16px;color:#1a2128;font-size:15px;cursor:pointer;text-align:left}
.mf-select.placeholder{color:#6b7280}
.mf-select :deep(svg){width:18px;height:18px;color:#6b7280;flex:0 0 auto}
.mf-select-back{position:fixed;inset:0;z-index:20}
.mf-select-menu{position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:30;background:#fff;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;box-shadow:0 16px 40px rgba(0,0,0,.35)}
.mf-select-search{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #eef0f2}
.mf-select-search :deep(svg){width:18px;height:18px;color:#9ca3af;flex:0 0 auto}
.mf-select-search input{flex:1;border:0;outline:none;font-size:15px;color:#1a2128;background:none}
.mf-select-opts{max-height:220px;overflow-y:auto}
.mf-select-opt{padding:13px 16px;color:#1a2128;font-size:15px;cursor:pointer;border-bottom:1px solid #f1f3f5}
.mf-select-opt:last-child{border-bottom:0}
.mf-select-opt:hover{background:#f5f7f9}
.mf-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#151b24;border:1px solid #1f2937;border-radius:14px;padding:44px 24px}
.mf-empty-coin{width:92px;height:92px;border:2px dashed #4b5563;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(26,33,40,.6);color:#9ca3af;margin-bottom:16px}
.mf-empty-coin :deep(svg){width:44px;height:44px}
.mf-empty-title{color:#fff;font-size:18px;font-weight:700;margin:0 0 16px}
.mf-add-btn{display:inline-flex;align-items:center;gap:8px;padding:9px 22px;border:0;border-radius:999px;background:#313e40;color:#aae5d3;font-weight:700;font-size:15px;cursor:pointer}
.mf-acct{display:flex;align-items:flex-start;gap:12px;background:#1a2128;border:1px solid #1f2937;border-radius:12px;padding:18px 20px;margin-bottom:14px;cursor:pointer;transition:border-color .15s}
.mf-acct:hover{border-color:#374151}
.mf-acct-check{width:22px;height:22px;flex:0 0 auto;color:#22c55e;margin-top:2px}
.mf-acct-check :deep(svg){width:22px;height:22px;stroke-width:3}
.mf-acct-title{color:#fff;font-size:16px;font-weight:800;margin:0 0 6px}
.mf-acct-bank{color:#aae5d3;font-size:13px;font-weight:600;margin:0 0 2px}
.mf-acct-num{color:#9ca3af;font-size:13px;letter-spacing:.04em;margin:0}
.mf-fab{position:fixed;right:22px;bottom:88px;z-index:60;width:54px;height:54px;border-radius:50%;border:2px solid #98E7D2;background:#0f1419;color:#98E7D2;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.4)}
.mf-fab :deep(svg){width:26px;height:26px}
@media(min-width:768px){.mf-fab{bottom:32px;right:32px}}
</style>
