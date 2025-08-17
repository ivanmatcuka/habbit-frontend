import { createRouter, createWebHistory } from 'vue-router'

import { userStore } from '@/main'
import AddPage from '@/pages/Add.vue'
import EditPage from '@/pages/Edit.vue'
import HabitsPage from '@/pages/Habits.vue'
import HomePage from '@/pages/Home.vue'
import RecoverPasswordPage from '@/pages/RecoverPassword.vue'
import SignInPage from '@/pages/SignIn.vue'
import SignOutPage from '@/pages/SignOut.vue'
import SignUpPage from '@/pages/SignUp.vue'

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      component: HomePage,
      name: 'home',
      path: '/',
    },
    {
      component: HabitsPage,
      name: 'habits',
      path: '/habits',
    },
    { component: EditPage, path: '/edit/:id' },
    { component: AddPage, path: '/add' },
    { component: SignInPage, name: 'signin', path: '/signin' },
    { component: SignUpPage, name: 'signup', path: '/signup' },
    { component: SignOutPage, name: 'signout', path: '/signout' },
    { component: RecoverPasswordPage, name: 'recover-password', path: '/recover-password' },
  ],
})

const unauthRoutes = ['signin', 'signup', 'recover-password']

router.beforeEach((to, _, next) => {
  const isAuthRoute = unauthRoutes.includes(String(to.name))
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
