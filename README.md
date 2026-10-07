#  🏐 VolleyCentral
## Everything Volleyball. One Place.

VolleyCentral is a frontend-only React application for exploring sample volleyball coverage across NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV.

## Status

The current MVP frontend is implemented with React 19, TypeScript, Vite, and React Router. It includes localStorage preferences, routed league pages, hardcoded sample scores/schedules/standings/news, and official-source links. It does not yet include accounts, a backend, authentication, live data, data fetching, or a database.

## What Works Today

- Routes for Home, Preferences, NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
- Profile and preferred-league selection saved in browser localStorage.
- Homepage ordering based on saved league preferences.
- League pages with sample Scores, Schedules, Standings, and News sections.
- Official-source links for each supported league.
- Responsive branding and navigation styles.

All current league content is sample data. Official links are provided for verification; the application does not fetch live data.

## Not Built Yet

- Removal of the temporary email field from Preferences.
- Async typed data-adapter interface and sample-data adapter implementation.
- Profile-specific teaching paragraphs and plain-language homepage hints.
- Per-section `Sample data` labels and invalid-preference reset messaging.
- Vitest, React Testing Library, and coverage configuration.
- Accounts, authentication, backend services, server-side preferences, OpenAPI, favorites, notifications, AI summaries, recruiting, transfer tracking, and live league integrations.

## Setup and Commands

From the application directory:

```powershell
cd volleycentral-test
npm install
npm run dev -- --host localhost
```

The verified quality commands are:

```powershell
npm run build
npm run lint
```

The build and lint commands passed on October 7, 2026. `npm audit` reported one high-severity `source-map-js` vulnerability; no automated fix was applied.

## Testing

No Vitest or React Testing Library suite is configured yet. The planned testing stack is Vitest, jsdom, React Testing Library, and coverage reporting. Until that work is completed, `npm run build` and `npm run lint` are the available verified checks.

## Project Structure

```text
volleycentral-test/
	src/
		App.tsx
		components/       Shared shell and league sections
		pages/            Home, Preferences, and league pages
		data.ts           Hardcoded sample league data
		lib/preferences.ts
		types.ts
		officialSources.ts
		App.css
		index.css
	public/
	package.json
```

## Specification Artifacts

- [Specification](.specify/specs/001-volleycentral/spec.md)
- [Implementation plan](.specify/specs/001-volleycentral/plan.md)
- [Task list](.specify/specs/001-volleycentral/tasks.md)
- [Saved specification analysis](docs/spec-analysis.md)
- [Original app ideas](docs/original-app-ideas.md)

## Data Source Risks

This release uses no scraping, no network fetching, and no league logos or marks. LOVB terms restrict commercial use, mining, scraping, and public or derivative display without authorization. NCAA.com terms cover scores, statistics, logos, and member-school marks, and commercial linking may require written permission. MLV terms for `provolleyball.com` remain to be reviewed. Future legal routes include official feeds, embeds, league partnerships, or a licensed sports-data provider.

## Future Work

Future releases may add accounts and server-side preferences, live NCAA/LOVB/MLV integrations, backend/OpenAPI services, favorites, notifications, AI summaries, recruiting and transfer tracking, USA Volleyball, youth and club coverage, recruiting resources, tournament and camp tools, coaching content, and a commercial licensing path.
