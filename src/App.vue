<template>
  <router-view />
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import { useUserStore } from '@/stores/user'

export default defineComponent({
  name: 'App',
  components: {},
  computed: {
    ...mapStores(useUserStore),
  },

  mounted() {
    console.log('App mounted', this.userStore.isLoggedIn)
  },

  methods: {
    isActive(name: string) {
      return this.$route.name === name
    },
  },
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Rubik', sans-serif;
}
</style>

<style lang="scss" scoped>
.nav-link.active a {
  color: white;
}
</style>
