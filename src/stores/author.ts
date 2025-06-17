import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IAuthor } from '@/types/article';
import { addAuthor, getAuthorByIndex, getAuthors, editAuthor } from '@/service/chain';

export const useAuthorStore = defineStore('author', () => {
  const list = ref<IAuthor[]>([]);
  const detail = ref<IAuthor>();

  function add(firstName: string, lastName: string, email: string, doi: string = '') {
    return addAuthor(firstName, lastName, email, doi);
  }

  function getByIndex(index: number) {
    return getAuthorByIndex(index).then((res) => {
      detail.value = res as IAuthor;
      return res;
    });
  }

  function getList() {
    return getAuthors().then((arr) => {
      list.value = arr;
      return arr;
    });
  }

  function edit(author: IAuthor) {
    return editAuthor(author);
  }

  return { list, detail, add, getByIndex, getList, edit };
});
