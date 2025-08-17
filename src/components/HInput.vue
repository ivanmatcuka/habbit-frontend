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
  components: {},
  computed: {
    errorMessage(): string | undefined {
      return this.error?.errors?.[this.name]?.join(', ')
    },
  },

  emits: ['update:value'],

  name: 'HInput',

  props: {
    description: {
      required: true,
      type: String,
    },
    error: {
      required: true,
      type: Object as PropType<{
        code?: string
        errors?: Record<string, string[]>
        message?: string
      }>,
    },
    label: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String as PropType<InputType>,
    },
    value: {
      required: true,
      type: String,
    },
  },
}
</script>
