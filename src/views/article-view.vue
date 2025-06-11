<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { walletClient, publicClient } from '@/utils/viem-client';
import { abi as articleAbi } from '@/abi/ArticleRegistry.json';
const title = ref('');
const cid = ref('');

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // 替换成实际地址

const articles = ref<any[]>([]);
const articleCount = ref(0);

async function fetchArticles() {
  articleCount.value = Number(
    await publicClient.readContract({
      address: contractAddress,
      abi: articleAbi,
      functionName: 'getTotalArticles'
    })
  );

  articles.value = [];

  for (let i = articleCount.value - 1; i >= 0 && i > articleCount.value - 10; i--) {
    const article = await publicClient.readContract({
      address: contractAddress,
      abi: articleAbi,
      functionName: 'getArticle',
      args: [BigInt(i)]
    });

    articles.value.push(article);
  }
}

async function submitArticle(title: string, cid: string) {
  const [account] = await walletClient.requestAddresses();

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi: articleAbi,
    functionName: 'submitArticle',
    args: [title, cid],
    account
  });

  console.log('Transaction sent:', hash);
  await fetchArticles();
}

onMounted(fetchArticles);
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-2">📚 Latest Articles ({{ articleCount }})</h2>
    <ul>
      <li v-for="(a, i) in articles" :key="i" class="mb-2 border-b pb-2">
        <strong>{{ a.title }}</strong> <br />
        IPFS: <a :href="`https://ipfs.io/ipfs/${a.cid}`" target="_blank">{{ a.cid }}</a> <br />
        Author: {{ a.author }} <br />
        Time: {{ new Date(Number(a.timestamp) * 1000).toLocaleString() }}
      </li>
    </ul>

    <hr class="my-4" />
    <h3 class="text-lg font-semibold mb-1">✍️ Submit New Article</h3>
    <form @submit.prevent="submitArticle(title, cid)">
      <input v-model="title" placeholder="Title" class="border p-1 mr-2" />
      <input v-model="cid" placeholder="IPFS CID" class="border p-1 mr-2" />
      <button class="bg-blue-500 text-white px-2 py-1">Submit</button>
    </form>
  </div>
</template>
