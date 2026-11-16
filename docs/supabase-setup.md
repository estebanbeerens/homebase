# Setting up Supabase for Homebase

Homebase runs on the Supabase **free plan**. This guide creates the hosted
project, connects the app to it, and keeps you inside the free limits.

> The database schema, storage bucket and policies come from
> `supabase/migrations/` (added in Phase 2). Never create tables by hand in
> the dashboard: everything goes through migrations so local, CI and hosted
> stay identical.

## 1. Create the project

1. Sign in at https://supabase.com/dashboard and create an organisation if
   you don't have one. Pick the **Free** plan.
2. **New project**:
   - Name: `homebase`
   - Database password: generate a strong one and store it in your password
     manager. You need it to link the CLI. Never commit it.
   - Region: the one closest to you (for example `eu-central-1` Frankfurt
     or `eu-west-2` London). It can't be changed later.
3. Wait for the project to finish provisioning (about two minutes).

## 2. Collect the connection values

In **Project Settings → API Keys** (or the **Connect** button):

| Value                                     | Where it goes                          | Secret?                                                                        |
| ----------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| Project URL (`https://<ref>.supabase.co`) | `EXPO_PUBLIC_SUPABASE_URL`             | No                                                                             |
| Publishable key (`sb_publishable_…`)      | `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | No: it ships in the app and is safe because every table has row-level security |
| Secret key / `service_role`               | **Nowhere in this repo or app**        | Yes                                                                            |
| Project ref (the `<ref>` in the URL)      | `supabase link`                        | No                                                                             |

Supabase now calls the client key the _publishable key_; older docs call it
the _anon key_. Either works with supabase-js, but use the publishable key.

## 3. Configure the app

```bash
cp apps/homebase-mobile/.env.example apps/homebase-mobile/.env.local
```

Fill in the two values. `.env.local` is gitignored. Expo loads it
automatically and inlines `EXPO_PUBLIC_*` variables into the bundle, which is
why only the publishable key may go there.

## 4. Link the CLI and push the schema

The Supabase CLI is a dev dependency, so use it through `npx`. CLI v3 works
against your local stack by default and asks before changing a hosted
project.

```bash
npx supabase login
```

```bash
npx supabase link --project-ref <ref>
```

```bash
npx supabase db push
```

`db push` applies every migration in `supabase/migrations/`, including the
table grants, row-level security policies and the `item-photos` storage
bucket.

Since 30 October 2026, Supabase no longer exposes new tables to the Data
API automatically. Our migrations include the explicit `grant` statements,
so nothing needs to be clicked in the dashboard.

## 5. Sign in with Apple and Google

Homebase signs in with Apple and Google only. In **Authentication → Sign In /
Providers**:

- **Apple**: enable it and add the app's iOS bundle identifier to the
  authorised client IDs. Native Apple sign-in on iOS uses an ID token, so no
  web secret is needed for the iOS app. Android uses the web flow, which
  needs a Services ID, key ID, team ID and private key from the Apple
  Developer account.
- **Google**: create OAuth client IDs in Google Cloud Console (one Web, one
  iOS, one Android). Add the Web client ID and secret in Supabase and list
  all client IDs under _Authorized Client IDs_.

The exact native setup is done in the auth phase. It needs the bundle
identifier and package name, which are still to be decided.

In **Authentication → URL Configuration**, add the app's redirect URL
`homebase://` to the allowed redirect URLs.

## 6. Local development (optional, needs Docker)

```bash
npx supabase start
```

This runs Postgres, Auth, Storage and Studio locally (Studio at
http://127.0.0.1:54323). Put the local URL and publishable key that
`supabase start` prints into `.env.local` to develop offline. It needs
Docker or Colima running.

## Staying inside the free plan

| Limit                | Free plan                     | How Homebase stays inside it                                                                                        |
| -------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Database             | 500 MB                        | Text and numbers only; photos live in Storage                                                                       |
| File storage         | 1 GB                          | Photos resized to about 200 kB, 4 per item maximum, plus small thumbnails; roughly 1,000 items with full photos     |
| Egress               | 5 GB / month                  | Lists load thumbnails only; full photos load on the detail screen                                                   |
| Monthly active users | 50,000                        | Not a concern for a personal app                                                                                    |
| Max upload           | 50 MB                         | Uploads are about 200 kB                                                                                            |
| Active projects      | 2                             | One project is enough                                                                                               |
| Pausing              | After 1 week without activity | Open the app (or the dashboard) at least weekly. A paused project is restored from the dashboard and keeps its data |

Check usage in **Organization → Usage**.
