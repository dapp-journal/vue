<template>
  <div>
    <h1>Blockchain</h1>
    <p v-text="count"></p>
  </div>
</template>
<script lang="ts" setup>
import { useBase } from '@/stores/base';
import { computed, onMounted } from 'vue';

const store = useBase();
const count = computed(() => store.count);

onMounted(() => {
  store.getBlockTransactionCount();
  store.getBlock();
});
</script>
