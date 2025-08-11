<template>
  <auth-layout v-if="task">
    <b-form class="d-flex flex-column mt-5 gap-4" @submit="submit">
      <h1 class="text-white">Edit Task "{{ task.title }}"</h1>

      <!-- Title field -->
      <b-form-group
        label-size="lg"
        label="Title"
        description="What exactly do you want to do repeatedly?"
        label-class="mb-1 p-0"
      >
        <b-form-input
          v-model="task.title"
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
          v-model="task.frequency"
          :options="options"
          required
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
        />
      </b-form-group>

      <!-- Button -->

      <div>
        <b-button
          v-if="!isLoading"
          type="submit"
          variant="outline-light"
          class="btn-bd-primary rounded-1 px-3 py-2 lh-1 border-2"
          >Save</b-button
        >
        <b-spinner v-else key="primary" variant="primary" type="grow" />
      </div>
    </b-form>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue'
import tasksService, { type Task } from '../services/tasks'

export const OPTIONS = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
  { value: 4, text: 4 },
  { value: 5, text: 5 },
  { value: 6, text: 6 },
  { value: 7, text: 7 },
]

type EditComponentState = {
  task: Task | null
  isLoading: boolean
  options: typeof OPTIONS
}

export default {
  name: 'EditPage',
  components: { AuthLayout },

  data(): EditComponentState {
    return {
      task: null,
      isLoading: false,
      options: OPTIONS,
    }
  },

  async mounted() {
    const { data, error } = await tasksService.getTask(this.$route.params.id as string)

    if (error) {
      console.error('Failed to fetch tasks:', error)
    }

    this.task = data ?? null
  },

  methods: {
    async submit(event: Event) {
      if (!this.task) return

      event.preventDefault()

      const fields = {
        title: this.task.title,
        frequency: this.task.frequency,
      }

      this.isLoading = true

      const { error } = await tasksService.updateTask(String(this.task.id), fields)

      if (error) {
        console.error('Failed to fetch tasks:', error)
        return
      }

      await this.$router.push({
        name: 'habits',
      })
    },
  },
}
</script>
