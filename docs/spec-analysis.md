# VolleyCentral Specification Analysis

**Analysis date**: 2026-10-07
**Scope**: Read-only consistency review of `spec.md`, `plan.md`, `tasks.md`, and the current frontend implementation.

## Summary

The routing, local preference flow, league pages, official-source links, and hardcoded sample dataset are present. The clarified adapter, sample-data labels, profile teaching content, email removal, reset-message behavior, and testing setup are not yet implemented.

## High-Priority Gaps

### Email field contradicts the updated specification

The specification says this release has no email or accounts. The implementation still requires and stores email in:

- `volleycentral-test/src/pages/PreferencesPage.tsx`
- `volleycentral-test/src/types.ts`
- `volleycentral-test/src/lib/preferences.ts`

Task `T013` correctly remains incomplete.

### Typed async data adapter is not implemented

The specification and plan require an asynchronous adapter boundary. No `dataAdapter.ts` exists. Sample data still comes directly from `volleycentral-test/src/data.ts`.

Tasks `T014` and `T015` remain incomplete.

### Sample-data labels are incomplete

The specification requires individual `Sample data` labels for Scores, Schedules, Standings, and News. The current `volleycentral-test/src/components/LeagueSections.tsx` visibly labels only News as Sample data.

Tasks `T016` and `T034` remain incomplete.

### Profile-driven teaching content is not implemented

The specification defines different homepage behavior for all eight profiles. No teaching paragraphs, plain-language hints, or profile-specific presentation logic exist in the source.

Tasks `T019` through `T026` remain incomplete.

### Invalid localStorage reset behavior is incomplete

`volleycentral-test/src/lib/preferences.ts` removes malformed JSON and returns `null`, but no visible reset message is shown. The app silently falls back to the default homepage.

Task `T017` remains incomplete.

## Verified Complete

- React Router routes in `volleycentral-test/src/App.tsx`.
- Profile and league selection in `volleycentral-test/src/pages/PreferencesPage.tsx`.
- localStorage persistence in `volleycentral-test/src/lib/preferences.ts`.
- Homepage league ordering in `volleycentral-test/src/pages/HomePage.tsx`.
- Five league pages through `volleycentral-test/src/pages/LeaguePage.tsx`.
- Scores, schedules, standings, and news sample data in `volleycentral-test/src/data.ts`.
- Official-source mapping and rendering through `volleycentral-test/src/officialSources.ts` and `volleycentral-test/src/components/LeagueSections.tsx`.
- `dist/` is ignored in `volleycentral-test/.gitignore`.

## Plan Consistency Issue

The plan's Constitution Check marks **Verified Quality** as `Met`, but Vitest, React Testing Library, and coverage are not configured yet. This should be treated as `Deferred` until the testing tasks are completed.

The task list is otherwise aligned with the current state:

- Completed: `T001-T005` and `T011`.
- Incomplete: repository cleanup, email removal, adapter work, sample-data labels, profile teaching, reset behavior, tests, documentation, and release review.

## Verification Basis

This analysis was produced from source and specification inspection. No files were modified and no additional runtime commands were run for this saved report.
