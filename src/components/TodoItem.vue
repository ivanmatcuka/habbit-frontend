<template>
  <row-item>
    <div class="d-flex gap-2 align-items-center">
      <b-button class="p-0" variant="link" size="sm" @click="onDo">
        <b-spinner v-if="isCompleting" class="spinner" />
        <CirclieIcon v-else-if="!done" />
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

import CheckedCirclieIcon from '@/icons/CheckedCirclieIcon.vue'
import CirclieIcon from '@/icons/CirclieIcon.vue'
import { type Task } from '@/services/tasks'

import RowItem from './RowItem.vue'

export default {
  components: { CheckedCirclieIcon, CirclieIcon, RowItem },
  name: 'TodoItem',

  props: {
    done: Boolean,
    isCompleting: Boolean,
    onDo: Function as PropType<(payload: MouseEvent) => void>,
    task: Object as PropType<Task>,
  },
}
</script>

<style scoped lang="scss">
.spinner {
  display: block;
  width: 24px;
  height: 24px;
}
</style>
