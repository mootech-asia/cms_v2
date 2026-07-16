<script setup lang="ts">
/**
 * 統一頁籤(PrimeVue Tabs 包裝)。
 * 用法:tabs=[{label,value}],每個 value 對應一個同名槽位放面板內容。
 * 外觀由 Win100 preset 集中控制。
 */
const props = defineProps<{
  tabs: { label: string; value: string }[]
}>()

const value = defineModel<string>()
if (value.value === undefined && props.tabs.length) value.value = props.tabs[0]!.value
</script>

<template>
  <Tabs v-model:value="value">
    <TabList>
      <Tab v-for="t in tabs" :key="t.value" :value="t.value">{{ t.label }}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel v-for="t in tabs" :key="t.value" :value="t.value">
        <slot :name="t.value" :tab="t" />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
