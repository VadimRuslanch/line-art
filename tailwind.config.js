import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { extend: {} },
  plugins: [heroui()], // <-- обязательно
};
