<template>
  <page-placeholder v-if="isLoading && !task" />
  <auth-layout v-else-if="task">
    <b-form class="d-flex flex-column gap-4" @submit="submit">
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
          v-model="task.frequency"
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
          v-model="task.type"
          :options="TYPE_OPTIONS"
          :disabled="isLoading"
          required
          class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
        />
      </b-form-group>

      <!-- Button -->

      <div class="d-flex gap-2 flex-wrap">
        <b-button :loading="isLoading" type="submit" variant="dark" loading-fill>Save</b-button>
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
import { FREQUENCY_OPTIONS, TYPE_OPTIONS } from './Add.vue';

type EditComponentState = {
  // constant
  FREQUENCY_OPTIONS: typeof FREQUENCY_OPTIONS;
  isLoading: boolean;
  task: null | Task;
  // constant
  TYPE_OPTIONS: typeof TYPE_OPTIONS;
};

export default {
  components: { AuthLayout },
  data(): EditComponentState {
    return {
      FREQUENCY_OPTIONS,
      isLoading: false,
      task: null,
      TYPE_OPTIONS,
    };
  },

  methods: {
    async submit(event: Event) {
      if (!this.task) return;

      event.preventDefault();

      const fields = {
        frequency: this.task.frequency,
        title: this.task.title,
        type: this.task.type,
      };

      this.isLoading = true;

      const { error } = await tasksService.updateTask(String(this.task.id), fields);

      this.isLoading = false;

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
