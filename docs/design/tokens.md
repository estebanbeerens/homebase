# Design tokens

Single source: [`libs/design-tokens/src/tokens.json`](../../libs/design-tokens/src/tokens.json).
It is final. Change a value there and it flows to:

- `@homebase/design-tokens` (TypeScript `tokens` object),
- the Tailwind/NativeWind theme (`libs/design-tokens/tailwind.cjs`, used by `tailwind.config.js`),
- Gluestack's theme variables (`gluestackVars`, used by the ThemeProvider atom).

Components never use raw values. ESLint rejects hex colours, `rgb()`/`rgba()`,
arbitrary Tailwind values such as `p-[13px]`, and numeric style sizes.

## Colour

| Token       | Class                 | Value           | Use                                         |
| ----------- | --------------------- | --------------- | ------------------------------------------- |
| bg          | `bg-bg`               | #F4F2EC         | App background                              |
| surface     | `bg-surface`          | #FFFFFF         | Cards, inputs                               |
| border      | `border-border`       | #E3DED3         | Card borders, dividers                      |
| borderInput | `border-border-input` | #CFC8BA         | Inputs, default buttons                     |
| fill        | `bg-fill`             | #D6E2DA         | Photo placeholders, progress track          |
| fillSubtle  | `bg-fill-subtle`      | #E3ECE6         | Badges, detail-row dividers                 |
| selected    | `bg-selected`         | #E3ECE6         | Active drawer row, close button             |
| text        | `text-text`           | #181718         | Primary text                                |
| textMuted   | `text-text-muted`     | #56605A         | Captions, field labels                      |
| primary     | `bg-primary`          | #2F6B57         | Primary buttons, worth card, bars, add icon |
| primaryDark | `text-primary-dark`   | #24503F         | Badge text, active row text, money values   |
| onPrimary   | `text-on-primary`     | #FFFFFF         | Text on primary                             |
| danger      | `text-danger`         | #C62828         | Delete actions                              |
| scrimStrong | `bg-scrim-strong`     | rgba(0,0,0,0.5) | Behind the nav drawer                       |
| scrimLight  | `bg-scrim-light`      | rgba(0,0,0,0.3) | Behind the add menu                         |

## Type (Inter)

| Token   | Class          | Size / weight | Use                                     |
| ------- | -------------- | ------------- | --------------------------------------- |
| display | `text-display` | 30 / 700      | Worth figures                           |
| h1      | `text-h1`      | 24 / 700      | Item name on detail                     |
| title   | `text-title`   | 22 / 700      | Screen title in the app bar             |
| h2      | `text-h2`      | 16 / 700      | Section headings                        |
| body    | `text-body`    | 15 / 500      | Body and values                         |
| label   | `text-label`   | 14 / 600      | Button labels                           |
| caption | `text-caption` | 13 / 400      | Captions, field labels (labels use 600) |
| badge   | `text-badge`   | 12 / 600      | Badges                                  |

## Spacing (4 pt scale)

`space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `space-5` 20 (screen gutter) · `space-7` 28.
Classes: `p-4`, `gap-3`, `px-5`, and so on. Only these steps exist.

## Radius, shadow, size

- Radius: `rounded-badge` 4 · `rounded-control` 6 · `rounded-photo` 8 · `rounded-card` 12
- Shadow: `shadow-menu` (0 6px 16px rgba(0,0,0,0.2)), for the add menu
- Size: `h-touch`/`w-touch` 44 (minimum touch target) · `icon` 24 · `drawer` 290 · `menu` 200 · `phoneW`/`phoneH` 390×844 (design frame only)

Values are emitted in px because NativeWind resolves `rem` against 14 px.
