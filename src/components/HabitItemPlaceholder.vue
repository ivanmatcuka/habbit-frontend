<template>
  <row-item>
    <div class="d-flex flex-column flex-fill">
      <b-card-text class="text-white fs-4 mb-1">
        <b-placeholder size="lg" animation="wave" />
      </b-card-text>
      <b-card-text class="text-gray-100 fs-6">
        <b-placeholder size="sm" animation="wave" />
      </b-card-text>
    </div>

    <div class="d-flex gap-1 flex-column align-items-center">
      <b-button class="p-1" variant="link" to="#" disabled>
        <edit-icon />
      </b-button>

      <b-button class="p-1" variant="link" to="#" disabled>
        <trash-icon />
      </b-button>
    </div>
  </row-item>
</template>

<script lang="ts">
import EditIcon from '@/icons/EditIcon.vue';
import TrashIcon from '@/icons/TrashIcon.vue';

export default {
  components: { EditIcon, TrashIcon },
  name: 'HabitItemPlaceholder',
};
</script>
