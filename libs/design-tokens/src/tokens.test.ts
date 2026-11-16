import { gluestackVars, hexToRgbTriplet, tokens } from './index';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindTheme = require('../tailwind.cjs');

describe('design tokens', () => {
  it('exposes the colour palette from tokens.json', () => {
    expect(tokens.color.primary).toBe('#2F6B57');
    expect(tokens.space['4']).toBe(16);
  });

  it('converts hex colours to RGB triplets', () => {
    expect(hexToRgbTriplet('#2F6B57')).toBe('47 107 87');
    expect(() => hexToRgbTriplet('rgba(0,0,0,0.5)')).toThrow();
  });

  it('derives every Gluestack variable from a token', () => {
    expect(gluestackVars['--primary']).toBe('47 107 87');
    expect(gluestackVars['--background']).toBe(hexToRgbTriplet(tokens.color.bg));
    expect(Object.values(gluestackVars).every((v) => /^\d+ \d+ \d+$/.test(v))).toBe(true);
  });

  it('builds the Tailwind theme from tokens in px', () => {
    const { extend } = tailwindTheme;
    expect(extend.colors['text-muted']).toBe(tokens.color.textMuted);
    expect(extend.spacing['5']).toBe('20px');
    expect(extend.spacing.touch).toBe('44px');
    expect(extend.borderRadius.card).toBe('12px');
    expect(extend.fontSize.body).toEqual(['15px', { fontWeight: '500' }]);
  });
});
