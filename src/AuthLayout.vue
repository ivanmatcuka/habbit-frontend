<template>
  <main class="text-white m-auto d-flex flex-column py-md-8 min-vh-100">
    <nav
      class="d-flex gap-2 align-items-center px-2 justify-content-between sticky-bottom position-md-static pt-1 pb-4 p-md-0 bg-body w-100 order-2"
    >
      <div class="d-flex gap-2">
        <b-button to="/" variant="outline-light" :active="isActive('home')">Home</b-button>
        <b-button to="/habits" variant="outline-light" :active="isActive('habits')"
          >Habits</b-button
        >
      </div>
      <b-dropdown variant="outline-light" offset="8">
        <template #button-content><user-icon /></template>
        <b-dropdown-item to="/signout">Sign Out</b-dropdown-item>
      </b-dropdown>
    </nav>
    <div class="order-1 px-2 order-md-2 py-4 py-0 flex-grow-1">
      <slot />
    </div>
  </main>
</template>

<script lang="ts">
import UserIcon from '~shared/icons/UserIcon.vue';

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
main {
  max-width: 768px;
}
</style>
