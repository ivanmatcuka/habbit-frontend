<template>
  <unauth-layout class="d-flex flex-column mt-5 gap-4">
    <h1 class="text-white text-center">Signin Out...</h1>
  </unauth-layout>
</template>

<script lang="ts">
import { mapStores } from 'pinia'

import { useUserStore } from '@/stores/user'
import UnauthLayout from '@/UnauthLayout.vue'

export default {
  components: { UnauthLayout },
  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async signOut() {
      this.userStore.clearUser()
      this.$router.push({ name: 'signin' })
    },
  },

  mounted() {
    this.signOut()
  },

  name: 'SignOutPage',
}
</script>
