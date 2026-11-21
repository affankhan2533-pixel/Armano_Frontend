import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'scratch/**',
  ]),
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/no-unescaped-entities': 'off',
    },
  },
]);

export default eslintConfig;
