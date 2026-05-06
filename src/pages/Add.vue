<template>
  <auth-layout>
    <b-form class="d-flex flex-column gap-4" @submit="submit">
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
          :disabled="isLoading"
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
          :options="FREQUENCY_OPTIONS"
          :disabled="isLoading"
          required
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
        />
      </b-form-group>

      <!-- Type -->
      <b-form-group
        label-size="lg"
        label-class="mb-1 p-0"
        label="Type"
        description="Do you want to do this or avoid doing this?"
      >
        <b-form-select
          v-model="type"
          :options="TYPE_OPTIONS"
          :disabled="isLoading"
          required
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
        />
      </b-form-group>

      <div class="d-flex gap-2 flex-wrap">
        <b-button type="submit" variant="dark" :loading="isLoading" loading-fill>Add</b-button>
        <b-button type="button" variant="outline-light" :disabled="isLoading" to="/habits"
          >Cancel</b-button
        >
      </div>
    </b-form>
  </auth-layout>
</template>

<script lang="ts">
import AuthLayout from '@/AuthLayout.vue';

import tasksService, { type Task } from '../services/tasks';

export const FREQUENCY_OPTIONS = [
  { text: 1, value: 1 },
  { text: 2, value: 2 },
  { text: 3, value: 3 },
  { text: 4, value: 4 },
  { text: 5, value: 5 },
  { text: 6, value: 6 },
  { text: 7, value: 7 },
];

export const TYPE_OPTIONS = ['avoid', 'do'];

type AddComponentState = {
  frequency: number;
  // constant
  FREQUENCY_OPTIONS: typeof FREQUENCY_OPTIONS;
  isLoading: boolean;
  title: string;
  type: Task['type'];
  // constant
  TYPE_OPTIONS: typeof TYPE_OPTIONS;
};

export default {
  components: { AuthLayout },

  data(): AddComponentState {
    return {
      frequency: 1,
      FREQUENCY_OPTIONS,
      isLoading: false,
      title: '',
      type: 'avoid',
      TYPE_OPTIONS,
    };
  },

  methods: {
    async submit(event: Event) {
      event.preventDefault();

      const data = {
        frequency: this.frequency,
        title: this.title,
        type: this.type,
      };

      this.isLoading = true;

      const { error } = await tasksService.createTask(data);

      if (error) return;

      await this.$router.push({
        name: 'habits',
      });

      this.isLoading = false;
    },
  },

  name: 'AddPage',
};
</script>
