<template>
  <page-placeholder v-if="isLoading && !task" />
  <auth-layout v-else-if="task">
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
        <b-button :loading="isLoading" type="submit" variant="dark" loading-fill>Save</b-button>
      </div>
    </b-form>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue';

import tasksService, { type Task } from '../services/tasks';

export const OPTIONS = [
  { text: 1, value: 1 },
  { text: 2, value: 2 },
  { text: 3, value: 3 },
  { text: 4, value: 4 },
  { text: 5, value: 5 },
  { text: 6, value: 6 },
  { text: 7, value: 7 },
];

type EditComponentState = {
  isLoading: boolean;
  options: typeof OPTIONS;
  task: null | Task;
};

export default {
  components: { AuthLayout },
  data(): EditComponentState {
    return {
      isLoading: false,
      options: OPTIONS,
      task: null,
    };
  },

  methods: {
    async submit(event: Event) {
      if (!this.task) return;

      event.preventDefault();

      const fields = {
        frequency: this.task.frequency,
        title: this.task.title,
      };

      this.isLoading = true;

      const { error } = await tasksService.updateTask(String(this.task.id), fields);

      if (error) {
        console.error('Failed to fetch tasks:', error);
        return;
      }

      await this.$router.push({
        name: 'habits',
      });
    },
  },

  async mounted() {
    this.isLoading = true;

    const { data, error } = await tasksService.getTask(this.$route.params.id as string);

    this.isLoading = false;

    if (error) {
      console.error('Failed to fetch tasks:', error);
      return;
    }

    this.task = data ?? null;
  },

  name: 'EditPage',
};
</script>
