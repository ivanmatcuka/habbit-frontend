<template>
  <div id="app">
    <b-container class="my-8 text-white">
      <div class="d-flex gap-2 justify-content-between mb-8">
        <div class="d-flex gap-2">
          <b-button to="/" variant="dark" :class="{ active: isActive('home') }">Dashboard</b-button>
          <b-button to="/habits" variant="dark" :active="isActive('habits')">Habits</b-button>
        </div>
        <b-dropdown variant="outline-light">
          <template #button-content><user-icon /></template>
          <b-dropdown-item to="/signout">Sign Out</b-dropdown-item>
        </b-dropdown>
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
  max-width: 768px;
}
</style>
