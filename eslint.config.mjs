import nx from '@nx/eslint-plugin';

/**
 * Module boundaries. See docs/architecture.md for the reasoning.
 * Layers only import downwards:
 *   app -> feature -> ui-organism -> ui-molecule -> ui-atom -> tokens
 * Data access sits beside the UI: features use it, UI libraries never do.
 */
const gluestack = ['@gluestack-ui/*', '@gluestack/*', 'nativewind'];
const supabase = ['@supabase/*'];

export const depConstraints = [
  {
    sourceTag: 'type:app',
    onlyDependOnLibsWithTags: [
      'type:feature',
      'type:ui-organism',
      'type:ui-molecule',
      'type:ui-atom',
      'type:data',
      'type:shared',
      'type:tokens',
    ],
    bannedExternalImports: [...gluestack],
  },
  {
    sourceTag: 'type:feature',
    onlyDependOnLibsWithTags: [
      'type:ui-organism',
      'type:ui-molecule',
      'type:ui-atom',
      'type:data',
      'type:shared',
      'type:tokens',
    ],
    bannedExternalImports: [...gluestack, ...supabase],
  },
  {
    sourceTag: 'type:ui-organism',
    onlyDependOnLibsWithTags: [
      'type:ui-molecule',
      'type:ui-atom',
      'type:tokens',
    ],
    bannedExternalImports: [...gluestack, ...supabase],
  },
  {
    sourceTag: 'type:ui-molecule',
    onlyDependOnLibsWithTags: ['type:ui-atom', 'type:tokens'],
    bannedExternalImports: [...gluestack, ...supabase],
  },
  {
    sourceTag: 'type:ui-atom',
    onlyDependOnLibsWithTags: ['type:tokens'],
    bannedExternalImports: [...supabase],
  },
  {
    sourceTag: 'type:data',
    onlyDependOnLibsWithTags: ['type:shared'],
  },
  { sourceTag: 'type:shared', onlyDependOnLibsWithTags: [] },
  { sourceTag: 'type:tokens', onlyDependOnLibsWithTags: [] },
];

/**
 * Design-token rules: components never use raw colours, arbitrary Tailwind
 * values or numeric style sizes. Use token classes (bg-primary, p-4,
 * rounded-card, text-body) or values from @homebase/design-tokens.
 */
const styleKeys =
  '^(margin|padding|width|height|gap|rowGap|columnGap|top|bottom|left|right|inset|fontSize|lineHeight|fontWeight|letterSpacing|borderRadius|borderWidth|minWidth|maxWidth|minHeight|maxHeight)';
export const tokenRules = {
  'no-restricted-syntax': [
    'error',
    {
      selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]',
      message:
        'Raw hex colour. Use a colour token (for example bg-primary or tokens.color.primary).',
    },
    {
      selector: 'TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]',
      message: 'Raw hex colour. Use a colour token.',
    },
    {
      selector: 'Literal[value=/\\b(rgba?|hsla?)\\(/]',
      message: 'Raw colour function. Use a colour token.',
    },
    {
      selector: 'Literal[value=/-\\[[^\\]]+\\]/]',
      message:
        'Arbitrary Tailwind value. Use a token class, or add a token to tokens.json.',
    },
    {
      selector: 'TemplateElement[value.raw=/-\\[[^\\]]+\\]/]',
      message:
        'Arbitrary Tailwind value. Use a token class, or add a token to tokens.json.',
    },
    {
      selector: `Property[key.name=/${styleKeys}/][value.type='Literal'][value.raw=/^[1-9]/]`,
      message:
        'Raw numeric style value. Use spacing, size, radius or type tokens.',
    },
  ],
};

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/test-output', '**/coverage'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints,
        },
      ],
    },
  },
  {
    files: [
      'apps/homebase-mobile/src/**/*.{ts,tsx}',
      'libs/ui/**/src/**/*.{ts,tsx}',
      'libs/features/**/src/**/*.{ts,tsx}',
    ],
    ignores: [
      'libs/ui/atoms/src/gluestack/**',
      '**/*.test.{ts,tsx}',
      '**/*.stories.{ts,tsx}',
    ],
    rules: tokenRules,
  },
];
