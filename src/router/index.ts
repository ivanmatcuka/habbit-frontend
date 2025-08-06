import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/Home.vue'
import HabitsPage from '../components/Habits.vue'
import EditPage from '../components/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage },
    {
      path: '/home',
      component: HomePage,
    },
    { path: '/habits', component: HabitsPage },
    { path: '/edit/:id', component: EditPage },
  ],
})

export default router
