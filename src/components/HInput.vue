<template>
  <!-- Email field -->
  <b-form-group
    :label="label"
    label-class="mb-1 p-0"
    label-size="lg"
    :description="errorMessage ? '' : description"
    :aria-errormessage="errorMessage"
    :aria-invalid="errorMessage ? 'true' : 'false'"
    :invalid-feedback="errorMessage"
    :state="errorMessage ? false : null"
  >
    <b-form-input
      :type="type"
      class="px-3 rounded-1 py-2 lh-1 border-2 text-white"
      :model-value="value"
      :placeholder="placeholder"
      :state="errorMessage ? false : null"
      required
      @input="$emit('update:value', $event.target.value)"
    />
  </b-form-group>
</template>

<script lang="ts">
import type { InputType } from 'bootstrap-vue-next'
import type { PropType } from 'vue'

export default {
  name: 'HInput',
  components: {},

  props: {
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<InputType>,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    error: {
      type: Object as PropType<{
        errors?: Record<string, string[]>
        message?: string
        code?: string
      }>,
      required: true,
    },
  },

  emits: ['update:value'],

  computed: {
    errorMessage(): string | undefined {
      return this.error?.errors?.[this.name]?.join(', ')
    },
  },
}
</script>
