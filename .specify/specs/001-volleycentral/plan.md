# Implementation Plan: VolleyCentral

**Feature**: `001-volleycentral`
**Specification**: [spec.md](./spec.md)
**Status**: Draft

## Technical Context

- **Current client**: React 19 + TypeScript + Vite 8 in `volleycentral-test`.
- **Current UI state**: A static single-page hero and league coverage mockup in `src/App.tsx` and `src/App.css`.
- **Persistence**: No authentication, server, database, or API layer currently exists.
- **MVP data**: NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV coverage with scores, schedules, standings, and attributed news links.
- **Testing**: Existing package scripts provide build and lint commands; feature tests and coverage tooling must be added with the chosen application/data stack.

## Constitution Check

- **Verified Quality**: Add unit and integration tests for account creation, profile and league selection, homepage prioritization, validation, authorization, and data states. Configure coverage to remain above 80%.
- **Documented APIs**: Define authentication, profile preferences, competitions, scores, schedules, standings, and news-link endpoints in OpenAPI before implementation.
- **Security and Authentication**: Store only password hashes and necessary preference data server-side. Validate all account and preference inputs at the boundary and enforce authorization on the server.
- **Simple Architecture**: Introduce the smallest backend and persistence layer needed for accounts and MVP data; keep league and preference models explicit rather than creating a generalized content engine.
- **Mobile-First, Findable Experience**: Make onboarding and preference editing keyboard accessible, touch-friendly, and usable on phone widths. Keep core personalized content within three clicks.
- **Responsible Data Use**: Store source attribution and URLs for coverage and news links; respect each source's terms, licensing, rate limits, caching, and backoff requirements.

## Data Model

- `User`: id, email or username, password hash, created timestamp, updated timestamp.
- `VolleyballProfile`: one of Youth Athlete, High School Athlete, College Athlete, Parent, Coach, Beginner Fan, Casual Fan, or Super Fan.
- `League`: stable id and display name for NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
- `UserPreferences`: user id, volleyball profile, preferred league ids, updated timestamp.
- `Competition`: stable id, display name, type, and availability metadata.
- `Match`: competition id, teams, scheduled/completed time, status, score, source, and last-updated timestamp.
- `Standing`: competition id, season, team, position, record or points, source, and last-updated timestamp.
- `NewsLink`: title, summary, source, source URL, publication date, competition context, and content type.

## API Surface

Document and implement these minimum routes in OpenAPI:

- `POST /api/auth/register`: create an account and return an authenticated session.
- `POST /api/auth/login`: authenticate a returning user.
- `GET /api/me`: return the current user and preferences.
- `PUT /api/me/preferences`: validate and save one profile plus one or more preferred leagues.
- `GET /api/home`: return homepage sections prioritized by profile and preferred leagues.
- `GET /api/leagues`: return supported leagues and availability.
- `GET /api/leagues/{leagueId}/scores`: return live, final, and upcoming scores.
- `GET /api/leagues/{leagueId}/schedules`: return match schedules.
- `GET /api/leagues/{leagueId}/standings`: return standings for a season.
- `GET /api/news`: return attributed news links filtered by league where supported.

## Implementation Phases

### Phase 1: Application Foundation

1. Choose and configure the minimal backend and persistence solution compatible with the course environment.
2. Add environment configuration with fake placeholders only and document local setup.
3. Add shared TypeScript schemas/constants for profiles, leagues, validation, API responses, loading states, and errors.
4. Add OpenAPI documentation for the initial API surface.

### Phase 2: Account and Personalization

1. Implement registration, login/session handling, logout, and authenticated route protection.
2. Implement preference onboarding with the eight profile options and five league options.
3. Enforce one profile, at least one preferred league, valid league ids, and authenticated ownership on preference writes.
4. Add preference editing so returning users can update their selections.
5. Add onboarding and preference-management UI states for loading, validation errors, server errors, and successful completion.

### Phase 3: MVP Coverage

1. Add league navigation for NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
2. Implement scores, schedules, standings, and attributed news-link views with source and freshness metadata.
3. Add source adapters behind a small common interface with caching, bounded polling, backoff, and unavailable states.
4. Keep external articles as summaries and links; do not republish article content.

### Phase 4: Personalized Homepage

1. Build homepage prioritization from the authenticated user's profile and preferred leagues.
2. Define deterministic prioritization rules so the same preferences produce predictable ordering.
3. Preserve useful public defaults for unauthenticated users and a clear setup path for authenticated users without preferences.
4. Add responsive navigation and accessibility semantics for onboarding, filters, scores, schedules, standings, and news links.

### Phase 5: Verification and Release Readiness

1. Add unit tests for schemas, prioritization, source-state handling, and data transformations.
2. Add integration tests for account creation, login, preference setup, preference authorization, and personalized homepage responses.
3. Add UI tests for new-user onboarding, returning-user prioritization, mobile layout, keyboard navigation, and error/empty states.
4. Verify OpenAPI matches route behavior and confirm source attribution and rate-limit handling.
5. Run lint, build, tests, and coverage; confirm coverage exceeds 80%.

## Acceptance-Test Matrix

| Requirement | Verification |
|---|---|
| New users create accounts | Registration integration test and UI onboarding test |
| New users select profile and leagues | Schema, API, and UI validation tests for all allowed values |
| Returning users receive prioritized homepage content | Preference fixture plus homepage ordering integration test |
| All five leagues are supported | League contract test and navigation/UI test |
| MVP scores, schedules, standings, and news links exist | Endpoint contract tests and responsive view tests |
| Unauthorized users cannot access private preferences | Authentication and cross-user authorization tests |
| External news is attributed and linked | API response and UI rendering test |
| Data failures remain understandable | Loading, unavailable, empty, and error-state tests |

## Future Release Boundaries

- **Version 2**: Favorite teams and players, following teams, personalized dashboards based on favorite teams, personalized news feed, match reminders and notifications, recruiting updates, transfer portal updates, AI-generated match summaries, and AI-generated article summaries.
- **Version 3**: USA Volleyball news integration, youth and club volleyball coverage, recruiting resources, tournament and camp finder, and coaching and training content.

## Risks and Mitigations

- **Data source access changes**: isolate each source adapter, cache responses, expose freshness, and support an unavailable state.
- **Authentication complexity**: use a proven session/authentication mechanism and keep authorization checks server-side.
- **Personalization ambiguity**: start with documented deterministic rules based only on profile and preferred leagues.
- **Scope growth**: keep favorite and following teams, favorite-based dashboards, notifications, recruiting and transfer updates, AI summaries, USA Volleyball, youth and club coverage, tournaments, camps, and coaching content outside the MVP.
