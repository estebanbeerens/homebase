# Homebase

A home inventory app for iOS and Android. Track your rooms and the items in
them (brand, model, price, quantity, purchase date and shop, condition,
category, tags and heir), keep up to four photos per item, and see what
everything is worth today after depreciation.

Built with Expo (React Native) in an Nx monorepo, with Supabase for data,
sign-in and photo storage.

## Requirements

- Node.js 22 or newer (developed on 24) and npm 11
- Xcode with an iOS simulator, and/or Android Studio with an emulator
- For a local Supabase stack: Docker or Colima (optional)

## Getting started

```bash
npm install
```

```bash
cp apps/homebase-mobile/.env.example apps/homebase-mobile/.env.local
```

Fill in `.env.local` with your Supabase URL and publishable key. To create
the Supabase project, follow [docs/supabase-setup.md](docs/supabase-setup.md).

```bash
npm run ios
```

`npm run android` starts the Android app, and `npm start` starts the Metro
dev server only.

## Storybook

UI components are developed in on-device Storybook. It runs inside the app
on a simulator or phone:

```bash
npm run storybook
```

Stories sit next to their components (`*.stories.tsx` in `libs/ui/**`).
After adding a story file while Metro is not running, refresh the story
index with `npm run storybook:generate`.

## Everyday commands

| Command                                      | What it does                                                                |
| -------------------------------------------- | --------------------------------------------------------------------------- |
| `npm run lint`                               | ESLint on every project, including module boundaries and design-token rules |
| `npm test`                                   | Jest on every project                                                       |
| `npm run typecheck`                          | TypeScript (strict) on every project                                        |
| `npm run affected`                           | Lint, test, typecheck and build only what your changes affect               |
| `npx nx build @homebase/homebase-mobile`     | Bundles the app for iOS and Android with Metro (local, no Expo account)     |
| `npx nx eas-build @homebase/homebase-mobile` | Cloud build through EAS (needs an Expo account)                             |
| `npx nx graph`                               | Shows the project dependency graph                                          |

## Repository layout

```
apps/homebase-mobile     Expo app: entry point, navigation shell, Storybook host
libs/design-tokens       tokens.json and its Tailwind and Gluestack adapters
libs/ui/atoms            Primitives that wrap Gluestack (Button, Input, Card, ...)
libs/ui/molecules        Small groups of atoms (FormField, ItemRow, AppBar, ...)
libs/ui/organisms        Screen sections (WorthCard, NavDrawer, AddMenu, ...)
libs/features/*          Screens and feature logic: rooms, inventory, dashboard
libs/data-access         Supabase client, queries and mappers
libs/shared/types        Generated database types and shared types
supabase/                Supabase CLI config and migrations
docs/design/             Design source of truth: tokens, components, screens, decisions
tools/                   Lint-rule tests, Jest helpers, EAS hooks
```

## Architecture rules

Each project carries an Nx tag, and ESLint enforces which tags may import
which:

```
app ─▶ feature ─▶ ui-organism ─▶ ui-molecule ─▶ ui-atom ─▶ tokens
          │
          └────▶ data ─▶ shared
```

- UI libraries never import features or data access. Organisms get their
  data through props.
- Features don't import each other.
- Only atoms may import Gluestack or NativeWind. Only data access may import
  Supabase.
- Components style themselves with token classes only (`bg-primary`, `p-4`,
  `rounded-card`, `text-body`). Raw colours, arbitrary Tailwind values and
  numeric style sizes fail lint.

`tools/lint-tests` proves these rules fire. Design decisions and the
component inventory live in [docs/design](docs/design/README.md).

## Design tokens

Edit [`libs/design-tokens/src/tokens.json`](libs/design-tokens/src/tokens.json).
The values flow into the TypeScript `tokens` export, the Tailwind theme and
Gluestack's theme variables. See [docs/design/tokens.md](docs/design/tokens.md).

## Backend

Supabase free plan: Postgres with row-level security on every table,
Apple and Google sign-in, and a private storage bucket for photos. Photos are
resized and compressed on the device before upload, with thumbnails for
lists, to stay within 1 GB of storage. Schema changes go through
`supabase/migrations`, and the TypeScript types are then regenerated into
`libs/shared/types`. Never edit the generated types by hand.

Real keys go only in `apps/homebase-mobile/.env.local`, which is
gitignored.
