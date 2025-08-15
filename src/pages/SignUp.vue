<template>
  <unauth-layout>
    <b-form class="d-flex flex-column mt-5 gap-4" @submit="submit">
      <h1 class="text-white">Sign Up</h1>

      <!-- Name field -->
      <h-input
        label="Name"
        description="Enter your name"
        placeholder="Enter name"
        name="name"
        type="text"
        :value="name"
        :error="error"
        @update:value="name = $event"
      />

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

      <!-- Password confirmation field -->
      <h-input
        label="Confirm Password"
        description="Re-enter your password"
        placeholder="Confirm password"
        name="confirm_password"
        type="password"
        :value="confirmPassword"
        :error="confirmPasswordError"
        @update:value="confirmPassword = $event"
      />

      <b-form-text v-if="error?.message && !error?.errors" text-variant="danger">
        Error occurred. Please try again later
      </b-form-text>

      <div class="d-flex gap-2">
        <b-button :loading="isLoading" type="submit" variant="dark" loading-fill>Sign Up</b-button>
        <b-button :disabled="isLoading" variant="outline-light" to="/signin">Sign In</b-button>
      </div>
    </b-form>
  </unauth-layout>
</template>

<script lang="ts">
import UnauthLayout from '@/UnauthLayout.vue'
import userService from '@/services/user'
import { useUserStore } from '@/stores/user'
import { mapStores } from 'pinia'

type SignUpPageState = {
  isLoading: boolean
  name: string
  email: string
  password: string
  confirmPassword: string
  error: {
    errors?: Record<string, string[]>
    message?: string
    code?: string
  }
}

export default {
  name: 'SignUpPage',
  components: { UnauthLayout },

  data(): SignUpPageState {
    return {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      error: {},
    }
  },

  computed: {
    ...mapStores(useUserStore),
    confirmPasswordError() {
      if (this.confirmPassword !== this.password) {
        return { errors: { confirm_password: ['Passwords do not match'] } }
      }

      return {}
    },
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault()

      this.isLoading = true

      const { name, email, password, confirmPassword } = this
      const { data, error } = await userService.signUp(name, email, password, confirmPassword)

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
