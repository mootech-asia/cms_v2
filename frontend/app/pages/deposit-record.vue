<script setup lang="ts">
definePageMeta({ layout: 'member' });
const records = useRecordsStore();
</script>

<template>
  <RecordPage record-key="deposit" v-bind="records.deposit" />
</template>
