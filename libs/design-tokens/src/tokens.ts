import raw from './tokens.json';

/**
 * Design tokens for Homebase. `tokens.json` is the single source of truth;
 * edit that file, never the values here or in components.
 */
export const tokens = raw;

export type Tokens = typeof tokens;
export type ColorToken = keyof Tokens['color'];
export type TypeToken = keyof Tokens['type'];
export type SpaceToken = keyof Tokens['space'];
export type RadiusToken = keyof Tokens['radius'];
export type SizeToken = keyof Tokens['size'];
