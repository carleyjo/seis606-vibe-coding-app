# Implementation Plan: VolleyCentral

**Feature**: `001-volleycentral`
**Specification**: [spec.md](./spec.md)
**Status**: Draft
**Submission**: October 21, 2026

## Technical Context

- React 19, TypeScript, Vite, and React Router.
- Frontend-only application with routes for Home, Preferences, and the five league pages.
- Browser localStorage is the only persistence mechanism in this release.
- No backend, database, authentication, account service, network fetching, or live data.
- Existing league content is hardcoded sample data; the implementation plan moves it behind an asynchronous typed adapter.
- Vitest and React Testing Library are the planned unit and component-testing stack, with coverage reporting enabled for in-scope code.

## Clarification Decisions

- Teaching paragraphs and plain-language hints appear on the homepage only.
- The adapter interface is asynchronous to preserve a future live-data boundary.
- Scores, Schedules, Standings, and News each receive a visible `Sample data` label.
- Invalid or empty localStorage preferences show a reset message, then use default homepage ordering.
- This plan is synchronized with the clarified spec and tasks.

## Architecture

The current frontend structure is:

| File or directory | Responsibility |
|---|---|
| `src/App.tsx` | React Router setup for Home, Preferences, parameterized league pages, and the fallback route. |
| `src/components/SiteShell.tsx` | Shared navigation, route outlet, footer, and hero artwork. |
| `src/components/LeagueSections.tsx` | Shared Scores, Schedules, Standings, and News rendering for league pages. |
| `src/pages/HomePage.tsx` | Homepage hero, preference-aware league ordering, coverage links, and current homepage content. |
| `src/pages/PreferencesPage.tsx` | Profile and preferred-league controls with localStorage persistence. |
| `src/pages/LeaguePage.tsx` | Shared rendering for NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV route parameters. |
| `src/data.ts` | Current hardcoded sample league data and league route helpers. |
| `src/lib/preferences.ts` | LocalStorage read and write helpers for profile and league preferences. |
| `src/types.ts` | TypeScript profile, league, preference, and league-data types. |
| `src/officialSources.ts` | Typed official source links keyed by league ID. |
| `src/App.css` and `src/index.css` | Existing VolleyCentral branding, layout, responsive styles, focus styles, and page styles. |

The planned adapter boundary adds:

- `src/dataAdapter.ts`: the asynchronous adapter interface and sample-data adapter implementation.
- `src/components/ProfileTeaching.tsx`: homepage-only profile teaching paragraphs and plain-language hints.
- Test files colocated with the relevant modules or under `src/__tests__/`, using Vitest and React Testing Library.

## Implementation Phases

### Phase 1: Data Boundary

1. Define the async adapter interface for scores, schedules, standings, and attributed news links.
2. Move the existing hardcoded dataset behind the sample-data adapter implementation.
3. Preserve the five exact official source URLs in the typed source map.
4. Ensure adapter results are labeled `Sample data` in every data section.

### Phase 2: Preferences

1. Remove the email field from Preferences.
2. Keep the eight profile choices and five league choices.
3. Validate one profile and at least one league before saving.
4. Save and read only `profile` and `leagues` in localStorage.
5. Detect invalid or empty saved values, show a reset message, clear the invalid state, and use default ordering.

### Phase 3: Profile-Driven Homepage

1. Define original teaching paragraphs for scoring, rotations, positions, and libero concepts.
2. Show all four topics and plain-language hints for Beginner Fan and Youth Athlete.
3. Show light hints for Casual Fan.
4. Show dense content without teaching text for Super Fan.
5. Define the specified concise or dense treatment for High School Athlete, College Athlete, Parent, and Coach.
6. Keep all teaching content on the homepage only.
7. Order homepage league content from saved preferred leagues.

### Phase 4: Accessibility and Responsive Review

1. Confirm keyboard navigation and visible focus states for router links, preference controls, and official source links.
2. Verify all four sample-data sections and teaching content wrap at 375px without horizontal scrolling.
3. Preserve plain-text official source links without logos or league marks.

### Phase 5: Verification

1. Configure Vitest, React Testing Library, jsdom, and coverage reporting.
2. Add tests for adapter results, preference validation, reset behavior, ordering, and profile presentation rules.
3. Add responsive and keyboard-focused UI tests for Home, Preferences, and league pages.
4. Run lint, build, Vitest, and coverage commands.
5. Confirm in-scope code meets the coverage requirement.

## Future Architecture

The current release intentionally stops at a browser-only architecture. Future releases may add:

- A backend API and database for durable user accounts and server-side preferences.
- Authentication, session management, password handling, and server-side authorization.
- An OpenAPI contract for account, preference, league, coverage, and news endpoints.
- Live data adapters for NCAA, LOVB, and MLV behind the same asynchronous adapter interface as the sample-data adapter.
- Source-specific caching, rate limiting, freshness metadata, retries, and unavailable states.
- A legal and commercial integration path using official feeds, embeds, league partnerships, or licensed sports-data providers.

Future adapters must not bypass league terms, robots policies, licensing requirements, or access controls.

## Constitution Check

| Principle or requirement | Status | Plan and rationale |
|---|---|---|
| Verified Quality | Met | Configure Vitest and React Testing Library with coverage for all in-scope adapter, preference, profile, routing, and accessibility behavior. |
| Documented APIs | Excepted | No API or backend exists in this frontend-only release. Add OpenAPI when the future backend is introduced. |
| Security and Authentication | Excepted | No accounts, credentials, sessions, or server-side user data exist in this release. Authentication and authorization are deferred with the backend. |
| Simple Architecture | Met | Use React Router, localStorage, one sample-data adapter, explicit TypeScript types, and small shared components. |
| Mobile-First, Findable Experience | Met | Preserve the existing responsive branding and verify keyboard use and 375px layouts for all primary workflows. |
| Responsible Data Use | Met | Use sample data only, link to the approved official sources, use no scraping or network fetching, and display no league logos or marks. |
| Input validation | Met | Validate profile and league choices before localStorage writes and show a reset message for invalid stored preferences. |
| Coverage threshold | Deferred | The test and coverage tooling is planned for this submission; it must be configured and run before release. |

## Future Work

Accounts, server-side preferences, live NCAA/LOVB/MLV integrations, backend and OpenAPI, server authorization, favorites, notifications, AI summaries, recruiting and transfer tracking, Version 3 content, and the commercial licensing path remain future releases as documented in `spec.md`.

## Risks

- Official-source terms and commercial rights remain unresolved; this release uses no scraping, no fetching, and no league logos or marks.
- Teaching text must be fact-checked by the project owner.
- The sample adapter must remain visibly separate from any future live-data adapter.
