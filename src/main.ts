// import '@/styles/main.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';

import '@/styles/main.scss';

createApp(App).use(createPinia()).use(ElementPlus).use(router).mount('#app');
