import { createBootstrap } from 'bootstrap-vue-next';

// Bootstrap
import '@/assets/scss/global.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import localStorageService from '~shared/services/localStorage';
import userService from '~shared/services/user';

import App from './App.vue';
import router from './router';
import { useUserStore } from './stores/user';

const app = createApp(App);

app.use(createBootstrap());
app.use(createPinia());

if (localStorageService.getAccessToken()) {
  const userStore = useUserStore();
  const user = await userService.getUser();
  const accessToken = localStorageService.getAccessToken();

  if (user.error) {
    console.error('Failed to fetch user:', user.error);
  } else if (user.data && accessToken) {
    userStore?.setUser(user.data, accessToken);
    router.push({ name: 'home' });
  }
}

app.use(router);
app.mount('#app');
