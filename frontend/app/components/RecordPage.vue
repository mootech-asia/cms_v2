<script setup lang="ts">
/**
 * 五張紀錄頁共用外殼:標題 + 篩選列(日期區間/狀態/Confirm)+
 * PrimeVue DataTable + 自動更新倒數 + 底部合計列。
 * 純 UI 占位:狀態下拉即時過濾 mock rows,日期與 Confirm 為占位。
 * 表格皮膚:main.css 的 .record-table(蓋過主題)+ 各欄 pt 對齊。
 */
import { computed, ref } from 'vue';
import type { RecordColumn, RecordKey, RecordRow } from '~/stores/records';

const props = defineProps<{
  recordKey: RecordKey;
  title: string;
  columns: RecordColumn[];
  rows: RecordRow[];
  statusOptions?: string[];
  total?: { label: string; value: string };
  autoRefresh?: boolean;
}>();

const recordsStore = useRecordsStore();
function onConfirm() {
  recordsStore.refresh(props.recordKey);
}

const range = ref<Date | Date[] | null>(null);
const status = ref('All');

/** 有 status 欄位才做客端過濾(帳變頁有下拉但列無狀態,維持全顯示) */
const statusField = computed(() => props.columns.find((c) => c.variant === 'status')?.field);
const filteredRows = computed(() => {
  const field = statusField.value;
  if (!field || status.value === 'All') return props.rows;
  return props.rows.filter((row) => row[field] === status.value);
});

const PILL_CLASS: Record<string, string> = {
  Approved: 'pill-ok',
  Completed: 'pill-ok',
  Pending: 'pill-warn',
  Rejected: 'pill-bad',
};

function pillClass(value: string) {
  return PILL_CLASS[value] ?? 'pill-neutral';
}

function signClass(value: string) {
  if (value.startsWith('+')) return 'font-bold text-success';
  if (value.startsWith('-')) return 'font-bold text-danger';
  return '';
}

function cellClass(col: RecordColumn) {
  switch (col.variant) {
    case 'mono':
      return 'font-mono text-note tracking-wider text-ink-3';
    case 'strong':
      return 'font-semibold text-ink';
    case 'dim':
      return 'text-ink-3';
    default:
      return '';
  }
}

function columnPt(col: RecordColumn) {
  const align = col.align ?? 'left';
  return {
    columnHeaderContent: align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : '',
    bodyCell:
      align === 'right' ? 'text-right text-ink' : align === 'center' ? 'text-center' : '',
  };
}
</script>

<template>
  <div class="flex w-full flex-col">
    <h1 class="mb-8 w-full text-3xl text-ink">{{ title }}</h1>

    <div class="mb-4 flex w-full flex-wrap items-center gap-2">
      <div v-if="statusOptions?.length" class="w-36 shrink-0">
        <UiSelect v-model="status" :options="statusOptions" placeholder="Status" />
      </div>
      <div class="w-full min-w-0 sm:w-64">
        <UiDatePicker v-model="range" selection-mode="range" placeholder="YYYY-MM-DD ~ YYYY-MM-DD" />
      </div>
      <button type="button" class="btn-primary h-10 px-6 text-body" @click="onConfirm">Confirm</button>
      <AutoRefreshTimer v-if="autoRefresh" class="ml-auto" @refresh="onConfirm" />
    </div>

    <div class="w-full overflow-hidden rounded-xl border border-line-soft">
      <DataTable :value="filteredRows" class="record-table" :pt="{ tableContainer: 'overflow-x-auto' }">
        <Column
          v-for="col in columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
          :pt="columnPt(col)"
        >
          <template #body="{ data }">
            <span v-if="col.variant === 'status'" :class="pillClass(data[col.field])">{{ data[col.field] }}</span>
            <span v-else-if="col.variant === 'signed'" :class="signClass(data[col.field])">{{ data[col.field] }}</span>
            <span v-else :class="cellClass(col)">{{ data[col.field] }}</span>
          </template>
        </Column>
      </DataTable>
    </div>

    <div v-if="total" class="record-total-bar">
      <span>{{ total.label }}</span>
      <span>{{ total.value }}</span>
    </div>
  </div>
</template>
