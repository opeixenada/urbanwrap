const nextPlugin = require('@next/eslint-plugin-next');

module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      // Add the Next.js plugin
      '@next/next': nextPlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Next.js specific rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'warn',

      // Tailwind v4 specific checks
      'no-restricted-syntax': [
        'warn',
        {
          // Check for arbitrary values that might need updating in Tailwind v4
          selector: "JSXAttribute[name.name='className'][value.value=/\\[.*?\\]/]",
          message: 'Check Tailwind arbitrary values for v4 compatibility',
        },
      ],
    },
  },
];
