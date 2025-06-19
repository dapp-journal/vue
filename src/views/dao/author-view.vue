<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthorStore } from '@/stores/author';
import type { IAuthor } from '@/types/article';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const doi = ref('');
const authorIndex = ref(0);

const store = useAuthorStore();
const authors = computed(() => store.list);
const authorDetail = computed(() => store.detail);
const authorCount = computed(() => store.list.length);

async function submitAuthor() {
  await store.add(firstName.value, lastName.value, email.value, doi.value);
  store.getList();
  // Clear inputs after successful submission
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  doi.value = '';
}

async function getAuthor() {
  const author = await store.getByIndex(authorIndex.value);
  authorIndex.value = 0;
  return author;
}

async function handleEdit(author: IAuthor) {
  await store.edit(author);
  store.getList();
}

onMounted(() => {
  store.getList();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">👥 Authors ({{ authorCount }})</h2>
    <ul>
      <li v-for="(a, i) in authors" :key="i" class="mb-2 border-b pb-2">
        <strong>{{ a.firstName }} {{ a.lastName }}</strong> <br />
        Email: {{ a.email }} <br />
        DOI: {{ a.doi || 'N/A' }} <br />
        User: {{ a.user }} <br />
        Time: {{ new Date(Number(a.timestamp) * 1000).toLocaleString() }}
      </li>
    </ul>

    <hr class="my-4" />
    <h3 class="text-lg font-semibold mb-1">➕ Add New Author</h3>
    <form @submit.prevent="submitAuthor" class="space-y-2">
      <div>
        <input v-model="firstName" placeholder="First Name" class="border p-1 mr-2" required />
        <input v-model="lastName" placeholder="Last Name" class="border p-1 mr-2" required />
      </div>
      <div>
        <input v-model="email" type="email" placeholder="Email" class="border p-1 mr-2" required />
        <input v-model="doi" placeholder="DOI (optional)" class="border p-1 mr-2" />
      </div>
      <button class="bg-blue-500 text-white px-2 py-1">Add Author</button>
    </form>

    <hr class="my-4" />
    <h3 class="text-lg font-semibold mb-1">🔍 Get Author by Index</h3>
    <form @submit.prevent="getAuthor" class="space-y-2">
      <input
        v-model="authorIndex"
        type="number"
        placeholder="Author Index"
        class="border p-1 mr-2"
      />
      <button class="bg-blue-500 text-white px-2 py-1">Get</button>
    </form>

    <div v-if="authorDetail" class="mt-4 p-4 border rounded">
      <h4 class="font-semibold mb-2">Author Details</h4>
      <p><strong>Name:</strong> {{ authorDetail.firstName }} {{ authorDetail.lastName }}</p>
      <p><strong>Email:</strong> {{ authorDetail.email }}</p>
      <p><strong>DOI:</strong> {{ authorDetail.doi || 'N/A' }}</p>
      <p><strong>User:</strong> {{ authorDetail.user }}</p>
      <p>
        <strong>Time:</strong>
        {{ new Date(Number(authorDetail.timestamp) * 1000).toLocaleString() }}
      </p>
    </div>
  </div>
</template>
