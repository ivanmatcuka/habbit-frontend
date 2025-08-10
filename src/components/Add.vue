<template>
  <div>
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

      <!-- Button -->

      <div>
        <b-button
          v-if="!isLoading"
          type="submit"
          variant="outline-light"
          class="btn-bd-primary rounded-1 px-3 py-2 lh-1 border-2"
          >Add</b-button
        >
        <b-spinner v-else key="primary" variant="primary" type="grow" />
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
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
  components: {},

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

      try {
        await tasksService.createTask(data)
        await this.$router.push({
          name: 'habits',
        })
      } catch (ex) {
        console.log(ex)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
