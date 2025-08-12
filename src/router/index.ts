import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/Home.vue'
import HabitsPage from '../components/Habits.vue'
import EditPage from '../components/Edit.vue'
import AddPage from '../components/Add.vue'
import { userStore } from '@/main'
import SignInPage from '@/components/SignIn.vue'
import SignOut from '@/components/SignOut.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      component: HomePage,
      name: 'home',
    },
    {
      path: '/habits',
      component: HabitsPage,
      name: 'habits',
    },
    { path: '/edit/:id', component: EditPage },
    { path: '/add', component: AddPage },
    { path: '/signin', component: SignInPage, name: 'signin' },
    { path: '/signup', component: SignInPage, name: 'signup' },
    { path: '/signout', component: SignOut, name: 'signout' },
  ],
})

router.beforeEach((to, _, next) => {
  const isAuthRoute = to.name === 'signin' || to.name === 'signup'
  const isLoggedIn = userStore?.isLoggedIn

  if (isLoggedIn && isAuthRoute) {
    console.log('User is already logged in, redirecting to home')
    return next({ name: 'home' })
  }

  if (!isLoggedIn && !isAuthRoute) {
    console.log('User is not logged in, redirecting to signin')
    return next({ name: 'signin' })
  }

  next()
})

export default router
