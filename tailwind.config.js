/**
 * NativeWind / Tailwind config for the whole workspace.
 *
 * Two colour sources, both derived from libs/design-tokens/src/tokens.json:
 * - token classes (bg-primary, text-text-muted, border-border-input, ...)
 *   which our own atoms use;
 * - Gluestack's semantic CSS-variable classes (bg-background, text-foreground,
 *   border-input, ...) which the vendored Gluestack source uses. Their values
 *   are set from tokens in libs/ui/atoms/src/gluestack/gluestack-ui-provider/config.ts.
 */
const tokenTheme = require('./libs/design-tokens/tailwind.cjs');

const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

const gluestackSemantic = {
  foreground: v('foreground'),
  background: v('background'),
  card: { DEFAULT: v('card') },
  popover: { DEFAULT: v('popover'), foreground: v('popover-foreground') },
  muted: { DEFAULT: v('muted'), foreground: v('muted-foreground') },
  secondary: { DEFAULT: v('secondary'), foreground: v('secondary-foreground') },
  accent: { DEFAULT: v('accent'), foreground: v('accent-foreground') },
  destructive: { DEFAULT: v('destructive') },
  input: v('input'),
  ring: v('ring'),
};

const tokenColors = tokenTheme.extend.colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './apps/homebase-mobile/src/**/*.{js,jsx,ts,tsx}',
    './libs/ui/**/src/**/*.{js,jsx,ts,tsx}',
    './libs/features/**/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      ...tokenTheme.extend,
      colors: {
        ...gluestackSemantic,
        ...tokenColors,
        primary: {
          DEFAULT: tokenColors.primary,
          dark: tokenColors['primary-dark'],
          foreground: v('primary-foreground'),
        },
      },
    },
  },
};
