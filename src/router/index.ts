import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', component: HomePage }, { path: '/home', component: HomePage }],
})


export default router
