<template>
  <div v-if="task">
    <b-form class="mt-5" @submit="submit">
      <!-- Title field -->
      <b-form-group label="Title" description="What exactly do you want to do repeatedly?">
        <b-form-input v-model="task.title" placeholder="Enter title" required />
      </b-form-group>

      <!-- Frequency -->
      <b-form-group label="Frequency" description="How many times per week do you want to do this?">
        <b-form-select v-model="task.frequency" :options="options" required />
      </b-form-group>

      <!-- Button -->
      <b-button v-if="!isLoading" type="submit" variant="outline-primary"> Save </b-button>
      <b-spinner v-else key="primary" variant="primary" type="grow" />
    </b-form>
  </div>
</template>

<script lang="ts">
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
  components: {},

  data(): EditComponentState {
    return {
      task: null,
      isLoading: false,
      options: OPTIONS,
    }
  },

  async mounted() {
    this.task = await tasksService.getTask(this.$route.params.id as string)
  },

  methods: {
    async submit(event: Event) {
      if (!this.task) return

      event.preventDefault()

      const data = {
        title: this.task.title,
        frequency: this.task.frequency,
      }

      this.isLoading = true

      try {
        await tasksService.updateTask(String(this.task.id), data)
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
