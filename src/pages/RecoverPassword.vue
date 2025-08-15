<template>
  <unauth-layout>
    <b-form v-if="!isSent" class="d-flex flex-column mt-5 gap-4" @submit="submit">
      <h1 class="text-white">Recover Password</h1>
      <h-input
        label="Email"
        description="Enter your email to recover password"
        placeholder="Enter email"
        name="email"
        type="email"
        :value="email"
        :error="error"
        @update:value="email = $event"
      />

      <b-form-text v-if="error?.message && !error?.errors" text-variant="danger">
        Error occurred. Please try again later
      </b-form-text>

      <div class="d-flex gap-2">
        <b-button :loading="isLoading" type="submit" variant="dark" loading-fill>Recover</b-button>
        <b-button :disabled="isLoading" variant="outline-light" to="/signin">Sign In</b-button>
      </div>
    </b-form>
    <div v-else>
      <h1 class="text-white">Check your email!</h1>
      <p class="text-muted">
        We have sent you an email with instructions to recover your password.
      </p>
      <b-button variant="dark" to="/signin">Sign In</b-button>
    </div>
  </unauth-layout>
</template>

<script lang="ts">
import UnauthLayout from '@/UnauthLayout.vue'
import userService from '@/services/user'

type RecoverPasswordPageState = {
  isLoading: boolean
  isSent: boolean
  email: string
  error: {
    errors?: Record<string, string[]>
    message?: string
    code?: string
  }
}

export default {
  name: 'RecoverPasswordPage',
  components: { UnauthLayout },

  data(): RecoverPasswordPageState {
    return {
      isLoading: false,
      email: '',
      error: {},
      isSent: false,
    }
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault()
      this.isLoading = true

      const { error } = (await userService.recoverPassword?.(this.email)) ?? {}

      this.error = error ?? {}
      this.isLoading = false

      if (error) return

      this.isSent = true
    },
  },
}
</script>
