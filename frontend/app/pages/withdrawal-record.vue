<script setup lang="ts">
definePageMeta({ layout: 'member' });
const records = useRecordsStore();
</script>

<template>
  <RecordPage record-key="withdrawal" v-bind="records.withdrawal" />
</template>
