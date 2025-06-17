<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useKeywordStore } from '@/stores/keyword';

const keywordName = ref('');
const keywordIndex = ref(0);

const store = useKeywordStore();
const keywords = computed(() => store.list);
const keywordDetail = computed(() => store.detail);
const keywordCount = ref(0);

async function submitKeyword(name: string) {
  await store.add(name);
  store.getList();
  keywordName.value = ''; // Clear input after successful submission
}
async function getKeyword() {
  const keyword = await store.getByIndex(keywordIndex.value);
  keywordIndex.value = 0;
  return keyword;
}

onMounted(() => {
  store.getList();
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">🔑 Keywords ({{ keywordCount }})</h2>
    <ul>
      <li v-for="(k, i) in keywords" :key="i" class="mb-2 border-b pb-2">
        <strong>{{ k.name }}</strong> <br />
        User: {{ k.user }} <br />
        Time: {{ new Date(Number(k.timestamp) * 1000).toLocaleString() }}
      </li>
    </ul>

    <hr class="my-4" />
    <h3 class="text-lg font-semibold mb-1">➕ Add New Keyword</h3>
    <form @submit.prevent="submitKeyword(keywordName)">
      <input v-model="keywordName" placeholder="Keyword Name" class="border p-1 mr-2" />
      <button class="bg-blue-500 text-white px-2 py-1">Add</button>
    </form>
    <hr />
    <h3>Get Keyword by idx</h3>
    <form @submit.prevent="getKeyword">
      <input v-model="keywordIndex" placeholder="Keyword Index" />
      <button>Get</button>
    </form>
    <ul v-if="keywordDetail">
      <li>
        <strong>{{ keywordDetail.name }}</strong> <br />
        User: {{ keywordDetail.user }} <br />
        Time: {{ new Date(Number(keywordDetail.timestamp) * 1000).toLocaleString() }}
      </li>
    </ul>
  </div>
</template>
