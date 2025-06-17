import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/home-view.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/article',
      name: 'article',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/article-view.vue')
    },
    {
      path: '/author',
      name: 'author',
      component: () => import('@/views/author-view.vue')
    },
    {
      path: '/keyword',
      name: 'keyword',
      component: () => import('@/views/keyword-view.vue')
    },
    {
      path: '/block',
      name: 'block',
      component: () => import('@/views/block-view.vue')
    }
  ]
});

export default router;
