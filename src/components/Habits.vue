<template>
  <div>

    <!-- Modal -->
    <b-modal id="modal-create" hide-footer>
      <b-form @submit="submit">

        <!-- Title field -->
        <b-form-group
          label="Title"
          description="What exactly do you want to do repeatedly?"
        >
          <b-form-input
            v-model="title"
            placeholder="Enter title"
            required
          />
        </b-form-group>

        <!-- Frequency -->
        <b-form-group
          label="Frequency"
          description="How many times per week do you want to do this?"
        >
          <b-form-select v-model="frequency" :options="options" required/>
        </b-form-group>

        <!-- Button -->
        <b-button
          v-if="!isLoading"
          type="submit"
          variant="outline-primary"
          class="font-weight-bold"
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
    </b-modal>

    <!-- Modal -->
    <b-modal id="modal-delete" ok-only @ok="confirmDelete" @close="cancelDelete">
      <p class="my-4">Confirm you actually want to delete this task</p>
    </b-modal>

    <!-- List -->
    <b-list-group>

      <b-list-group-item
        v-for="task in tasks"
        v-bind:key="task.id"
        class="d-flex align-items-center justify-content-between"
      >

          <!-- Title -->
          <div>{{ task.title }}: {{ getFrequencyString(task.frequency) }}</div>

          <!-- Buttons -->
          <div>

            <!-- Edit -->
            <router-link :to="{ name: 'edit', params: { id: task.id } }">
              <b-button variant="secondary" class="mr-2">
                <b-icon icon="pencil-square" />
              </b-button>
            </router-link>

            <!-- Delete -->
            <b-button variant="danger" @click="openDeleteModal(task.id)">
              <b-icon icon="trash-fill" />
            </b-button>

          </div>

      </b-list-group-item>

    </b-list-group>

    <!-- Add button -->
    <b-button @click="openCreateModal" variant="success" class="mt-2 font-weight-bold">Add</b-button>

  </div>
</template>

<script>
import tasksService from '@/services/tasks'

export default {
  name: 'Habits',
  components: {},

  data() {
    return {
      isLoading: false,
      title: '',
      frequency: null,
      tasks: [],
      selectedTask: null,
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
     * Opens the delete modal.
     *
     * @param {number} id - Selected task ID.
     * @return {void}
     */
    openDeleteModal(id) {
      this.$bvModal.show('modal-delete');
      this.selectedTask = id;
    },

    openCreateModal() {
      this.$bvModal.show('modal-create');
    },

    /**
     * Resets the selected task.
     *
     * @return {void}
     */
    cancelDelete() {
      this.selectedTask = null;
    },

    /**
     * Confirms the deleting.
     *
     * @return {Promise<void>}
     */
    async confirmDelete() {
      if (!this.selectedTask) {
        return;
      }

      try {
        await tasksService.deleteTask(this.selectedTask);
      } catch (ex) {
        console.log(ex);
      }

      this.tasks = this.tasks.filter((task) => task.id !== this.selectedTask);
      this.selectedTask = null;
    },

    /**
     * Generates frequency strings.
     */
    getFrequencyString(n) {
      let times = 'time';

      if (n !== 1) {
        times = times + 's';
      }

      return `${n} ${times} per week`;
    },

    /**
     * Submits the form to add a task.
     * 
     * @param {any} event - Event object.
     * @return {Promise<void>}
     */
    async submit(event) {
      event.preventDefault();

      const data = {
        title: this.title,
        frequency: this.frequency,
      }

      try {
        const result = await tasksService.createTask(data);
        this.tasks = [result, ...this.tasks];
      } catch (ex) {
        console.error(ex);
      } finally {
        this.$bvModal.hide('modal-create');
      }
    },
  },
  
  async mounted() {
    try {
      this.tasks = await tasksService.getTasks();
    } catch (ex) {
      console.log(ex);
    }
  }
}
</script>
