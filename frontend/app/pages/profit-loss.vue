<script setup lang="ts">
definePageMeta({ layout: 'member' });
const records = useRecordsStore();
</script>

<template>
  <RecordPage record-key="profitLoss" v-bind="records.profitLoss" />
</template>
