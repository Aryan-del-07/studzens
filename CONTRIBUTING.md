# Contributing to Studzens

First off, thank you for considering contributing to Studzens! It's people like you that make Studzens such a great tool for students.

## Code of Conduct

By participating in this project, you are expected to uphold a welcoming and inclusive environment. 

## Development Workflow

1. **Fork the Repository:** Create your own fork on GitHub.
2. **Clone your Fork:** `git clone https://github.com/YOUR_USERNAME/studzens.git`
3. **Create a Branch:** Create a branch for your feature or bugfix.
   - For features: `feature/short-description` (e.g., `feature/ai-chat-history`)
   - For bugs: `bugfix/issue-description` (e.g., `bugfix/mobile-nav-overlap`)
4. **Make your Changes:** Follow the Coding Standards below.
5. **Test your Changes:** Ensure the app builds (`npm run build`) and there are no TypeScript errors.
6. **Submit a Pull Request (PR):** Target the `main` branch. Describe your changes thoroughly in the PR description.

## Coding Standards

- **Language:** TypeScript strictly. Use interfaces and types for all data structures. Do not use `any` unless absolutely unavoidable.
- **Styling:** Use Tailwind CSS utility classes. Avoid writing custom CSS in `index.css` unless defining a highly reusable component wrapper (e.g., `.sz-card`).
- **Components:** Functional components only. Use React Hooks (`useState`, `useEffect`, `useMemo`).
- **Imports:** Group external imports first, then internal alias imports, then relative path imports.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format:**
`<type>[optional scope]: <description>`

**Examples:**
- `feat(dashboard): add personalized college recommendations`
- `fix(auth): resolve infinite redirect loop on login`
- `docs: update deployment architecture diagram`
- `style: format MapPage.tsx with Prettier`
- `refactor(api): extract mock data into separate services`

## Need Help?
If you are stuck on an issue, feel free to open a "Draft PR" and leave a comment explaining what you need help with. The core team will jump in to assist!
