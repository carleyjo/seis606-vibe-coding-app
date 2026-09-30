# Tasks: VolleyCentral

**Feature**: `001-volleycentral`
**Plan**: [plan.md](./plan.md)
**Specification**: [spec.md](./spec.md)

## Phase 1: Foundation

- [ ] T001 Choose the minimal backend and persistence approach compatible with the existing React/Vite client.
- [ ] T002 Add local environment configuration with fake example values and document setup commands.
- [ ] T003 Add shared TypeScript constants and schemas for volleyball profiles, supported leagues, API responses, and data states.
- [ ] T004 Define the initial API contract in OpenAPI for authentication, preferences, homepage, leagues, scores, schedules, standings, and news links.
- [ ] T005 Configure the test runner, integration-test setup, and coverage reporting with an 80% minimum threshold.

## Phase 2: Accounts and Personalization

- [ ] T006 Implement the `User` persistence model with unique account identity, password hash, timestamps, and server-side validation.
- [ ] T007 Implement registration with validation, duplicate-account handling, secure password hashing, and authenticated session creation.
- [ ] T008 Implement login, logout, session retrieval, and unauthenticated error responses.
- [ ] T009 Implement server-side authorization so users can only read or update their own preferences.
- [ ] T010 Implement the supported volleyball profile values: Youth Athlete, High School Athlete, College Athlete, Parent, Coach, Beginner Fan, Casual Fan, and Super Fan.
- [ ] T011 Implement the supported preferred league values: NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
- [ ] T012 Implement `GET /api/me` and `PUT /api/me/preferences` with one profile, at least one league, allowlisted values, and persistence.
- [ ] T013 Build new-user account and preference onboarding UI with accessible labels, validation messages, loading states, and retryable errors.
- [ ] T014 Build preference editing UI for returning authenticated users.
- [ ] T015 Add tests for registration, login, invalid inputs, duplicate accounts, session handling, preference validation, and cross-user authorization.

## Phase 3: MVP Coverage

- [ ] T016 Implement the supported league catalog and competition availability metadata for NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
- [ ] T017 Implement source adapter interfaces and configuration for league data providers.
- [ ] T018 Implement scores data with live, final, and upcoming match states, source attribution, and last-updated timestamps.
- [ ] T019 Implement schedules data by league and date.
- [ ] T020 Implement standings data by league and season.
- [ ] T021 Implement attributed news links with title, summary, source, URL, publication date, and league context.
- [ ] T022 Add caching, bounded polling, backoff, and explicit delayed or unavailable states for source data.
- [ ] T023 Build league navigation and responsive views for scores, schedules, standings, and news links.
- [ ] T024 Add endpoint and transformation tests for all five leagues and each MVP data view.

## Phase 4: Personalized Homepage

- [ ] T025 Implement deterministic homepage prioritization rules based on the user's volleyball profile and preferred leagues.
- [ ] T026 Implement `GET /api/home` for authenticated users with prioritized scores, schedules, standings, and news links.
- [ ] T027 Implement the authenticated homepage UI using the personalized response and clearly labeling each league and source.
- [ ] T028 Implement public homepage defaults and a clear setup path for users without saved preferences.
- [ ] T029 Add loading, empty, delayed, unavailable, and recoverable error states for personalized homepage sections.
- [ ] T030 Add responsive and keyboard-accessible navigation for onboarding, preferences, filters, and homepage content.
- [ ] T031 Add integration tests proving a new user is prompted for profile and leagues and a returning user receives prioritized homepage content.

## Phase 5: Quality and Release Readiness

- [ ] T032 Add unit tests for schemas, prioritization rules, source transformations, and freshness/state handling.
- [ ] T033 Add UI tests for onboarding, preference editing, league views, mobile layouts, focus states, and error states.
- [ ] T034 Verify every news item renders as an attributed summary and link without republishing source articles.
- [ ] T035 Verify OpenAPI documentation matches implemented routes, parameters, schemas, authentication, and error responses.
- [ ] T036 Run lint, build, tests, and coverage; resolve failures and confirm coverage exceeds 80%.
- [ ] T037 Review secret handling, authorization, source terms, rate limits, responsive behavior, and acceptance criteria before release.

## Dependencies and Execution Order

1. Complete T001-T005 before implementing server routes or tests.
2. Complete T006-T015 before personalized homepage work in T025-T031.
3. T016-T024 can proceed after the foundation and in parallel with account UI work.
4. T025-T031 depend on both saved preferences and MVP league data.
5. Complete T032-T037 after the feature slices are implemented; T035 and T036 are release gates.

## MVP Boundary

The MVP includes T016-T024, account creation and authentication from T006-T009, profile and preferred league selection from T010-T012, and personalized homepage work from T025-T031. Favorite teams and players, following teams, favorite-based personalized dashboards, personalized news feeds, notifications, recruiting updates, transfer portal updates, AI-generated match summaries, AI-generated article summaries, USA Volleyball integration, youth and club coverage, recruiting resources, tournament and camp finding, and coaching/training content remain future-release work.
