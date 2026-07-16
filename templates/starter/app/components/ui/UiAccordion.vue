<script setup lang="ts">
/**
 * 統一手風琴(PrimeVue Accordion 包裝)。
 * 用法:items=[{title,content?,value?}];需要自訂面板內容時
 * 以 value(預設為索引字串)同名槽位覆寫。外觀由 Win100 preset 集中控制。
 */
withDefaults(
  defineProps<{
    items: { title: string; content?: string; value?: string }[]
    multiple?: boolean
  }>(),
  { multiple: false },
)
</script>

<template>
  <Accordion :multiple="multiple" :value="multiple ? [] : undefined">
    <AccordionPanel v-for="(it, i) in items" :key="it.value ?? String(i)" :value="it.value ?? String(i)">
      <AccordionHeader>{{ it.title }}</AccordionHeader>
      <AccordionContent>
        <slot :name="it.value ?? String(i)" :item="it">
          <p class="text-body text-ink-2">{{ it.content }}</p>
        </slot>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
