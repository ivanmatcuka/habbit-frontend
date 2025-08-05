// Libs
import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

// Components
import App from './App.vue';
import Home from './components/Home.vue';
import Habits from './components/Habits.vue';
import Edit from './components/Edit.vue';

// Plugins
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Edit,
  },
  {
    path: '/habits',
    name: 'habits',
    component: Habits,
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
