import { vars } from 'nativewind';
import { gluestackVars } from '@homebase/design-tokens';

// Gluestack theme variables come from Homebase design tokens.
// Edit libs/design-tokens/src/tokens.json, never the values here.
// Homebase is light-only for now, so dark mode reuses the light values.
export const colors = {
  light: gluestackVars,
  dark: gluestackVars,
};

// Config for nativewind vars() - used by provider
export const config = {
  light: vars(colors.light),
  dark: vars(colors.dark),
};
