import type { Preview } from '@storybook/vue3-vite';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@/assets/scss/global.scss';

import { setup } from '@storybook/vue3-vite';
import { createBootstrap } from 'bootstrap-vue-next';

const preview: Preview = {
  parameters: {
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

setup((app) => {
  app.use(createBootstrap());
});

export default preview;
