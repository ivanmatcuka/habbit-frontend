<template>
  <row-item>
    <div class="d-flex gap-2 align-items-center">
      <b-button class="p-0" variant="link" size="sm" @click="onDo">
        <CirclieIcon v-if="!done" />
        <CheckedCirclieIcon v-else />
      </b-button>
      <b-card-text class="fs-5" :class="{ 'text-secondary': done, 'text-light': !done }">
        {{ task?.title }}
      </b-card-text>
    </div>
  </row-item>
</template>

<script lang="ts">
import { type PropType } from 'vue'

import { type Task } from '@/services/tasks'
import CirclieIcon from '@/icons/CirclieIcon.vue'
import CheckedCirclieIcon from '@/icons/CheckedCirclieIcon.vue'

import RowItem from './RowItem.vue'

export default {
  name: 'TodoItem',
  components: { CirclieIcon, CheckedCirclieIcon, RowItem },

  props: {
    done: Boolean,
    task: Object as PropType<Task>,
    onDo: Function as PropType<(payload: MouseEvent) => void>,
  },
}
</script>
