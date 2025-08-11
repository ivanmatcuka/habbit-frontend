<template>
  <unauth-layout>
    <b-form class="d-flex flex-column mt-5 gap-4" :validated="!!error" @submit="submit">
      <h1 class="text-white">Sign In</h1>

      <!-- Email field -->
      <b-form-group
        label-size="lg"
        label="Email"
        description="Enter your email address"
        label-class="mb-1 p-0"
      >
        <b-form-input
          v-model="email"
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
          placeholder="Enter email"
          required
        />
      </b-form-group>

      <!-- Password field -->
      <b-form-group
        label-size="lg"
        label="Password"
        description="Enter your password"
        label-class="mb-1 p-0"
      >
        <b-form-input
          v-model="password"
          type="password"
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
          placeholder="Enter password"
          required
        />
      </b-form-group>

      <!-- Button -->
      <div>
        <b-button
          v-if="!isLoading"
          type="submit"
          variant="outline-light"
          class="btn-bd-primary rounded-1 px-3 py-2 lh-1 border-2"
          >Sign In</b-button
        >
        <b-spinner v-else key="primary" variant="primary" type="grow" />
      </div>
    </b-form>
  </unauth-layout>
</template>

<script lang="ts">
import UnauthLayout from '@/UnauthLayout.vue'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'
import { mapStores } from 'pinia'

type SignInPageState = {
  isLoading: boolean
  error: string
  email: string
  password: string
}

export default {
  name: 'SignInPage',
  components: { UnauthLayout },

  data(): SignInPageState {
    return {
      isLoading: false,
      email: '',
      password: '',
      error: '',
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault()

      const fields = {
        email: this.email,
        password: this.password,
      }

      this.isLoading = true

      const { data, error } = await userService.signIn(fields.email, fields.password)

      this.error = error ?? ''
      this.isLoading = false

      if (data?.user) {
        this.userStore.setUser(data.user, data.access_token)
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
