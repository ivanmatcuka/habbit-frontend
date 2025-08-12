<template>
  <main id="app">
    <b-container class="my-8 text-white">
      <nav class="d-flex gap-2 align-items-center justify-content-between mb-8">
        <div class="d-flex gap-2">
          <b-button to="/" variant="dark" :active="isActive('home')">Dashboard</b-button>
          <b-button to="/habits" variant="dark" :active="isActive('habits')">Habits</b-button>
        </div>
        <b-dropdown variant="outline-light" offset="8">
          <template #button-content><user-icon /></template>
          <b-dropdown-item to="/signout">Sign Out</b-dropdown-item>
        </b-dropdown>
      </nav>
      <slot />
    </b-container>
  </main>
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
