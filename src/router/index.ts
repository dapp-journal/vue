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
      component: () => import('@/views/article-view.vue')
    },
    {
      path: '/dao',
      name: 'dao',
      redirect(to) {
        console.log(to);
        return '/dao/block';
      },
      component: () => import('@/views/dao/dao-layout.vue'),
      children: [
        {
          path: 'author',
          name: 'author',
          component: () => import('@/views/dao/author-view.vue')
        },
        {
          path: 'keyword',
          name: 'keyword',
          component: () => import('@/views/dao/keyword-view.vue')
        },
        {
          path: 'block',
          name: 'block',
          component: () => import('@/views/dao/block-view.vue')
        }
      ]
    }
  ]
});

export default router;
