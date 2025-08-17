<template>
  <unauth-layout>
    <b-form class="d-flex flex-column mt-5 gap-4" @submit="submit">
      <h1 class="text-white">Sign In</h1>

      <!-- Email field -->
      <h-input
        label="Email"
        description="Enter your email"
        placeholder="Enter email"
        name="email"
        type="email"
        :value="email"
        :error="error"
        @update:value="email = $event"
      />

      <!-- Password field -->
      <h-input
        label="Password"
        description="Enter your password"
        placeholder="Enter password"
        name="password"
        type="password"
        :value="password"
        :error="error"
        @update:value="password = $event"
      />

      <div v-if="error?.message && !error?.errors">
        <b-form-text v-if="error?.status === 401" text-variant="danger"
          >{{ error.message }}
        </b-form-text>
        <b-form-text v-else text-variant="danger"
          >Error occurred. Please try again later
        </b-form-text>
      </div>

      <div class="d-flex gap-2 flex-wrap">
        <b-button :loading="isLoading" type="submit" variant="dark" loading-fill>Sign In</b-button>
        <b-button :disabled="isLoading" variant="outline-light" to="/signup">Sign Up</b-button>
        <div class="w-100">
          <b-button :disabled="isLoading" variant="link" to="/recover-password"
            >Forgot Password?</b-button
          >
        </div>
      </div>
    </b-form>
  </unauth-layout>
</template>

<script lang="ts">
import { mapStores } from 'pinia'

import UnauthLayout from '@/UnauthLayout.vue'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'

type SignInPageState = {
  isLoading: boolean
  error: {
    errors?: Record<string, string[]>
    message?: string
    code?: string
    status?: number
  }
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
      error: {},
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault()

      this.isLoading = true

      const { email, password } = this
      const { data, error } = await userService.signIn(email, password)

      this.error = error ?? {}
      this.isLoading = false

      if (data?.user) {
        this.userStore.setUser(data.user, data.access_token)
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
