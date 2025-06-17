import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IKeyword } from '@/types/article';
import { addKeyword, getKeywordByIndex, getKeywords } from '@/service/chain';

export const useKeywordStore = defineStore('keyword', () => {
  const list = ref<IKeyword[]>([]);

  const detail = ref<IKeyword>();

  function add(name: string) {
    return addKeyword(name);
  }
  function getByIndex(index: number) {
    return getKeywordByIndex(index).then((res) => {
      detail.value = res as IKeyword;
      return res;
    });
  }
  function getList() {
    return getKeywords().then((arr) => {
      list.value = arr;
    });
  }

  return { list, detail, add, getByIndex, getList };
});
