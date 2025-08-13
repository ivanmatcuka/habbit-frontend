<template>
  <auth-layout>
    <div class="d-flex flex-column gap-2 mb-6">
      <h2 class="text-white">Tasks</h2>
      <habit-item v-for="task in tasks" :key="task.id" :task="task" :on-delete="confirmDelete" />
    </div>

    <b-button variant="dark" to="/add">Add</b-button>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue'
import tasksService, { type Task } from '@/services/tasks'

const OPTIONS = [
  { value: 1, text: 1 },
  { value: 2, text: 2 },
  { value: 3, text: 3 },
  { value: 4, text: 4 },
  { value: 5, text: 5 },
  { value: 6, text: 6 },
  { value: 7, text: 7 },
]

type HabitsPageState = {
  isLoading: boolean
  title: string
  frequency: number | null
  tasks: Task[]
  selectedTaskId: number | null
  modal: boolean
  options: typeof OPTIONS
}

export default {
  name: 'HabitsPage',
  components: { AuthLayout },

  data(): HabitsPageState {
    return {
      isLoading: false,
      title: '',
      frequency: null,
      tasks: [],
      selectedTaskId: null,
      modal: false,
      options: OPTIONS,
    }
  },

  async mounted() {
    const { data, error } = await tasksService.getTasks()

    if (error) {
      console.error('Failed to fetch tasks:', error)
    }

    this.tasks = data ?? []
  },

  methods: {
    async confirmDelete(selectedTaskId?: number) {
      this.tasks = this.tasks.filter((task) => task.id !== selectedTaskId)
    },

    getFrequencyString(n: number) {
      let times = 'time'

      if (n !== 1) {
        times = times + 's'
      }

      return `${n} ${times} per week`
    },
  },
}
</script>
