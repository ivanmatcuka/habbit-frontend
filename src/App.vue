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
      return this.$route.name === name
    },
  },
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap')

$primary: #35A7FF
$success: #33CA7F
$warning: #FFE74C
$danger: #FF5964


$smokey-black-default: #100C08
$smoky-black-100: #E7E7E6
$smoky-black-200: #CFCECE
$smoky-black-300: #B7B6B5
$smoky-black-400: #9F9E9C
$smoky-black-500: #888684
$smoky-black-600: #706D6B
$smoky-black-700: #585552
$smoky-black-800: #403D39
$smoky-black-900: #282421

*
  font-family: 'Rubik', sans-serif

html, body
  background-color: $smokey-black-default !important
</style>

<style lang="sass" scoped>
.nav-link.active a
  color: white
</style>
