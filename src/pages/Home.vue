<template>
  <auth-layout>
    <div class="d-flex flex-column gap-6">
      <nav class="d-flex align-items-center justify-content-between">
        <b-button variant="outline-light" @click="goDayBack">
          <chevron-left-icon />
        </b-button>
        <h1 class="text-center text-white">{{ date.format('MMM Do YYYY') }}</h1>
        <b-button variant="outline-light" :disabled="!canGoForward" @click="goDayForward">
          <chevron-right-icon />
        </b-button>
      </nav>

      <div class="mt-4 d-flex flex-column gap-2">
        <h2 class="text-white">To-Do</h2>

        <div class="d-flex flex-column gap-2">
          <todo-item
            v-for="task in uncompletedTasks"
            :key="task.id"
            :done="false"
            :task="task"
            :on-do="() => completeTask(task.id)"
          />
        </div>
      </div>

      <div v-if="completedTasks.length" class="mt-4 d-flex flex-column gap-2">
        <h2 class="text-white">Done</h2>

        <div v-for="task in completedTasks" :key="task.id">
          <todo-item :done="true" :task="task" :on-do="() => uncompleteTask(task)" />
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import tasksService, { type Task } from '@/services/tasks'
import moment from 'moment'
import AuthLayout from '@/AuthLayout.vue'

type HomePageState = {
  tasks: Task[]
  isLoading: boolean
  date: ReturnType<typeof moment>
}

export default defineComponent({
  name: 'HomePage',
  components: { AuthLayout },

  data(): HomePageState {
    return {
      tasks: [],
      isLoading: false,
      date: moment(),
    }
  },

  computed: {
    completedTasks() {
      return this.tasks.filter((task) =>
        task.completions.some((completion) =>
          moment(completion.completed_at).isSame(this.date, 'day'),
        ),
      )
    },

    uncompletedTasks() {
      const completedIds = this.completedTasks.map((task) => task.id)

      return this.tasks.filter((task) => !completedIds.includes(task.id))
    },

    canGoForward() {
      return moment().diff(this.date, 'days') > 0
    },
  },

  async mounted() {
    this.fetchTasks()
  },

  methods: {
    async completeTask(id: number) {
      const { error } = await tasksService.completeTask(String(id), {
        completed_at: this.date.format('YYYY-MM-DD HH:mm:ss'),
      })
      if (error) return

      this.fetchTasks()
    },

    async uncompleteTask(task: Task) {
      const completion = task.completions.find(({ completed_at }) =>
        moment(completed_at).isSame(this.date, 'day'),
      )

      if (completion) {
        const { error } = await tasksService.uncompleteTask(String(completion.id))
        if (error) return

        this.fetchTasks()
      }
    },

    async fetchTasks() {
      this.isLoading = true

      const { data, error } = await tasksService.getTasks()

      if (error) {
        console.error('Failed to fetch tasks:', error)
      }

      this.tasks = data ?? []
      this.isLoading = false
    },

    goDayBack() {
      this.date = this.date.clone().subtract(1, 'days')
    },

    goDayForward() {
      this.date = this.date.clone().add(1, 'days')
    },
  },
})
</script>
