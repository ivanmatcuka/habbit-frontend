<template>
  <habit-item type="button" @click="onClick" :task="task" />
</template>

<script lang="ts">
import { faker } from '@faker-js/faker';

const createdAt = faker.date.past({ years: 2 });
const updatedAt = faker.date.past({ years: 1 });

export const initialTask = {
  completions: [],
  created_at: createdAt.toISOString(), // ISO DateTime string
  frequency: faker.number.int({ max: 7, min: 7 }),
  id: faker.number.int(),
  title: faker.lorem.words({ max: 10, min: 1 }),
  type: 'do',
  updated_at: updatedAt.toISOString(), // ISO DateTime string
} as Task;
</script>

<script lang="ts" setup>
import type { Task } from '@/services/tasks';

import HabitItem from '@/components/HabitItem.vue';

withDefaults(defineProps<{ task: Task }>(), {
  // task: initialTask,
});

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const onClick = () => {
  emit('click', 1);
};
</script>
