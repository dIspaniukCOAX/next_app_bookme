import type { Preview } from '@storybook/react'
import '../src/app/globals.css'; // Ensure your Tailwind styles are included

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;