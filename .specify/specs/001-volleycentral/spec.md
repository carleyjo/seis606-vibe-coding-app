# Feature Specification: VolleyCentral

**Feature Branch**: `001-volleycentral`  
**Created**: 2026-09-21  
**Status**: Draft  
**Submission scope**: October 21, 2026

## Product Summary

VolleyCentral is a front-end-only React application that brings NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV volleyball coverage into one place. The October 21 submission is a focused MVP using sample data, browser localStorage, and official-source links. It does not include accounts, a backend, authentication, live data, or a database.

All displayed competition information must be visibly labeled **Sample data**. Official-source links are provided for users who need current information.

## Clarifications — 2026-10-07

- Profile teaching content appears on the homepage only. League pages keep their sample-data sections without teaching paragraphs.
- The sample-data adapter uses an asynchronous interface so a future permitted live-data adapter can use the same boundary.
- Scores, schedules, standings, and news each receive their own visible Sample data label.
- Invalid or empty localStorage preferences show a visible reset message before the visitor continues with default homepage ordering.
- This clarification is synchronized across `spec.md`, `plan.md`, and `tasks.md`.

## Current Status vs. Submission Scope

### Status vs. Implementation — 2026-10-07

The verified implementation currently includes:

- React 19, TypeScript, Vite, and React Router.
- Routes for `/`, `/preferences`, `/leagues/ncaa-d1`, `/leagues/ncaa-d2`, `/leagues/ncaa-d3`, `/leagues/lovb`, and `/leagues/mlv`.
- A preferences flow that saves a volleyball profile and preferred leagues in browser localStorage.
- Homepage ordering based on saved profile and league preferences.
- League pages with hardcoded sample scores, schedules, standings, and news items.
- An Official sources section on each league page with plain-text external links.

The implementation still needs the following work for the submission scope:

- Remove the email field from the preferences flow because this release has no accounts.
- Route all sample data through a small typed asynchronous adapter interface with a sample-data adapter as its only implementation.
- Add homepage-only profile-driven teaching content and plain-language hints.
- Make each Scores, Schedules, Standings, and News section visibly label its content as Sample data.
- Show a reset message when saved localStorage preferences are invalid or empty.
- Verify keyboard accessibility and usability at 375px width.

## MVP Scope

The MVP includes:

- NCAA Division I coverage.
- NCAA Division II coverage.
- NCAA Division III coverage.
- LOVB coverage.
- MLV coverage.
- Scores.
- Schedules.
- Standings.
- Attributed news links.
- Local browser preferences for profile and preferred leagues.
- A homepage ordered by profile and preferred league choices.
- Official-source links for each supported league.

The MVP does not include user accounts, passwords, authentication, server-side preferences, backend services, databases, live data integrations, or data fetching.

## Routes

The application keeps these routes:

- `/`: personalized homepage.
- `/preferences`: profile and preferred league selection.
- `/leagues/ncaa-d1`: NCAA Division I coverage.
- `/leagues/ncaa-d2`: NCAA Division II coverage.
- `/leagues/ncaa-d3`: NCAA Division III coverage.
- `/leagues/lovb`: LOVB coverage.
- `/leagues/mlv`: MLV coverage.

The navigation bar must provide keyboard-accessible links to Home, Leagues, and Preferences.

## User Scenarios and Acceptance Criteria

### User Story 1: Browse League Coverage

As a volleyball fan, I want to choose a supported league so that I can see its sample scores, schedules, standings, news, and official source link in one place.

Acceptance criteria:

1. Each supported league has its own route and page.
2. Each league page contains Scores, Schedules, Standings, News, and Official sources sections.
3. Each sample-data section is visibly labeled Sample data.
4. Official-source links use the exact URLs listed in the Official Sources section below.
5. The page remains usable at 375px without horizontal scrolling.

### User Story 2: Set Local Preferences

As a visitor, I want to choose my volleyball profile and preferred leagues so that the homepage reflects what I want to see first.

Acceptance criteria:

1. The Preferences page offers exactly these profiles: Youth Athlete, High School Athlete, College Athlete, Parent, Coach, Beginner Fan, Casual Fan, and Super Fan.
2. The Preferences page offers exactly these leagues: NCAA D1, NCAA D2, NCAA D3, LOVB, and MLV.
3. The user must select one profile and at least one league before saving.
4. Preferences are saved in browser localStorage.
5. Returning to the homepage reads the saved preferences and places preferred league content first.
6. No email, password, account, or authentication step is required in this release.

### User Story 3: Use Profile-Driven Content

As a visitor, I want the amount of explanation to match my profile so that the sample data is useful without making the page unnecessarily dense.

The teaching paragraphs and plain-language hints in this story appear on the homepage only. League pages retain their normal sample-data sections without teaching paragraphs.

The exact profile behavior is:

- **Beginner Fan**: Show four short teaching paragraphs covering scoring, rotations, positions, and the libero. Add plain-language hints beside relevant scores, schedules, standings, and news areas.
- **Youth Athlete**: Show the same four teaching topics as Beginner Fan, using encouraging, age-appropriate language and short plain-language hints. Keep the data view simple and scannable.
- **High School Athlete**: Show concise hints about scoring, rotations, positions, and libero substitutions. Do not show the full four-paragraph beginner lesson unless the user opens an explanation.
- **College Athlete**: Show compact terminology and denser score, schedule, and standings information. Do not show teaching paragraphs by default.
- **Parent**: Show short practical explanations of scoring, rotations, positions, and libero usage, with emphasis on how to read a match and schedule. Keep the data view approachable.
- **Coach**: Show the densest available sample view, including full scores, schedules, standings, and source context. Do not show teaching paragraphs by default.
- **Casual Fan**: Show light hints for scoring and the libero only. Do not show the full teaching paragraphs.
- **Super Fan**: Show the densest available sample view with no teaching paragraphs or plain-language hints.

Teaching text must be original content and will be fact-checked by the project owner.

Acceptance criteria:

1. Beginner Fan and Youth Athlete receive all four teaching topics and plain-language hints.
2. Casual Fan receives only light hints.
3. Super Fan receives the dense view without teaching text.
4. High School Athlete, College Athlete, Parent, and Coach each follow the exact differences defined above.
5. Profile changes update the homepage presentation without requiring an account.

### User Story 4: Check Official Sources

As a user who needs current information, I want a clear official source link on each league page so that I can verify the sample data independently.

Acceptance criteria:

1. The Official sources section appears on all five league pages.
2. Links are plain text only, with no league logos, school marks, or decorative images.
3. Link text follows the pattern `Official ... scores (opens in new tab)`.
4. External links use `target="_blank"` and `rel="noopener noreferrer"`.
5. Links are keyboard focusable with a visible focus style.
6. Link text wraps within a 375px viewport.
7. The line above the links reads: `Live scores, standings, and news are on the official sites. VolleyCentral currently shows sample data only.`

## Profile and Preference Storage

Preferences are stored only in browser localStorage for this release. The stored values are:

- `profile`: one supported profile.
- `leagues`: one or more supported leagues.

No email address, password, user account, authentication token, or server-side record is stored. Invalid or unreadable localStorage data should show a reset message and then fall back to the default unpersonalized homepage.

## Data Access Design

All sample coverage data must be read through a small typed asynchronous adapter interface. The sample-data adapter is the only implementation in this release.

The adapter should provide sample data for:

- Scores.
- Schedules.
- Standings.
- Attributed news links.

The adapter must not fetch from the network. The UI must clearly identify each Scores, Schedules, Standings, and News section as Sample data. A later release may add permitted data adapters, but that is not part of this submission.

## Official Sources

The application may link to these official sites only:

- NCAA Division I: [ncaa.com](https://www.ncaa.com/scoreboard/volleyball-women/d1)
- NCAA Division II: [ncaa.com](https://www.ncaa.com/scoreboard/volleyball-women/d2)
- NCAA Division III: [ncaa.com](https://www.ncaa.com/scoreboard/volleyball-women/d3)
- LOVB: [lovb.com](https://www.lovb.com/pro-league)
- MLV: [provolleyball.com](https://provolleyball.com/)

The application must not invent alternative source URLs for these league pages.

## Data Source Risks

**Status: mitigated for this release; commercial path unresolved.**

- **LOVB Terms (effective August 1, 2022)**: The terms prohibit commercial use of Site Content, data mining, robots or scrapers, and public display or derivative use without authorization.
- **NCAA.com Terms**: Scores, statistics, logos, and member-school marks may be NCAA Content or trademarks. Commercial sites need written permission to link to NCAA.com.
- **MLV**: Only WMT's own site terms were reviewed. The terms on `provolleyball.com` remain to be reviewed.
- **Candidate legal routes later**: official feeds, embeds, league partnership requests, or a licensed sports-data provider.
- **This release**: uses no scraping and no league logos or marks. It uses sample data and links to official sites only.

## Non-Functional Requirements

- The interface must be keyboard accessible, including navigation, preference controls, league links, and external source links.
- Focus states must be visible.
- The primary workflows must work at 375px without horizontal scrolling.
- Sample data labels and source context must remain readable on mobile.
- Teaching text must be original and written in plain English.
- The application must not require network access for sample data.
- No secrets, credentials, tokens, or private configuration may be committed.

## Future Releases

The following items are intentionally not part of this release and must not be deleted from the product direction.

### Accounts and Server Features

- User accounts.
- Authentication and passwords.
- Server-side preferences.
- Backend services and database persistence.
- OpenAPI documentation and server-side authorization.

### Data and Personalization

- Live NCAA, LOVB, and MLV integrations.
- Favorites and following teams.
- Notifications and reminders.
- AI-generated match and article summaries.
- Recruiting and transfer tracking.

### Version 3

- USA Volleyball news integration.
- Youth and club volleyball coverage.
- Recruiting resources.
- Tournament and camp finder.
- Coaching and training content.

### Commercial Path

A commercial release requires a reviewed rights and licensing strategy. Candidate routes are official feeds, embeds, league partnership requests, or a licensed sports-data provider. The commercial path remains unresolved for this submission.

## Constitution Exceptions

The following constitution requirements do not apply to this frontend-only release:

- **OpenAPI** does not apply because there is no backend or API.
- **Server-side authorization** does not apply because there are no accounts, authenticated requests, or server-side user records.

Remediation tasks for a future server release must add an OpenAPI contract, authentication, server-side authorization, input validation at the server boundary, and tests for those controls. The constitution's coverage requirement applies to all in-scope code in this release; test coverage is still a submission task even though no test suite currently exists.

## Success Criteria

- A visitor can navigate to all five league pages from the shared navigation.
- A visitor can save a profile and at least one preferred league in localStorage.
- A returning visitor sees preferred league content first on the homepage.
- Each league page shows scores, schedules, standings, news, sample-data labeling, and the correct official-source link.
- Beginner Fan and Youth Athlete receive four teaching topics and plain-language hints.
- Casual Fan receives light hints.
- Super Fan receives the dense view without teaching text.
- The preferences and league workflows remain usable at 375px with keyboard navigation.
- No network data fetching or backend behavior is required for the submission.
