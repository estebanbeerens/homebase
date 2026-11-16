/**
 * Tailwind (NativeWind) theme generated from tokens.json at config time.
 * Class names follow token names: bg-primary, text-text-muted, p-4,
 * rounded-card, text-body, h-touch, shadow-menu, and so on.
 *
 * Spacing, radius and font sizes are given in px because NativeWind
 * resolves rem against 14px, which would silently shrink every value.
 */
const tokens = require('./src/tokens.json');

const kebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
const px = (value) => `${value}px`;
const mapValues = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));

const colors = Object.fromEntries(
  Object.entries(tokens.color).map(([k, v]) => [kebab(k), v]),
);

const fontSize = mapValues(tokens.type, (t) => [
  px(t.size),
  { fontWeight: String(t.weight) },
]);

const sizes = mapValues(tokens.size, px);

/** @type {import('tailwindcss').Config['theme']} */
module.exports = {
  extend: {
    colors,
    spacing: { ...mapValues(tokens.space, px), ...sizes },
    fontSize,
    borderRadius: mapValues(tokens.radius, px),
    boxShadow: tokens.shadow,
    fontFamily: { sans: [tokens.font.family], body: [tokens.font.family] },
  },
};
