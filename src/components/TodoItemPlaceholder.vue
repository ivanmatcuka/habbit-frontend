<template>
  <row-item>
    <div class="d-flex gap-2 flex-fill align-items-center">
      <b-button class="p-0" variant="link" size="sm">
        <b-spinner class="spinner" />
      </b-button>
      <div class="flex-fill">
        <b-placeholder size="sm" animation="wave" />
      </div>
    </div>
  </row-item>
</template>

<script lang="ts">
import RowItem from './RowItem.vue'

export default {
  name: 'TodoItemPlaceholder',
  components: { RowItem },
}
</script>

<style scoped lang="scss">
.spinner {
  display: block;
  width: 24px;
  height: 24px;
}
</style>
