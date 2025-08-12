<template>
  <auth-layout>
    <b-form class="d-flex flex-column mt-5 gap-4" @submit="submit">
      <h1 class="text-white">Add Task</h1>

      <!-- Title field -->
      <b-form-group
        label-size="lg"
        label="Title"
        description="What exactly do you want to do repeatedly?"
        label-class="mb-1 p-0"
      >
        <b-form-input
          v-model="title"
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
          placeholder="Enter title"
          required
        />
      </b-form-group>

      <!-- Frequency -->
      <b-form-group
        label-size="lg"
        label-class="mb-1 p-0"
        label="Frequency"
        description="How many times per week do you want to do this?"
      >
        <b-form-select
          v-model="frequency"
          :options="options"
          required
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
        />
      </b-form-group>

      <div>
        <b-button type="submit" variant="dark" :loading="isLoading" loading-fill>Add</b-button>
      </div>
    </b-form>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue'
import tasksService from '../services/tasks'

export const OPTIONS = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
  { value: 4, text: 4 },
  { value: 5, text: 5 },
  { value: 6, text: 6 },
  { value: 7, text: 7 },
]

type AddComponentState = {
  isLoading: boolean
  options: typeof OPTIONS
  title: string
  frequency: number
}

export default {
  name: 'AddPage',
  components: { AuthLayout },

  data(): AddComponentState {
    return {
      isLoading: false,
      options: OPTIONS,
      title: '',
      frequency: 1,
    }
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault()

      const data = {
        title: this.title,
        frequency: this.frequency,
      }

      this.isLoading = true

      const { error } = await tasksService.createTask(data)

      if (!error) {
        await this.$router.push({
          name: 'habits',
        })
      }

      this.isLoading = false
    },
  },
}
</script>
