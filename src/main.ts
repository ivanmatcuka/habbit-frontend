import { createBootstrap } from 'bootstrap-vue-next'
import { createPinia } from 'pinia'

// Bootstrap
import '@/assets/scss/global.scss'

import { createApp } from 'vue'

import localStorageService from '@/services/localStorage'
import userService from '@/services/user'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user'

const pinia = createPinia()
const app = createApp(App)

app.use(createBootstrap())
app.use(pinia)

let userStore: null | ReturnType<typeof useUserStore> = null
userStore = useUserStore()

if (localStorageService.getAccessToken()) {
  const user = await userService.getUser()
  const accessToken = localStorageService.getAccessToken()

  if (user.error) {
    console.error('Failed to fetch user:', user.error)
  } else if (user.data && accessToken) {
    userStore.setUser(user.data, accessToken)
    router.push({ name: 'home' })
  }
}

app.use(router)
app.mount('#app')

export { userStore }
