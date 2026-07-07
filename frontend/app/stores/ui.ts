import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    count: 0,
  }),
  actions: {
    inc() {
      this.count++;
    },
  },
});
