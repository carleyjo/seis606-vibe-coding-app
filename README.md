#  🏐 VolleyCentral
## Everything Volleyball. One Place.

VolleyCentral is a web application that centralizes volleyball information across multiple leagues, including NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV which doesn't exist yet because volleyball has been growing so rapidly. The application was developed as part of an AI-assisted software development project using GitHub Copilot and modern web technologies. Users can browse volleyball leagues, view scores, standings, and news, manage league preferences, and access official league resources through a single interface.

## Live Application

Vercel Deployment: https://seis606-vibe-coding-app.vercel.app

## Features

- League coverage for NCAA D1, D2, D3, LOVB, and MLV
- NCAA Division I scores
- NCAA Division I Top 16 rankings/standings
- NCAA Division I news integration
- User league preferences
- Homepage personalization based on selected preferences
- Official source links for each league
- Responsive React interface
- Server-side adapter architecture
- Fallback handling when NCAA data sources are unavailable
- Vercel cloud deployment

## Technology Stack

Frontend, React 19, TypeScript, Vite, React Router, Backend, Vercel Serverless Functions, TypeScript, Development Tools, GitHub Copilot, ChatGPT, ESLint, Vitest, Hosting, Vercel

## Running Locally

From the project root:

cd volleycentral-test

npm install

npm run dev

Open:
http://localhost:5173

## Testing

Available validation commands:

npm run build

npm run lint

npm run test

## Project Structure
├── .specify/
│   ├── memory/
│   │   └── constitution.md
│   └── specs/
│       └── 001-volleycentral/
│           ├── spec.md
│           ├── plan.md
│           └── tasks.md
│
├── docs/
│
├── volleycentral-test/
│   ├── api/
│   │   └── leagues/
│   ├── public/
│   ├── server/
│   ├── src/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json

## Specification Artifacts

Spec Kit Deliverables:
- Specification
- Implementation Plan
- Task List

Located in:

.specify/specs/001-volleycentral/

Supporting documentation:

- docs/spec-analysis.md
- docs/test-log
- docs/analysis-writeup

# Known Limitations
- NCAA content relies on external source availability.
- NCAA data parsing may require updates if the NCAA website changes structure.
- NCAA D2 and D3 are not yet connected to live standings/news sources.
- LOVB and MLV currently use fixture-backed content.
- Full accessibility testing has not yet been completed.

Author: Carley Saeger

SEIS 606: Vibe Coding

Fall 2026

University of St. Thomas
