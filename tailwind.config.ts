import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      spacing: {
        '-10': '-10px',
      },
      colors: {
        'main-color-background': '#f9f9fc',
        'main-accent-color': '#364d60',
        'main-text-color': '#223342',
        'main-accent-color-10': '#364d601a',
        'color-title-accent': '#ffffff',
        'color-ui-unit-element': '#223342',
        'color-ui-element-background': '#223342',
        'white-opacity': '#FFFFFF4D',
      },
      borderColor: {
        'custom-accent': 'rgba(54, 77, 96, 0.16)',
      },
    },
  },
} satisfies Config;
