// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
      'antfu/top-level-function': 0,
      '@typescript-eslint/no-var-requires': 0,
      'no-console': 'off',
    },
  },
)
