import type { Meta, StoryObj } from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import HabitItem, { initialTask } from './HabitItem.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
    onClick: fn(),
    task: initialTask,
  },
  argTypes: {
    task: Object,
  },
  component: HabitItem,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  title: 'Example/HabitItem',
} satisfies Meta<typeof HabitItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    task: initialTask,
  },
};
