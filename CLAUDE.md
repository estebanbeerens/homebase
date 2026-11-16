# Homebase

## Stack

- Nx monorepo, React Native (Expo), TypeScript strict
- Backend: Supabase (Postgres, Auth, Storage), supabase-js
- UI: Gluestack UI as the primitive layer, wrapped by our own atoms

## Architecture (atomic design)

- libs/ui/atoms: single primitives, no business logic
- libs/ui/molecules: combinations of atoms, no data fetching
- libs/ui/organisms: complex UI sections, may consume feature hooks
- libs/design-tokens: colours, spacing, type. Never hardcode values in components
- libs/features/*: screens and feature logic (inventory, rooms, dashboard)
- libs/data-access: Supabase client, queries, generated DB types

## Rules

- Every component gets a test and a Storybook/story entry
- Never import Gluestack directly in features; go through atoms
- DB changes go through supabase/migrations, then regenerate types
- Run `nx affected -t lint test` before saying a task is done
