<template>
  <div id="app">

    <!-- Navigation -->
    <b-container class="mt-5 mb-5">
      <b-nav pills class="mb-2">
        <b-nav-item :active="isActive('home')" class="font-weight-bold">
          <router-link :to="{ name: 'home' }">Dashboard</router-link>
        </b-nav-item>
        <b-nav-item :active="isActive('habits')" class="font-weight-bold">
          <router-link :to="{ name: 'habits' }">Habits</router-link>
        </b-nav-item>
      </b-nav>

      <router-view />
    </b-container>
  </div>
</template>

<script>
// Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
  components: {},
  methods: {
    /**
     * Checks if the route is active.
     * 
     * @param {string} name - Route name.
     * @return {boolean}
     */
    isActive(name) {
      return this.$route.name === name;
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap')

$primary: #35A7FF
$success: #33CA7F
$warning: #FFE74C
$danger: #FF5964

@import '../node_modules/bootstrap/scss/bootstrap'
@import '../node_modules/bootstrap-vue/src/index.scss'

*
  font-family: 'Quicksand', sans-serif
</style>

<style lang="sass" scoped>
.nav-link.active a
  color: white
</style>
