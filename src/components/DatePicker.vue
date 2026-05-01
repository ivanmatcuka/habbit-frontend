<template>
  <nav class="d-flex align-items-center justify-content-between sticky-md-top bg-body">
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
import moment from 'moment';
import { defineComponent } from 'vue';
import ChevronLeftIcon from '~shared/icons/ChevronLeftIcon.vue';
import ChevronRightIcon from '~shared/icons/ChevronRightIcon.vue';

export default defineComponent({
  components: { ChevronLeftIcon, ChevronRightIcon },

  computed: {
    canGoForward() {
      return moment().diff(this.date, 'days') > 0;
    },
  },
  emits: ['update:date'],
  methods: {
    goDayBack() {
      const date = this.date.clone().subtract(1, 'days');
      this.$emit('update:date', date);
    },

    goDayForward() {
      const date = this.date.clone().add(1, 'days');
      this.$emit('update:date', date);
    },
  },

  name: 'DatePicker',

  props: {
    date: {
      required: true,
      type: Object as () => ReturnType<typeof moment>,
    },
  },
});
</script>
