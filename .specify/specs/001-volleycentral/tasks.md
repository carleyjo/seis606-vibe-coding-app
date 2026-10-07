# Tasks: VolleyCentral

**Feature**: `001-volleycentral`
**Plan**: [plan.md](./plan.md)
**Specification**: [spec.md](./spec.md)
**Submission**: October 21, 2026

## Verified Existing Implementation

- [x] T001 React Router routes exist for `/`, `/preferences`, and all five league pages in [src/App.tsx](../../../volleycentral-test/src/App.tsx).
- [x] T002 Profile and preferred-league preferences are selectable, saved in localStorage, and used to order homepage league content in [src/pages/PreferencesPage.tsx](../../../volleycentral-test/src/pages/PreferencesPage.tsx), [src/lib/preferences.ts](../../../volleycentral-test/src/lib/preferences.ts), and [src/pages/HomePage.tsx](../../../volleycentral-test/src/pages/HomePage.tsx).
- [x] T003 Shared league pages render NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV content in [src/pages/LeaguePage.tsx](../../../volleycentral-test/src/pages/LeaguePage.tsx) and [src/components/LeagueSections.tsx](../../../volleycentral-test/src/components/LeagueSections.tsx).
- [x] T004 Official-source links are typed and rendered on each league page in [src/officialSources.ts](../../../volleycentral-test/src/officialSources.ts) and [src/components/LeagueSections.tsx](../../../volleycentral-test/src/components/LeagueSections.tsx).
- [x] T005 Current league scores, schedules, standings, and news are represented as a hardcoded sample dataset in [src/data.ts](../../../volleycentral-test/src/data.ts).

## Phase 1: Repository Cleanup

- [ ] T006 Remove or document the orphan root `package-lock.json`, which has no root `package.json`.
- [ ] T007 Remove unused Vite/React template assets, including `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, and unused public template assets.
- [ ] T008 Rewrite the default Vite README for VolleyCentral setup, routes, localStorage behavior, sample data, and submission scope.
- [ ] T009 Replace the default HTML title `volleycentral-test` with the VolleyCentral product title.
- [ ] T010 Replace or remove the default Vite favicon reference and document the chosen VolleyCentral favicon behavior.
- [x] T011 Confirm `dist/` is ignored in `volleycentral-test/.gitignore`.
- [ ] T012 Review the current `npm install` audit result and document the high-severity vulnerability and remediation decision; do not run `npm audit fix` automatically.

## Phase 2: MVP Data and Preferences

- [ ] T013 Remove the email field from the Preferences page and preference type, or document a specific release-scoped reason to keep it.
- [ ] T014 Define the asynchronous typed data-adapter interface for scores, schedules, standings, and attributed news links.
- [ ] T015 Implement the sample-data adapter as the only adapter and move the current hardcoded dataset behind it.
- [ ] T016 Add a visible `Sample data` label to each Scores, Schedules, Standings, and News section.
- [ ] T017 Detect invalid or empty localStorage preferences, show a reset message, clear invalid values, and use default homepage ordering.
- [ ] T018 Keep the five exact official-source URLs and confirm no other external data URLs are introduced.

## Phase 3: Profile-Driven Homepage

- [ ] T019 Author original teaching paragraphs for scoring, rotations, positions, and libero concepts.
- [ ] T020 Fact-check and record approval for the authored teaching content before release.
- [ ] T021 Add all four teaching topics and plain-language hints for Beginner Fan on the homepage only.
- [ ] T022 Add all four teaching topics with encouraging, age-appropriate language for Youth Athlete on the homepage only.
- [ ] T023 Add concise hints for High School Athlete, College Athlete, Parent, and Coach according to the specification.
- [ ] T024 Add light scoring and libero hints for Casual Fan.
- [ ] T025 Keep Super Fan's homepage view dense and free of teaching text and plain-language hints.
- [ ] T026 Verify profile changes update homepage presentation without requiring an account.

## Phase 4: Testing and Documentation

- [ ] T027 Configure Vitest, jsdom, React Testing Library, and coverage reporting.
- [ ] T028 Add unit tests for the sample-data adapter, preferences validation, localStorage reset behavior, and homepage ordering.
- [ ] T029 Add component tests for Home, Preferences, LeaguePage, LeagueSections, navigation, and official-source links.
- [ ] T030 Add keyboard-accessibility tests for navigation, preference controls, and external links.
- [ ] T031 Add 375px responsive checks for homepage, preferences, league sections, and official-source links.
- [ ] T032 Create a testing plan and test log documenting commands, results, coverage, and known gaps.
- [ ] T033 Run lint, build, Vitest, and coverage; resolve failures and confirm in-scope coverage meets the requirement.

## Phase 5: Release Review

- [ ] T034 Confirm all sample content is visibly labeled and no network data fetching or scraping exists.
- [ ] T035 Confirm no league logos, school marks, or decorative source images were introduced.
- [ ] T036 Review official-source terms and the Data Source Risks section before submission.
- [ ] T037 Verify all primary workflows are keyboard accessible and usable at 375px width.

## Future Releases

The following remain deferred and are not numbered implementation tasks for this submission:

- Accounts, authentication, server-side preferences, backend, database, OpenAPI, and server-side authorization.
- Live NCAA, LOVB, and MLV integrations.
- Favorites, following teams, notifications, and reminders.
- AI-generated match and article summaries.
- Recruiting and transfer tracking.
- USA Volleyball, youth and club coverage, recruiting resources, tournament and camp finder, coaching content, and the commercial licensing path.
