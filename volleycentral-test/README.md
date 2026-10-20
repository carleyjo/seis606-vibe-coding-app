# VolleyCentral

VolleyCentral is a React/Vite application for volleyball coverage across NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV. League data is served through typed Vercel serverless functions.

## Setup

From this directory:

```powershell
npm install
npm run dev -- --host localhost
```

To exercise the Vercel functions locally, use the Vercel CLI:

```powershell
npx vercel dev
```

API routes:

- `GET /api/leagues` returns all normalized league records.
- `GET /api/leagues/:leagueId` returns one normalized record.

Copy `.env.example` to `.env.local` and configure provider endpoints on Vercel under **Project Settings → Environment Variables**. Provider variables must remain server-only; do not rename them with a `VITE_` prefix.

## Server data architecture

```text
volleycentral-test/
  api/leagues/             Vercel serverless HTTP handlers
  server/
    adapters.ts            LeagueAdapter contract and five provider adapters
    registry.ts            Adapter registry and orchestration
    cache.ts               TTL-based in-memory cache
    config.ts              Server-only environment configuration
  src/
    dataAdapter.ts         Typed browser API client
    types.ts               Shared normalized data contracts
```

Each adapter returns the same `LeagueData` shape. When a provider URL is not configured, the corresponding adapter explicitly returns the existing sample fixture so the starter app remains usable. When a provider URL is configured, it must return the normalized structure; provider-specific mapping belongs inside that adapter.

The NCAA D1 adapter includes an opt-in mapper for the scoreboard-shaped response documented in `server/ncaaD1Mapper.ts`. Configure `NCAA_D1_API_URL` only with a source you are authorized to use. The publicly reachable `ncaa-api.henrygd.me` mirror is not treated as an NCAA-authorized production source.

## Commands

```powershell
npm run build
npm run lint
npm run test
```

The build includes the frontend, API handlers, and server adapter type-checking.
