# Feature Specification: VolleyCentral

**Feature Branch**: `001-volleycentral`  
**Created**: 2026-09-21  
**Status**: Draft  
**Input**: User description: "A centralized volleyball platform for NCAA Women's Volleyball Division I, II, and III, LOVB, and MLV."

## User Scenarios & Testing

### User Story 1 - Browse a Competition Hub (Priority: P1)

As a volleyball fan, I want to switch between NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV so that I can find information for the competition I follow without visiting several websites.

**Why this priority**: Competition switching is the foundation of the platform and supports every initial-version data view.

**Independent Test**: A user can select each competition from the primary navigation and see that competition's scores, standings, schedules, and attributed news context without losing the navigation state.

**Acceptance Scenarios**:

1. **Given** the user is viewing any competition, **when** they choose another competition, **then** the application updates the active competition and loads its available content.
2. **Given** the user is on a mobile device, **when** they open the competition selector, **then** all five competition options are readable, reachable, and selectable without horizontal scrolling.
3. **Given** a selected competition has unavailable or delayed data, **when** the user views that competition, **then** the application explains the data state, identifies the source and last-updated time, and keeps navigation usable.

---

### User Story 2 - Check Scores and Schedules (Priority: P1)

As a fan, I want to see live or recently completed scores and upcoming match schedules so that I can quickly understand what is happening today and what is next.

**Why this priority**: Scores and schedules are the primary daily-return use case.

**Independent Test**: A user can open a competition and find today's live, completed, and upcoming matches, then open a match for its details when available.

**Acceptance Scenarios**:

1. **Given** the user selects a competition, **when** scores are available, **then** the application groups matches into live, final, and upcoming states with teams, date or time, and score or scheduled time.
2. **Given** a match is live, **when** the displayed data is refreshed, **then** the application shows the latest available score and an explicit last-updated time.
3. **Given** no matches exist for the selected date or competition, **when** the user views the schedule, **then** the application displays a useful empty state and provides a way to select another date or competition.
4. **Given** the user opens a match, **when** match details are available, **then** the application shows the participating teams, competition, status, result or schedule, source attribution, and available summary or statistics.

---

### User Story 3 - Explore Standings (Priority: P1)

As a fan, coach, parent, or analyst, I want team standings by competition so that I can compare teams without gathering information from multiple sites.

**Why this priority**: Standings are core to understanding team performance and are explicitly included in the MVP.

**Independent Test**: A user can choose a competition and view a clearly labeled standings table with its season, source, and update time.

**Acceptance Scenarios**:

1. **Given** standings are available, **when** the user opens the standings view, **then** the application displays the team name, position, and available record or points fields in a readable table.
2. **Given** the user switches competition or season, **when** new data is selected, **then** the table updates and clearly labels the active competition and season.
3. **Given** standings data is unavailable, **when** the user opens the view, **then** the application states that it is unavailable rather than displaying stale data as current.
4. **Given** the user views a data table on a small screen, **when** the table exceeds the viewport width, **then** the table remains usable through an accessible responsive presentation.

---

### User Story 4 - Read Attributed News Links (Priority: P1)

As a volleyball fan, parent, coach, player, or analyst, I want attributed news links for supported leagues so that I can keep up with developments in one place without leaving source publishers uncredited.

**Why this priority**: Attributed news links expand the platform beyond scores while preserving the single-destination value proposition.

**Independent Test**: A user can filter news links by competition, read a summary, and follow an attributed link to the original source.

**Acceptance Scenarios**:

1. **Given** news links are available, **when** the user opens the news view, **then** each item displays a headline, summary, publication date, source attribution, and link to the original article.
2. **Given** a user filters news by competition, **when** they apply the filter, **then** only matching items are shown and the active filter is visible.
3. **Given** an article is from an external publisher, **when** the user reads its item, **then** VolleyCentral displays only a summary and link rather than republishing the article in full.
4. **Given** no matching news exists, **when** the user applies a filter, **then** the application explains that no items match and provides a way to clear the filter.

---

### User Story 5 - Use a Personalized Homepage (Priority: P1)

As a returning user, I want a homepage based on my volleyball profile and preferred leagues so that I can see the most relevant scores, schedules, standings, and attributed news links within three clicks.

**Why this priority**: Profile and league preferences provide the MVP's simple personalization mechanism without requiring users to maintain favorite teams.

**Independent Test**: An authenticated user with a selected profile and at least one preferred league sees homepage content prioritized using those selections.

**Acceptance Scenarios**:

1. **Given** an authenticated user has selected a volleyball profile and preferred leagues, **when** they visit the homepage, **then** content is prioritized using those selections.
2. **Given** a new user completes account creation, **when** they continue onboarding, **then** the application prompts them to select a volleyball profile and one or more preferred leagues.
3. **Given** one data source fails, **when** the homepage loads, **then** available sections remain usable and the failed section shows a specific recoverable error.

---

### User Story 6 - Create an Account and Set Preferences (Priority: P1)

As a VolleyCentral user, I want to create an account and select my volleyball profile and preferred leagues so that the homepage prioritizes the content most relevant to me.

**Why this priority**: Account creation and preference selection are the only onboarding steps required for MVP personalization.

**Independent Test**: A new user can create an account, select one volleyball profile and one or more preferred leagues, and return to a personalized homepage.

**Volleyball Profiles**:

- Youth Athlete
- High School Athlete
- College Athlete
- Parent
- Coach
- Beginner Fan
- Casual Fan
- Super Fan

**Preferred Leagues**:

- NCAA D1
- NCAA D2
- NCAA D3
- LOVB
- MLV

**Acceptance Scenarios**:

1. **Given** a new user, **when** they create an account, **then** they are prompted to select a volleyball profile and preferred leagues.
## Requirements

### Functional Requirements

- **FR-001**: The system MUST support the competition contexts NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV.
- **FR-002**: The system MUST provide navigation to scores, standings, schedules, and attributed news links from the active competition or homepage context.
- **FR-003**: The system MUST show live, completed, and upcoming match states when the source provides those states.
- **FR-004**: The system MUST display the source name and last-updated time for public data views where available.
- **FR-005**: The system MUST allow users to create an account.
- **FR-006**: The system MUST persist one volleyball profile and one or more preferred leagues per authenticated user and prevent one user from reading or changing another user's preferences.
- **FR-007**: The system MUST provide homepage content prioritized by the authenticated user's volleyball profile and preferred leagues.
- **FR-008**: The system MUST provide useful empty, loading, delayed, and error states for each data view.
- **FR-009**: The system MUST allow users to filter attributed news links by competition.
- **FR-010**: The system MUST show summaries and links for external news and MUST NOT republish original articles in full.
- **FR-011**: The system MUST preserve source attribution and distinguish summaries from original news content.
- **FR-012**: The system MUST prevent authenticated-only features from operating for unauthenticated users and MUST enforce authorization server-side.
- **FR-013**: The system MUST validate all user-controlled inputs, including search, filters, dates, preference selections, and authentication fields.
- **FR-014**: The system MUST attribute public data sources and link to source material where practical.
- **FR-015**: The system MUST respect source terms of service and rate limits, including bounded polling, caching, and backoff where applicable.
- **FR-016**: The system MUST make important information and primary actions reachable within three clicks or fewer from the dashboard or active competition view.
- **FR-017**: The system MUST provide a responsive mobile-first experience for supported phone, tablet, and desktop widths.
- **FR-018**: The system MUST expose API behavior through an up-to-date OpenAPI specification.
- **FR-019**: The system MUST NOT require future-release features for access to scores, standings, schedules, or attributed news links.
- **FR-020**: The system MUST protect secrets from source control and MUST use fake placeholders in example configuration.

### Data Requirements

- A competition has a stable identifier, display name, and type.
- A team has a stable identifier, name, competition, and, where available, season or conference context.
- A match has participating teams, competition, scheduled or completed time, status, score when available, source, and last-updated time.
- A standing entry has a team, position, season, and available record or points fields.
- A news item has a title, summary, source, source URL, publication date, competition or team context when available, and content type.
- A user account has exactly one volleyball profile and one or more preferred leagues.

## Official Data Sources

VolleyCentral MVP uses publicly available information from:

- NCAA Women's Volleyball:
  https://www.ncaa.com/scoreboard/volleyball-women/d1

- League One Volleyball (LOVB):
  https://www.lovb.com/

- Major League Volleyball (MLV):
  https://provolleyball.com/

The MVP will display scores, schedules, standings, and attributed news links when available.

VolleyCentral does not republish copyrighted articles and instead provides source attribution and links to original content.

## Non-Functional Requirements

- The interface MUST remain usable with keyboard navigation and assistive technology, including clear focus states, labels, and status announcements for loading and errors.
- The application MUST use responsive layouts without requiring horizontal scrolling for primary workflows.
- Data freshness MUST be visible; the system MUST NOT imply live accuracy when source data is delayed or unavailable.
- Unit tests MUST cover production behavior and the project MUST maintain greater than 80% coverage, consistent with the constitution.
- API routes and schemas MUST be documented in OpenAPI and kept synchronized with implementation.
- The application MUST avoid exposing credentials, private configuration, or sensitive error details in client responses or logs.

## MVP Scope

The MVP includes:

- NCAA D1 coverage.
- NCAA D2 coverage.
- NCAA D3 coverage.
- LOVB coverage.
- MLV coverage.
- Scores.
- Schedules.
- Standings.
- Attributed news links.
- User accounts.
- Volleyball profile selection.
- Preferred league selection.
- Personalized homepage content based on profile and league preferences.

## Initial Release Scope

The four-month initial release focuses on:

- Competition switching across NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV.
- Scores, including live status where legally and technically available.
- Team standings.
- Match schedules.
- Attributed news summaries and links.
- User accounts with volleyball profile and preferred league selection.
- Personalized homepage content based on profile and league preferences.

## Future Releases

### Version 2

- Favorite teams and players.
- Following teams.
- Personalized dashboards based on favorite teams.
- Personalized news feed.
- Match reminders and notifications.
- Recruiting updates.
- Transfer portal updates.
- AI-generated match summaries.
- AI-generated article summaries.

### Version 3

- USA Volleyball news integration.
- Youth and club volleyball coverage.
- Recruiting resources.
- Tournament and camp finder.
- Coaching and training content.

## Out of Scope

The initial release MUST NOT include:

- Ticket purchasing.
- Merchandise sales.
- Social networking features.
- Video streaming.
- Fantasy volleyball.

## Assumptions and Dependencies

- Public data availability, licensing, terms of service, and rate limits vary by competition and source. The application will show source-specific availability rather than promise identical fields for every competition.
- Live score support depends on a permitted, reliable source. A delayed or unavailable state is acceptable when live data cannot be obtained lawfully or reliably.
- Users may browse public competition information without an account; authentication is required for profile, league preference, and personalized homepage data.
- The course timeline limits the first release to the initial release scope; additional features require explicit prioritization.

## Success Criteria

- **SC-001**: A new user can reach scores, standings, schedules, or attributed news links for any supported competition within three clicks from the landing view.
- **SC-002**: A new user can create an account and select a volleyball profile and at least one preferred league during onboarding.
- **SC-003**: A returning user with saved profile and league preferences can identify prioritized live, final, and upcoming relevant matches from the homepage without visiting another site.
- **SC-004**: Every displayed public data and news item identifies its source, and every news item provides a link to the original source.
- **SC-005**: The primary dashboard and competition workflows remain usable on a mobile viewport without horizontal scrolling.
- **SC-006**: A source outage or unavailable field produces a clear state rather than silently presenting misleading current information.
- **SC-007**: The initial release meets the constitution's greater-than-80% unit-test coverage requirement and has no undocumented secrets committed to Git.
