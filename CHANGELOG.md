# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Complete Engineering Documentation:** Added `docs/` folder with massive architectural diagrams (Mermaid.js), data flows, and state management guides.
- **Vercel SPA Fix:** Added `vercel.json` to handle 404s on direct navigation to routes like `/dashboard`.
- **Scholarship Exams:** Added 5 major national scholarships (KVPY, NTSE, etc.) to the `exams.ts` mock database.
- **Compare Quick Actions:** Added "Compare Colleges" to top navigation and dashboard quick actions.
- **Floating AI Counselor:** Relocated the AI assistant from the main navigation to a persistent floating action button for easier access.

### Changed
- **Dashboard UI Redesign:** Split college recommendations into three explicit categories (Best, Reliable, Safest) to improve clarity for users.
- **Greeting Logic:** Updated the dashboard greeting to utilize the user's name rather than raw email.
- **README Redesign:** Overhauled the `README.md` to professional open-source standards with architecture diagrams and tech stack badges.

### Fixed
- **Routing 404s:** Fixed the issue where refreshing a protected route on Vercel resulted in a Not Found error.

## [0.1.0] - 2024-05-15
### Added
- Initial release of the React/Vite SPA.
- Basic routing and `AuthContext` implementation.
- Static mock data integration for Colleges and Exams.
- MapLibre GL integration for geographical viewing.
