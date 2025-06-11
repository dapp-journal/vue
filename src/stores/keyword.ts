import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IKeyword } from '@/types/article';
import { addKeyword, getKeywords } from '@/service/chain';

export const useKeywordStore = defineStore('keyword', () => {
  const list = ref<IKeyword[]>([]);

  function add(name: string) {
    return addKeyword(name);
  }
  function getList() {
    return getKeywords().then((arr) => {
      list.value = arr;
    });
  }

  return { list, add, getList };
});
