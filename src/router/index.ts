import { createRouter, createWebHistory } from 'vue-router'

import { userStore } from '@/main'
import HomePage from '@/pages/Home.vue'
import HabitsPage from '@/pages/Habits.vue'
import EditPage from '@/pages/Edit.vue'
import AddPage from '@/pages/Add.vue'
import SignInPage from '@/pages/SignIn.vue'
import SignUpPage from '@/pages/SignUp.vue'
import SignOut from '@/pages/SignOut.vue'

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
    { path: '/signup', component: SignUpPage, name: 'signup' },
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
