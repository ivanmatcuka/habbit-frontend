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
          <div class="mr-2" @click="completeTask(task.id)">
            <IFa7SolidCircleNotch />
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
          <div class="mr-2" @click="uncompleteTask(task)">
            <IFa7SolidCheck />
          </div>

        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import tasksService, { type Task } from '../services/tasks';
import moment from 'moment';

type HomePageState = {
  tasks: Task[];
  date: ReturnType<typeof moment>;
}

export default defineComponent({
  name: 'HomePage',
  components: {},

  data(): HomePageState {
    return {
      tasks: [],
      date: moment(),
    }
  },

  methods: {
    async completeTask(id: number) {
      try {
        await tasksService.completeTask(String(id), {
          'completed_at': this.date.format('YYYY-MM-DD HH:mm:ss'),
        });
        this.fetchTasks();
      } catch (ex) {
        console.error(ex);
      }
    },

    async uncompleteTask(task: Task) {
      const completion = task.completions.find((completion) => {
        return moment(completion.completed_at).isSame(this.date, 'day');
      });

      if (completion) {
        await tasksService.uncompleteTask(String(completion.id));
        this.fetchTasks();
      }

    },

    async fetchTasks() {
      this.tasks = await tasksService.getTasks();
    },

    goDayBack() {
      this.date = this.date.clone().subtract(1, 'days');
    },

    goDayForward() {
      this.date = this.date.clone().add(1, 'days');
    },
  },

  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.completions.some((completion) => {
        return moment(completion.completed_at).isSame(this.date, 'day');
      }));
    },

    uncompletedTasks() {
      const completedIds = this.completedTasks.map(task => task.id);

      return this.tasks.filter((task) => !completedIds.includes(task.id));
    },

    canGoForward() {
      return moment().diff(this.date, 'days') > 0;
    }
  },

  async mounted() {
    this.fetchTasks();
  },
})
</script>
