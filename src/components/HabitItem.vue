<template>
  <b-card
    class="rounded-3 border-2"
    body-class="py-3 px-4 d-flex gap-2 justify-content-between"
    bg-variant="dark-subtle"
  >
    <div v-if="task" class="d-flex flex-column">
      <b-card-text class="text-white fs-4 mb-1">
        {{ task.title }}
      </b-card-text>
      <b-card-text class="text-gray-100 fs-6">
        {{ getFrequencyString(task.frequency) }}
      </b-card-text>
    </div>
    <div class="d-flex gap-2 flex-column align-items-center">
      <b-button class="p-0" variant="link" :to="`/edit/${task?.id}`">
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
          <b-button class="p-0" variant="link" @click="modal = true">
            <trash-icon />
          </b-button>
        </template>

        <div class="d-flex flex-column gap-1">
          <span>Are you sure you want to delete this task?</span>
          <br />
          <b-button
            variant="danger"
            class="rounded-pill p-1 lh-1 border-2"
            size="sm"
            @click="onDelete?.(task?.id)"
          >
            Yes
          </b-button>
        </div>
      </b-tooltip>
    </div>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type Task } from '@/services/tasks'
import EditIcon from './EditIcon.vue'
import TrashIcon from './TrashIcon.vue'
export default defineComponent({
  name: 'HabitItem',
  components: { EditIcon, TrashIcon },

  props: {
    task: Object as PropType<Task>,
    onDelete: Function as PropType<(id?: number) => void>,
  },

  data() {
    return {
      modal: false,
    }
  },

  methods: {
    getFrequencyString(n: number) {
      let times = 'time'
      if (n !== 1) times = times + 's'

      return `${n} ${times} per week`
    },
  },
})
</script>
