<template>
  <div>

    <!-- Modal -->
    <b-modal id="modal-create" hide-footer v-model="modal">
      <b-form @submit="submit">

        <!-- Title field -->
        <b-form-group label="Title" description="What exactly do you want to do repeatedly?">
          <b-form-input v-model="title" placeholder="Enter title" required />
        </b-form-group>

        <!-- Frequency -->
        <b-form-group label="Frequency" description="How many times per week do you want to do this?">
          <b-form-select v-model="frequency" :options="options" required />
        </b-form-group>

        <!-- Button -->
        <b-button v-if="!isLoading" type="submit" variant="outline-primary" class="font-weight-bold">
          Save
        </b-button>
        <b-spinner v-else variant="primary" key="primary" type="grow" />
      </b-form>
    </b-modal>

    <!-- Modal -->
    <b-modal id="modal-delete" ok-only @ok="confirmDelete" @close="cancelDelete">
      <p class="my-4">Confirm you actually want to delete this task</p>
    </b-modal>

    <!-- List -->
    <b-list-group>

      <b-list-group-item v-for="task in tasks" v-bind:key="task.id"
        class="d-flex align-items-center justify-content-between">

        <!-- Title -->
        <div>{{ task.title }}: {{ getFrequencyString(task.frequency) }}</div>

        <!-- Buttons -->
        <div>

          <!-- Edit -->
          <router-link :to="`/edit/${task.id}`">
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

<script lang="ts">
import tasksService, { type Task } from '@/services/tasks'


type HabitsPageState = {
  isLoading: boolean,
  title: string,
  frequency: number | null,
  tasks: Task[],
  selectedTaskId: number | null,
  modal: boolean,
}

export default {
  name: 'HabitsPage',
  components: {},

  data(): HabitsPageState {
    return {
      isLoading: false,
      title: '',
      frequency: null,
      tasks: [],
      selectedTaskId: null,
      modal: false,
    }
  },

  computed: {
    options() {
      return [
        { value: 1, text: 1 },
        { value: 2, text: 2 },
        { value: 3, text: 3 },
        { value: 4, text: 4 },
        { value: 5, text: 5 },
        { value: 6, text: 6 },
        { value: 7, text: 7 },
      ]
    }
  },

  methods: {
    openDeleteModal(id: number) {
      this.selectedTaskId = id;
    },

    openCreateModal() {
      this.modal = !this.modal
    },

    cancelDelete() {
      this.selectedTaskId = null;
    },

    /**
     * Confirms the deleting.
     *
     * @return {Promise<void>}
     */
    async confirmDelete() {
      if (!this.selectedTaskId) {
        return;
      }

      try {
        await tasksService.deleteTask(this.selectedTaskId);
      } catch (ex) {
        console.log(ex);
      }

      this.tasks = this.tasks.filter((task) => task.id !== this.selectedTaskId);
      this.selectedTaskId = null;
    },

    getFrequencyString(n: number) {
      let times = 'time';

      if (n !== 1) {
        times = times + 's';
      }

      return `${n} ${times} per week`;
    },

    async submit(event: Event) {
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
      }
    },
  },

  async mounted() {
    this.tasks = await tasksService.getTasks();
  }
}
</script>
