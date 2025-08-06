<template>
  <b-card class="rounded-4 py-2 px-4">
    <b-card-text class="text-white fs-5">{{ task?.title }}</b-card-text>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import tasksService, { type Task } from '../services/tasks'
import moment from 'moment'

export default defineComponent({
  name: 'TodoItem',
  components: {},

  props: {
    task: Object as PropType<Task>,
    done: Boolean,
  },

  methods: {
    async completeTask() {
      if (!this.task?.id) return

      await tasksService.completeTask(String(this.task?.id), {
        completed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      })
    },
  },
})
</script>

<style lang="sass" scoped>
$smokey-black-default: #100C08
$smokey-black-100: #E7E7E6
$smokey-black-200: #CFCECE
$smokey-black-300: #B7B6B5
$smokey-black-400: #9F9E9C
$smokey-black-500: #888684
$smokey-black-600: #706D6B
$smokey-black-700: #585552
$smokey-black-800: #403D39
$smokey-black-900: #282421

.card
  background-color: $smokey-black-900
  border: solid 2px $smokey-black-800
</style>
