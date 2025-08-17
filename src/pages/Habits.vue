<template>
  <auth-layout>
    <div v-if="isLoading" class="d-flex flex-column gap-2 mb-6">
      <h2 class="text-white">Loading...</h2>
      <habit-item-placeholder v-for="value in Array(3).fill(0)" :key="value" />
    </div>

    <div v-else class="d-flex flex-column gap-2 mb-6">
      <h2 class="text-white">Tasks</h2>
      <habit-item v-for="task in tasks" :key="task.id" :task="task" :on-delete="confirmDelete" />
    </div>

    <b-button variant="dark" to="/add">Add</b-button>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue';
import tasksService, { type Task } from '@/services/tasks';

const OPTIONS = [
  { text: 1, value: 1 },
  { text: 2, value: 2 },
  { text: 3, value: 3 },
  { text: 4, value: 4 },
  { text: 5, value: 5 },
  { text: 6, value: 6 },
  { text: 7, value: 7 },
];

type HabitsPageState = {
  frequency: null | number;
  isLoading: boolean;
  modal: boolean;
  options: typeof OPTIONS;
  selectedTaskId: null | number;
  tasks: Task[];
  title: string;
};

export default {
  components: { AuthLayout },
  data(): HabitsPageState {
    return {
      frequency: null,
      isLoading: false,
      modal: false,
      options: OPTIONS,
      selectedTaskId: null,
      tasks: [],
      title: '',
    };
  },

  methods: {
    confirmDelete(selectedTaskId?: number) {
      this.tasks = this.tasks.filter((task) => task.id !== selectedTaskId);
    },
  },

  async mounted() {
    this.isLoading = true;

    const { data, error } = await tasksService.getTasks();

    if (error) {
      console.error('Failed to fetch tasks:', error);
    }

    this.tasks = data ?? [];
    this.isLoading = false;
  },

  name: 'HabitsPage',
};
</script>

<style lang="scss" scoped>
.placeholder-glow {
  flex: 1;
}
</style>
