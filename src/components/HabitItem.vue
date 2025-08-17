<template>
  <row-item>
    <!-- Content -->
    <div v-if="task" class="d-flex flex-column">
      <b-card-text class="text-white fs-4 mb-1">
        {{ task.title }}
      </b-card-text>
      <b-card-text class="text-gray-100 fs-6">
        {{ getFrequencyString(task.frequency) }}
      </b-card-text>
    </div>

    <!-- Controls -->
    <div class="d-flex gap-1 flex-column align-items-center">
      <b-button class="p-1" variant="link" :to="`/edit/${task?.id}`">
        <edit-icon />
      </b-button>

      <b-tooltip
        v-model="modal"
        placement="top"
        :click="true"
        :close-on-hide="true"
        body-class="rounded-3 py-2 px-3"
      >
        <template #target>
          <b-button class="p-1" variant="link" @click="modal = true">
            <trash-icon />
          </b-button>
        </template>

        <div class="d-flex flex-column gap-1">
          <span>Are you sure you want to delete this task?</span>
          <br />
          <b-button
            variant="danger"
            :loading="isDeleting"
            size="sm"
            loading-fill
            @click="confirmDelete"
            >Yes</b-button
          >
        </div>
      </b-tooltip>
    </div>
  </row-item>
</template>

<script lang="ts">
import { type PropType } from 'vue';

import EditIcon from '@/icons/EditIcon.vue';
import TrashIcon from '@/icons/TrashIcon.vue';
import tasksService, { type Task } from '@/services/tasks';
import { getFrequencyString } from '@/utils/getFrequencyString';

export default {
  components: { EditIcon, TrashIcon },
  data() {
    return {
      isDeleting: false,
      modal: false,
    };
  },

  methods: {
    async confirmDelete() {
      if (!this.task) return;

      this.isDeleting = true;

      const { error } = await tasksService.deleteTask(String(this.task.id));

      if (!error) {
        this.onDelete?.(this.task.id);
      }

      this.isDeleting = false;
    },
    getFrequencyString,
  },

  name: 'HabitItem',

  props: {
    onDelete: Function as PropType<(id?: number) => void>,
    task: Object as PropType<Task>,
  },
};
</script>
