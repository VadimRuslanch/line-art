// eslint.config.ts
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  // База Next + Core Web Vitals
  ...nextVitals,

  // TypeScript-правила (эквивалент next/typescript)
  ...nextTs,

  // Твои оверрайды
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },

  // Отключаем конфликтующие форматтеры в ESLint
  prettier,

  // Игноры (можешь дополнять)
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
