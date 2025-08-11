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
      <slot />
    </b-container>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AuthLayout',

  methods: {
    isActive(name: string) {
      return this.$route.name === name
    },
  },
}
</script>

<style scoped>
#app {
  margin: auto;
  height: 100vh;
  max-width: 768px;
}
</style>
