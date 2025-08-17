<template>
  <main id="app" class="w-100 p-2 d-flex flex-column justify-content-center align-items-stretch">
    <slot />
  </main>
</template>

<script lang="ts">
export default {
  name: 'UnauthLayout',
};
</script>

<style scoped>
#app {
  margin: auto;
  height: 100vh;
  max-width: 768px;
}
</style>
