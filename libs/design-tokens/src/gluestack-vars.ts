import { tokens, type ColorToken } from './tokens';

/**
 * Converts a `#RRGGBB` hex colour into the space-separated RGB triplet that
 * Gluestack's CSS variables expect (for example `47 107 87`).
 */
export function hexToRgbTriplet(hex: string): string {
  const match = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!match) {
    throw new Error(`Expected a #RRGGBB colour, got "${hex}"`);
  }
  const [, r, g, b] = match;
  return [r, g, b].map((part) => parseInt(part ?? '0', 16)).join(' ');
}

/**
 * Maps Gluestack's semantic theme variables onto Homebase colour tokens.
 * Gluestack components read these variables, so changing a token here
 * restyles every wrapped primitive.
 */
export const gluestackColorMap = {
  '--primary': 'primary',
  '--primary-foreground': 'onPrimary',
  '--secondary': 'fillSubtle',
  '--secondary-foreground': 'primaryDark',
  '--background': 'bg',
  '--foreground': 'text',
  '--card': 'surface',
  '--popover': 'surface',
  '--popover-foreground': 'text',
  '--muted': 'fillSubtle',
  '--muted-foreground': 'textMuted',
  '--accent': 'selected',
  '--accent-foreground': 'primaryDark',
  '--destructive': 'danger',
  '--border': 'border',
  '--input': 'borderInput',
  '--ring': 'primary',
} as const satisfies Record<string, ColorToken>;

export type GluestackVar = keyof typeof gluestackColorMap;

export const gluestackVars: Record<GluestackVar, string> = Object.fromEntries(
  Object.entries(gluestackColorMap).map(([cssVar, token]) => [
    cssVar,
    hexToRgbTriplet(tokens.color[token]),
  ]),
) as Record<GluestackVar, string>;
