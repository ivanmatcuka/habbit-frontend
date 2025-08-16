<template>
  <b-card class="rounded-3 border-2" bg-variant="dark-subtle">
    <div class="d-flex justify-content-between gap-2">
      <slot />
    </div>
  </b-card>
</template>

<script lang="ts">
export default {
  name: 'RowItem',
}
</script>
