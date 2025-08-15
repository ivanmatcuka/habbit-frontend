<template>
  <b-card class="rounded-3 border-2" bg-variant="dark-subtle">
    <b-card-body class="py-3 px-4 d-flex justify-content-between">
      <slot />
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
export default {
  name: 'RowItem',
}
</script>
