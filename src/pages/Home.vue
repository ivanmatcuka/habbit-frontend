<template>
  <auth-layout>
    <div class="d-flex flex-column gap-6">
      <date-picker :date="date" @update:date="date = $event" />

      <div class="mt-4">
        <div v-if="isLoading" class="d-flex flex-column gap-2">
          <h2 class="text-white">Loading...</h2>
          <todo-item-placeholder v-for="value in Array(3).fill(0)" :key="value" />
        </div>

        <div v-else class="d-flex flex-column gap-8">
          <div v-if="uncompletedTasks.length" class="d-flex flex-column gap-2">
            <h2 class="text-white">To-Do</h2>
            <todo-item
              v-for="task in uncompletedTasks"
              :key="task.id"
              :done="false"
              :task="task"
              :on-do="() => completeTask(task.id)"
              :is-completing="isCompletingId === task.id"
            />
          </div>
          <div v-if="completedTasks.length" class="d-flex flex-column gap-2">
            <h2 class="text-white">Done</h2>
            <todo-item
              v-for="task in completedTasks"
              :key="task.id"
              :done="true"
              :task="task"
              :on-do="() => uncompleteTask(task)"
              :is-completing="isCompletingId === task.id"
            />
          </div>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script lang="ts">
import moment from 'moment';

import AuthLayout from '@/AuthLayout.vue';
import tasksService, { type Task } from '@/services/tasks';

type HomePageState = {
  date: ReturnType<typeof moment>;
  isCompletingId: null | number;
  isLoading: boolean;
  tasks: Task[];
};

export default {
  components: { AuthLayout },
  computed: {
    completedTasks() {
      return this.tasks.filter((task) =>
        task.completions.some((completion) =>
          moment(completion.completed_at).isSame(this.date, 'day'),
        ),
      );
    },

    uncompletedTasks() {
      const completedIds = this.completedTasks.map((task) => task.id);

      return this.tasks.filter((task) => !completedIds.includes(task.id));
    },
  },

  data(): HomePageState {
    return {
      date: moment(),
      isCompletingId: null,
      isLoading: false,
      tasks: [],
    };
  },

  methods: {
    async completeTask(id: number) {
      this.isCompletingId = id;

      const { error } = await tasksService.completeTask(String(id), {
        completed_at: this.date.format('YYYY-MM-DD HH:mm:ss'),
      });

      if (error) {
        this.isCompletingId = null;
        return;
      }

      this.fetchTasks();
    },

    async fetchTasks() {
      this.isLoading = this.tasks.length === 0;

      const { data, error } = await tasksService.getTasks();

      if (error) {
        console.error('Failed to fetch tasks:', error);
      }

      this.tasks = data ?? [];
      this.isLoading = false;
      this.isCompletingId = null;
    },

    async uncompleteTask(task: Task) {
      this.isCompletingId = task.id;

      const completion = task.completions.find(({ completed_at }) =>
        moment(completed_at).isSame(this.date, 'day'),
      );

      if (completion) {
        const { error } = await tasksService.uncompleteTask(String(completion.id));

        if (error) {
          this.isCompletingId = null;
          return;
        }

        this.fetchTasks();
      }
    },
  },

  async mounted() {
    this.fetchTasks();
  },

  name: 'HomePage',
};
</script>

<style lang="scss" scoped>
.placeholder-glow {
  flex: 1;
}
</style>
