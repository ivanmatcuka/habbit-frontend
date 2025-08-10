import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/Home.vue'
import HabitsPage from '../components/Habits.vue'
import EditPage from '../components/Edit.vue'
import AddPage from '../components/Add.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    { path: '/', component: HomePage, name: 'home' },
    {
      path: '/habits',
      component: HabitsPage,
      name: 'habits',
    },
    { path: '/edit/:id', component: EditPage },
    { path: '/add', component: AddPage },
  ],
})

export default router
