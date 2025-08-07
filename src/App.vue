<template>
  <div id="app">
    <b-container class="my-8">
      <div class="d-flex gap-2 mb-8">
        <router-link to="/">
          <b-button
            class="rounded-1 px-3 py-2 lh-1 border-2 btn-bd-primary"
            :class="{ active: isActive('home') }"
            >Dashboard</b-button
          >
        </router-link>
        <router-link to="/habits">
          <b-button
            class="rounded-1 px-3 py-2 lh-1 border-2 btn-bd-primary"
            :active="isActive('habits')"
            >Habits</b-button
          >
        </router-link>
      </div>
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Rubik', sans-serif;
}
</style>

<style lang="sass" scoped>
.nav-link.active a
  color: white
</style>
