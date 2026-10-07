# Tasks: VolleyCentral

**Feature**: `001-volleycentral`
**Plan**: [plan.md](./plan.md)
**Specification**: [spec.md](./spec.md)
**Submission**: October 21, 2026

## Phase 1: Data Boundary

- [ ] T001 Define async TypeScript adapter types for scores, schedules, standings, and attributed news links.
- [ ] T002 Implement the sample-data adapter as the only adapter implementation.
- [ ] T003 Move the current hardcoded league dataset behind the sample-data adapter.
- [ ] T004 Ensure each Scores, Schedules, Standings, and News section visibly says `Sample data`.
- [ ] T005 Verify official source URLs remain limited to the five approved URLs.

## Phase 2: Local Preferences

- [ ] T006 Remove the email field from the Preferences page and preference type.
- [ ] T007 Keep the eight profile options and five preferred-league options.
- [ ] T008 Validate that a profile and at least one league are selected before saving.
- [ ] T009 Persist and read only profile and league preferences from localStorage.
- [ ] T010 Detect invalid or empty localStorage preferences, show a reset message, clear the invalid value, and use default homepage ordering.

## Phase 3: Homepage Profile Experience

- [ ] T011 Add original teaching paragraphs for scoring, rotations, positions, and libero concepts.
- [ ] T012 Add all four teaching topics and plain-language hints for Beginner Fan.
- [ ] T013 Add all four teaching topics with encouraging, age-appropriate language for Youth Athlete.
- [ ] T014 Add concise hints for High School Athlete, College Athlete, Parent, and Coach according to the specification.
- [ ] T015 Add light scoring and libero hints for Casual Fan.
- [ ] T016 Add the dense homepage view without teaching text for Super Fan.
- [ ] T017 Keep teaching paragraphs and hints on the homepage only.
- [ ] T018 Order homepage league content by saved preferred leagues.

## Phase 4: Accessibility and Responsive Behavior

- [ ] T019 Verify keyboard navigation for all router links, preference controls, and external source links.
- [ ] T020 Verify visible focus styles for keyboard users.
- [ ] T021 Verify official source links wrap without horizontal scrolling at 375px.
- [ ] T022 Verify each sample-data section and homepage teaching content remain readable at 375px.
- [ ] T023 Confirm no league logos, school marks, or decorative source images are introduced.

## Phase 5: Testing and Submission Review

- [ ] T024 Add adapter and sample-data labeling tests.
- [ ] T025 Add preference validation, localStorage, reset-message, and ordering tests.
- [ ] T026 Add profile presentation tests for all eight profile types.
- [ ] T027 Add keyboard and responsive UI tests for Home, Preferences, and league pages.
- [ ] T028 Run lint, build, tests, and coverage; resolve failures.
- [ ] T029 Review the submission against the legal-risk notes and confirm no scraping or network fetching exists.

## Future Release Boundary

Accounts and server-side preferences, live NCAA/LOVB/MLV integrations, backend and OpenAPI, favorites, notifications, AI summaries, recruiting and transfer tracking, USA Volleyball, youth and club coverage, recruiting resources, tournament and camp finding, coaching content, and the commercial path remain future work.

## Dependencies

1. Complete T001-T005 before using the adapter in page components.
2. Complete T006-T010 before finalizing homepage preference behavior.
3. Complete T011-T018 before profile presentation review.
4. Complete T019-T023 before responsive acceptance review.
5. Complete T024-T029 before submission.
