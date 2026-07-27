# Contributing to Studzens

Thank you for considering contributing to Studzens! This guide covers everything you need to get started.

---

## Development Workflow

1. **Fork the Repository** — Create your own fork on GitHub.
2. **Clone your fork:**
   ```sh
   git clone https://github.com/YOUR_USERNAME/studzens.git
   cd studzens
   npm install
   ```
3. **Create a branch:**
   - Features: `feature/short-description` (e.g. `feature/ai-counselor`)
   - Bug fixes: `bugfix/issue-description` (e.g. `bugfix/logo-navbar-overlap`)
   - Docs: `docs/what-you-updated`
4. **Make your changes** following the coding standards below.
5. **Build & lint** to catch errors before pushing:
   ```sh
   npm run build --workspace=@studzens/frontend
   npm run lint --workspace=@studzens/frontend
   ```
6. **Submit a Pull Request** targeting the `main` branch. Describe your changes clearly.

---

## Coding Standards

### TypeScript
- **Strict mode** is on. Never use `any` unless absolutely unavoidable and commented.
- Define all data shapes as interfaces/types in `src/types/`.
- Prefer `interface` for object shapes, `type` for unions/aliases.

### React
- **Functional components only.** No class components.
- Use hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`.
- Avoid prop-drilling beyond two levels — use Context instead.
- All pages in `src/pages/` should be **thin orchestrators** — minimal JSX, import from features/components.

### Styling
- **Tailwind CSS 4** utility classes are primary.
- Custom classes (e.g. `.btn-primary`, `.sz-card`) are defined in `src/styles/index.css`. Add to these if you need a reusable styled pattern.
- Do **not** add inline `style={{}}` for layout. Use Tailwind classes.

### Imports
Order your imports:
1. External packages (`react`, `react-router-dom`, `lucide-react`)
2. Internal contexts (`../contexts/AuthContext`)
3. Internal components (`../components/...`)
4. Types (`../types/...`)
5. Relative imports (`./utils`)

### Naming
| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `CollegeCard.tsx` |
| Hooks | camelCase with `use` prefix | `useSearch.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `College`, `ExamDate` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_COMPARE_COUNT` |

---

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>[optional scope]: <short description>
```

### Types
| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `refactor` | Refactor (no feature, no fix) |
| `perf` | Performance improvement |
| `chore` | Build, tooling, dependency updates |

### Examples
```
feat(dashboard): add personalized college recommendations
fix(navbar): remove scale-[1.5] causing logo to overflow header
fix(deploy): read $PORT from env inside preview script
docs: update README with monorepo workspace setup
style: run prettier on SearchPage.tsx
refactor(api): extract mock college data into typed service
```

---

## Where to Put New Code

| What | Where |
|---|---|
| New page | `frontend/src/pages/NewPage.tsx` + route in `App.tsx` |
| Reusable UI component | `frontend/src/components/common/` |
| Layout component | `frontend/src/components/layout/` |
| Feature-specific component | `frontend/src/features/<feature>/components/` |
| New global context | `frontend/src/contexts/NewContext.tsx` |
| Custom hook | `frontend/src/hooks/useNewHook.ts` |
| TypeScript types | `frontend/src/types/<domain>.ts` |
| Pure utility | `frontend/src/utils/<name>.ts` |
| New API endpoint | `backend/src/routes/<resource>.ts` + register in `index.ts` |
| New DB table | `database/prisma/schema.prisma` + `npx prisma db push` |
| Mock data | `frontend/src/api/mocks/<name>.ts` |

---

## Need Help?

Open a **Draft PR** with a comment explaining what you're stuck on, and the core team will jump in to assist.
