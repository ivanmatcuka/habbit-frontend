<template>
  <div>

    <!-- Current date -->
    <div class="d-flex align-items-center justify-content-between">
      <b-button variant="outline-primary" @click="goDayBack">
        <IFa7SolidArrowLeft />
      </b-button>
      <h1 class="text-center">{{ date.format("MMM Do YYYY") }}</h1>
      <b-button variant="outline-primary" v-if="canGoForward" @click="goDayForward">
        <IFa7SolidArrowRight />
      </b-button>
      <b-button variant="outline-secondary" v-else>
        <IFa7SolidArrowRight />
      </b-button>
    </div>

    <!-- List of tasks -->
    <div class="mt-4">

      <!-- Heading -->
      <h2>Uncompleted tasks</h2>

      <b-list-group>
        <b-list-group-item v-for="task in uncompletedTasks" v-bind:key="task.id"
          class="d-flex align-items-center justify-content-between">

          <!-- Title -->
          <div>{{ task.title }}</div>

          <!-- Buttons -->
          <div>
            <b-button variant="success" class="mr-2" @click="completeTask(task.id)">
              <b-icon icon="app" />
            </b-button>
          </div>

        </b-list-group-item>
      </b-list-group>

    </div>

    <!-- List of complete tasks -->
    <div v-if="completedTasks.length" class="mt-4">

      <!-- Heading -->
      <h2>Completed tasks</h2>

      <b-list-group>
        <b-list-group-item v-for="task in completedTasks" v-bind:key="task.id"
          class="d-flex align-items-center justify-content-between">

          <!-- Title -->
          <div>{{ task.title }}</div>

          <!-- Buttons -->
          <div>
            <b-button variant="secondary" class="mr-2" @click="uncompleteTask(task)">
              <b-icon icon="check2-square" />
            </b-button>
          </div>

        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
// Services
import tasksService from '../services/tasks';

// Libs
import moment from 'moment';

export default {
  name: 'HomePage',
  components: {},

  data() {
    return {
      tasks: [],
      date: moment(),
    }
  },

  methods: {
    async completeTask(id: number) {
      try {
        await tasksService.completeTask(id, {
          'completed_at': this.date.format('YYYY-MM-DD HH:mm:ss'),
        });
        this.fetchTasks();
      } catch (ex) {
        console.error(ex);
      }
    },

    /**
     * Uncompletes the task.
     *
     * @param {number} task - Task object.
     * @return {Promise<void>}
     */
    async uncompleteTask(task) {
      const completion = task.completions.find((completion) => {
        return moment(completion.completed_at).isSame(this.date, 'day');
      });

      if (completion) {
        try {
          await tasksService.uncompleteTask(completion.id);
          this.fetchTasks();
        } catch (ex) {
          console.error(ex);
        }
      }

    },

    /**
     * Fetches all tasks.
     *
     * @return {Promise<any>}
     */
    async fetchTasks() {
      try {
        this.tasks = await tasksService.getTasks();
      } catch (ex) {
        console.error(ex);
      }
    },

    /**
     * Goes one day backward.
     *
     * @return {void}
     */
    goDayBack() {
      this.date = this.date.clone().subtract(1, 'days');
    },

    /**
     * Goes one day forward.
     *
     * @return {void}
     */
    goDayForward() {
      this.date = this.date.clone().add(1, 'days');
    },
  },

  computed: {
    /**
     * Returns completed tasks.
     *
     * @return {any[]}
     */
    completedTasks() {
      return this.tasks.filter((task) => {
        return task.completions.some((completion) => {
          return moment(completion.completed_at).isSame(this.date, 'day');
        });
      });
    },

    /**
     * Returns uncompleted tasks.
     *
     * @return {any[]}
     */
    uncompletedTasks() {
      const completedIds = this.completedTasks.map(task => task.id);

      return this.tasks.filter((task) => {
        return !completedIds.includes(task.id);
      });
    },

    /**
     * Checks if there are days in the future.
     *
     * @return {boolean}
     */
    canGoForward() {
      return moment().diff(this.date, 'days') > 0;
    }
  },

  /**
   * Fires once mounted.
   */
  async mounted() {
    try {
      this.fetchTasks();
    } catch (ex) {
      console.log(ex);
    }
  },
}
</script>
