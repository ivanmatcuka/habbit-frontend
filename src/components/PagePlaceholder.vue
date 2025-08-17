<template>
  <auth-layout>
    <b-form class="d-flex flex-column mt-5 gap-4">
      <h1 class="text-white">Loading...</h1>

      <!-- Title field -->
      <div>
        <b-placeholder size="sm" animation="wave" />
        <b-placeholder size="lg" animation="wave" />
        <b-placeholder size="xs" animation="wave" />
      </div>

      <div>
        <b-placeholder size="sm" animation="wave" />
        <b-placeholder size="lg" animation="wave" />
        <b-placeholder size="xs" animation="wave" />
      </div>

      <!-- Button -->
      <div>
        <b-button type="submit" variant="dark" loading loading-fill>Save</b-button>
      </div>
    </b-form>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue';

export default {
  components: { AuthLayout },
  name: 'PagePlaceholder',
};
</script>
