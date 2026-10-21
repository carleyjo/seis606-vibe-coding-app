#  🏐 VolleyCentral
## Everything Volleyball. One Place.
VolleyCentral is a web application that centralizes volleyball information across multiple leagues, including NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV.

<<<<<<< HEAD
The application was developed as part of an AI-assisted software development project using GitHub Copilot and modern web technologies. Users can browse volleyball leagues, view scores, standings, and news, manage league preferences, and access official league resources through a single interface.
=======
Main Website Link:  https://seis606-vibe-coding-app.vercel.app/

VolleyCentral is a frontend-only React application for exploring sample volleyball coverage across NCAA Division I, NCAA Division II, NCAA Division III, LOVB, and MLV.
>>>>>>> 63a6072cbfc1f1a764d161e72467b777c14ab6eb

Live Application
Vercel Deployment:

https://seis606-vibe-coding-app.vercel.app

Features
Current Features
League coverage for NCAA D1, D2, D3, LOVB, and MLV
NCAA Division I scores
NCAA Division I Top 16 rankings/standings
NCAA Division I news integration
User league preferences
Homepage personalization based on selected preferences
Official source links for each league
Responsive React interface
Server-side adapter architecture
Fallback handling when NCAA data sources are unavailable
Vercel cloud deployment
NCAA Division I Data Sources
Scores:

NCAA scoreboard integration
Standings:

NCAA Women's Volleyball Committee Top 16 Rankings
News:

NCAA Women's Volleyball D1 News
Technology Stack
Frontend
React 19
TypeScript
Vite
React Router
Backend
Vercel Serverless Functions
TypeScript
Development Tools
GitHub Copilot
ChatGPT
ESLint
Vitest
Hosting
Vercel
Project Status
Fully Working
Homepage navigation
League browsing
User preferences
NCAA D1 news
NCAA D1 standings
Official source links
Cloud deployment
Automated tests
Partially Working
NCAA D1 score integration relies on external sources and fallback behavior.
NCAA standings and news parsing depend on NCAA page structure remaining consistent.
Future Development
NCAA D2 live integration
NCAA D3 live integration
LOVB live integration
MLV live integration
User accounts
Notifications
Favorites
Accessibility improvements
Enhanced mobile optimization
Running Locally
From the project root:

cd volleycentral-test
npm install
npm run dev
Open:

http://localhost:5173
Testing
Available validation commands:

npm run build
npm run lint
npm run test
Current status:

Build passing ✅
Lint passing ✅
Test suite passing ✅
Project Structure
volleycentral-test/
│
├── api/                 Vercel serverless functions
├── server/              Adapters, registry, and server logic
├── src/
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── data.ts
│   ├── officialSources.ts
│   └── types.ts
│
├── public/
├── package.json
├── vite.config.ts
└── vercel.json
Specification Artifacts
Spec Kit Deliverables
Specification
Implementation Plan
Task List
Located in:

.specify/specs/001-volleycentral/
Supporting documentation:

docs/spec-analysis.md
docs/original-app-ideas.md
Known Limitations
NCAA content relies on external source availability.
NCAA data parsing may require updates if the NCAA website changes structure.
NCAA D2 and D3 are not yet connected to live standings/news sources.
LOVB and MLV currently use fixture-backed content.
Full accessibility testing has not yet been completed.
Lessons Learned
This project demonstrated both the advantages and limitations of AI-assisted development.

GitHub Copilot accelerated development significantly but several deployment and integration issues required manual debugging. The most notable issue occurred during Vercel deployment when ES Module import resolution caused serverless functions to fail despite all local tests passing.

The project reinforced the importance of:
Testing in production environments
Reviewing AI-generated code critically
Maintaining fallback behaviors
Incremental deployment and validation

Author: Carley Saeger
SEIS 606: Vibe Coding 
Fall 2026
University of St. Thomas
