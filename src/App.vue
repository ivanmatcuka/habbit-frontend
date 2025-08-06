<template>
  <div id="app">

    <!-- Navigation -->
    <b-container class="mt-5 mb-5">
      <b-navbar class="mb-2">
        <b-nav-item :active="isActive('home')" class="font-weight-bold">
          <router-link to="/">Dashboard</router-link>
        </b-nav-item>
        <b-nav-item :active="isActive('habits')" class="font-weight-bold">
          <router-link to="/habits">Habits</router-link>
        </b-nav-item>
      </b-navbar>
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  components: {},
  methods: {
    isActive(name: string) {
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

*
  font-family: 'Quicksand', sans-serif
</style>

<style lang="sass" scoped>
.nav-link.active a
  color: white
</style>
