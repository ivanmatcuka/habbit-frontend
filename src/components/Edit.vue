<template>
  <div v-if="task">
    <b-form class="mt-5" @submit="submit">

      <!-- Title field -->
      <b-form-group
        label="Title"
        description="What exactly do you want to do repeatedly?"
      >
        <b-form-input
          v-model="task.title"
          placeholder="Enter title"
          required
        />
      </b-form-group>

      <!-- Frequency -->
      <b-form-group
        label="Frequency"
        description="How many times per week do you want to do this?"
      >
        <b-form-select v-model="task.frequency" :options="options" required/>
      </b-form-group>

      <!-- Button -->
      <b-button
        v-if="!isLoading"
        type="submit"
        variant="outline-primary"
      >
        Save
      </b-button>
      <b-spinner
        v-else
        variant="primary"
        key="primary"
        type="grow"
      />
    </b-form>
  </div>
</template>

<script>
// Services
import tasksService from '../services/tasks';

export default {
  name: 'Edit',
  components: {},
  data() {
    return {
      task: null,
      isLoading: false,
    }
  },

  computed: {
    /**
     * Returns frequency options.
     *
     * @returns {({text: number, value: number})[]}
     */
    options() {
      return [
        { value: 1, text: 1},
        { value: 2, text: 2},
        { value: 3, text: 3},
        { value: 4, text: 4},
        { value: 5, text: 5},
        { value: 6, text: 6},
        { value: 7, text: 7},
      ]
    }
  },

  methods: {
    /**
     * Submits the form.
     *
     * @param event - Event object.
     * @returns {Promise<void>}
     */
    async submit(event) {
      event.preventDefault();

      const data = {
        title: this.task.title,
        frequency: this.task.frequency,
      };

      this.isLoading = true;

      try {
        await tasksService.updateTask(this.task.id, data);
        await this.$router.push({
          name: 'habits',
        })
      } catch (ex) {
        console.log(ex)
      } finally {
        this.isLoading = false;
      }

    }
  },

  /**
   * Fires once mounted.
   *
   * @returns {Promise<void>}
   */
  async mounted() {
    try {
      this.task = await tasksService.getTask(this.$route.params.id);
    } catch (ex) {
      console.log(ex);
    }
  },
}
</script>

<style>
</style>
