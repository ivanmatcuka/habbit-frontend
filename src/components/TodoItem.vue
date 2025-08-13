<template>
  <b-card
    class="rounded-3 border-2"
    body-class="py-3 px-4 d-flex justify-content-between"
    bg-variant="dark-subtle"
  >
    <div class="d-flex gap-2 align-items-center">
      <b-button class="p-0" variant="link" size="sm" @click="onDo">
        <CirclieIcon v-if="!done" />
        <CheckedCirclieIcon v-else />
      </b-button>
      <b-card-text class="fs-5" :class="{ 'text-secondary': done, 'text-light': !done }">
        {{ task?.title }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import { type Task } from '@/services/tasks'

import CirclieIcon from '../icons/CirclieIcon.vue'
import CheckedCirclieIcon from '../icons/CheckedCirclieIcon.vue'

export default defineComponent({
  name: 'TodoItem',
  components: { CirclieIcon, CheckedCirclieIcon },

  props: {
    done: Boolean,
    task: Object as PropType<Task>,
    onDo: Function as PropType<(payload: MouseEvent) => void>,
  },
})
</script>
