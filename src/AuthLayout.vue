<template>
  <main id="app" class="my-8 text-white m-auto px-2">
    <nav class="d-flex gap-2 align-items-center justify-content-between mb-8">
      <div class="d-flex gap-2">
        <b-button to="/" variant="outline-light" :active="isActive('home')">Dashboard</b-button>
        <b-button to="/habits" variant="outline-light" :active="isActive('habits')"
          >Habits</b-button
        >
      </div>
      <b-dropdown variant="outline-light" offset="8">
        <template #button-content><user-icon /></template>
        <b-dropdown-item to="/signout">Sign Out</b-dropdown-item>
      </b-dropdown>
    </nav>
    <slot />
  </main>
</template>

<script lang="ts">
import UserIcon from '@/icons/UserIcon.vue';

export default {
  components: { UserIcon },
  methods: {
    isActive(name: string) {
      return this.$route.name === name;
    },
  },

  name: 'AuthLayout',
};
</script>

<style scoped>
#app {
  max-width: 768px;
}
</style>
