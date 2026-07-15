<script setup lang="ts">
definePageMeta({ layout: 'member' });
const records = useRecordsStore();
</script>

<template>
  <RecordPage record-key="betting" v-bind="records.betting" />
</template>
