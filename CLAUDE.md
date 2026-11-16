# Homebase

## Stack

- Nx monorepo (npm workspaces), React Native with Expo SDK 56, TypeScript strict
- Backend: Supabase (Postgres, Auth, Storage), supabase-js
- UI: Gluestack UI v5 (NativeWind v4) as the primitive layer, wrapped by our own atoms
- Tests: Jest + jest-expo + Testing Library. Stories: on-device Storybook

## Architecture (atomic design)

- libs/ui/atoms: single primitives that wrap Gluestack, no business logic
- libs/ui/molecules: combinations of atoms, no data fetching
- libs/ui/organisms: complex UI sections composed from molecules and atoms. They take data through props and never import features or data access
- libs/design-tokens: colours, spacing, type, radius (tokens.json is the single source). Never hardcode values in components
- libs/features/\*: screens and feature logic (inventory, rooms, dashboard). The only place that calls data hooks
- libs/data-access: Supabase client, queries, mappers
- libs/shared/types: generated DB types and shared types

Import direction is enforced by tags in eslint.config.mjs:
app → feature → organism → molecule → atom → tokens; features also use data and shared.
Features never import other features.

## Rules

- docs/design/ is the source of truth for components. If a decision is missing there, ask; don't invent it
- Every component gets a `.test.tsx` and a `.stories.tsx` next to it
- Never import Gluestack or NativeWind outside libs/ui/atoms; never import Supabase outside libs/data-access
- Style only with token classes (bg-primary, p-4, rounded-card, text-body). No hex, rgba, arbitrary `[..]` values or numeric style sizes
- DB changes go through supabase/migrations, then regenerate types
- Never write real keys to the repo; they go in apps/homebase-mobile/.env.local
- Run tasks through Nx (`npx nx ...`), and check generator flags with `--help` rather than guessing
- Run `npx nx affected -t lint test typecheck build` before saying a task is done
