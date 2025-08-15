<template>
  <nav class="d-flex align-items-center justify-content-between">
    <b-button variant="outline-light" @click="goDayBack">
      <chevron-left-icon />
    </b-button>
    <h1 class="text-center text-white">{{ date.format('MMM Do YYYY') }}</h1>
    <b-button variant="outline-light" :disabled="!canGoForward" @click="goDayForward">
      <chevron-right-icon />
    </b-button>
  </nav>
</template>

<script lang="ts">
import moment from 'moment'

import ChevronLeftIcon from '@/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/icons/ChevronRightIcon.vue'

export default {
  name: 'DatePicker',
  components: { ChevronLeftIcon, ChevronRightIcon },

  props: {
    date: {
      type: Object as () => ReturnType<typeof moment>,
      required: true,
    },
  },
  emits: ['update:date'],

  computed: {
    canGoForward() {
      return moment().diff(this.date, 'days') > 0
    },
  },

  methods: {
    goDayBack() {
      const date = this.date.clone().subtract(1, 'days')
      this.$emit('update:date', date)
    },

    goDayForward() {
      const date = this.date.clone().add(1, 'days')
      this.$emit('update:date', date)
    },
  },
}
</script>
