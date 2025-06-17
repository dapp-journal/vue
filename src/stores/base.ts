import { ref } from 'vue';
import { defineStore } from 'pinia';
import { publicClient } from '@/service/chain';

export const useBase = defineStore('base', () => {
  const count = ref(0);
  function getBlockTransactionCount() {
    publicClient.getBlockTransactionCount().then((res) => {
      count.value = res;
    });
  }
  function getBlock() {
    return publicClient.getBlock().then((res) => console.log(res));
  }

  return { count, getBlockTransactionCount, getBlock };
});
