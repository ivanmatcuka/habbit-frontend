<template>
  <b-modal
    :id="`modal-delete-${task?.id}`"
    v-model="modal"
    ok-only
    @ok="() => onDelete?.(task?.id)"
  >
    <p class="my-4">Confirm you actually want to delete this task</p>
    {{ task?.title }}
  </b-modal>

  <b-card
    class="rounded-3 border-2"
    body-class="py-3 px-4 d-flex gap-2 justify-content-between"
    bg-variant="dark-subtle"
  >
    <div class="d-flex gap-2 align-items-center">
      <b-card-text v-if="task" class="text-white fs-5">
        <div>{{ task.title }}: {{ getFrequencyString(task.frequency) }}</div>
      </b-card-text>
    </div>
    <div class="d-flex gap-2 flex-column flex-lg-row">
      <b-button class="p-0" variant="link" :to="`/edit/${task?.id}`">
        <edit-icon />
      </b-button>
      <b-button class="p-0" variant="link" @click="modal = true">
        <trash-icon />
      </b-button>
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
