<script setup lang="ts">
definePageMeta({ layout: 'member' });
import { computed, ref } from 'vue';
import { useBankStore } from '~/stores/bank';

const DEMO_BANKS = ['Bank of America', 'Shinhan Bank', 'KB Kookmin Bank', 'Woori Bank', 'NH Nonghyup Bank', 'Hana Bank', '산림조합중앙회 Bank'];

type Modal = { type: 'success' | 'warning' | 'confirm'; message?: string; onConfirm?: () => void } | null;

const bankStore = useBankStore();
const accounts = computed(() => bankStore.accounts);
const view = ref<'empty' | 'form' | 'list'>(accounts.value.length ? 'list' : 'empty');
const bank = ref('');
const cardNum = ref('');
const txnPw = ref('');
const showCard = ref(false);
const showTxn = ref(false);
const bankMenuOpen = ref(false);
const bankSearch = ref('');
const modal = ref<Modal>(null);

if (useRoute().query.add) view.value = 'form';

const formReady = computed(() => bank.value !== '' && cardNum.value.trim() !== '' && txnPw.value.trim() !== '');
const filteredBanks = computed(() => DEMO_BANKS.filter((b) => b.toLowerCase().includes(bankSearch.value.toLowerCase())));

function maskCard(num: string) {
  const digits = num.replace(/\s/g, '');
  return '**** **** **** ' + (digits.slice(-4) || '0000');
}
function openForm() {
  bank.value = '';
  cardNum.value = '';
  txnPw.value = '';
  bankSearch.value = '';
  bankMenuOpen.value = false;
  view.value = 'form';
}
function selectBank(b: string) {
  bank.value = b;
  bankMenuOpen.value = false;
}
function submit() {
  if (!formReady.value) return;
  bankStore.addAccount({ bank: bank.value, num: maskCard(cardNum.value) });
  modal.value = { type: 'success', onConfirm: () => { view.value = 'list'; } };
}
function closeModal(confirmed: boolean) {
  const m = modal.value;
  modal.value = null;
  if (confirmed) m?.onConfirm?.();
}
</script>

<template>
  <div>
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
            </div>
          </template>

          <!-- Account list -->
          <template v-else>
            <div v-for="(a, i) in accounts" :key="i" class="mf-acct">
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
    <MemberModal v-if="modal" :type="modal.type" :message="modal.message" @confirm="closeModal(true)" @cancel="closeModal(false)" />
  </div>
</template>

