import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  typescript: true,
  formatters: true,
  rules: {
    // Allow default exports for React components (pages, features)
    'import/prefer-default-export': 'off',
    // Enforce co-location: no cross-feature imports
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../features/*'],
            message: 'Do not import across features. Use shared/ for shared code.',
          },
        ],
      },
    ],
  },
})
