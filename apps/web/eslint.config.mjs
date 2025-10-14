import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // Allow explicit any types for Strapi API responses and dynamic content
      '@typescript-eslint/no-explicit-any': 'off',

      // Allow unused variables for Next.js required params (locale, etc.)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(locale|notFound)$',
        },
      ],

      // Relax React hooks exhaustive deps for complex dependencies
      'react-hooks/exhaustive-deps': 'warn',

      // Allow unescaped entities in JSX for better readability
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
