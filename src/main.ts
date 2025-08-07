import App from './App.vue'
import router from './router'

// Bootstrap
import '@/assets/scss/global.scss'

import { createApp } from 'vue'
import { createBootstrap } from 'bootstrap-vue-next'

const app = createApp(App)
app.use(createBootstrap())
app.use(router)

app.mount('#app')
