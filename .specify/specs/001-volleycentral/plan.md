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
- League content is sample data returned through an asynchronous typed adapter.

## Clarification Decisions

- Teaching paragraphs and plain-language hints appear on the homepage only.
- The adapter interface is asynchronous to preserve a future live-data boundary.
- Scores, Schedules, Standings, and News each receive a visible `Sample data` label.
- Invalid or empty localStorage preferences show a reset message, then use default homepage ordering.
- This plan is synchronized with the clarified spec and tasks.

## Architecture

- `src/types.ts`: profiles, league IDs, preferences, and coverage types.
- `src/officialSources.ts`: typed official source links keyed by league ID.
- `src/dataAdapter.ts`: asynchronous adapter interface and sample-data implementation.
- `src/lib/preferences.ts`: localStorage read, write, validation, and reset-message state.
- `src/components/`: shared shell, navigation, data sections, profile teaching content, and sample-data labels.
- `src/pages/`: Home, Preferences, and shared league-page rendering.
- `src/App.tsx`: React Router route definitions.

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

1. Add tests for adapter results, preference validation, reset behavior, ordering, and profile presentation rules.
2. Add responsive and keyboard-focused UI tests for Home, Preferences, and league pages.
3. Run lint, build, and the configured test and coverage commands.
4. Confirm in-scope code meets the coverage requirement.

## Future Work

Accounts, server-side preferences, live NCAA/LOVB/MLV integrations, backend and OpenAPI, server authorization, favorites, notifications, AI summaries, recruiting and transfer tracking, Version 3 content, and the commercial licensing path remain future releases as documented in `spec.md`.

## Risks

- Official-source terms and commercial rights remain unresolved; this release uses no scraping, no fetching, and no league logos or marks.
- Teaching text must be fact-checked by the project owner.
- The sample adapter must remain visibly separate from any future live-data adapter.
