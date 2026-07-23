# Stuzen — Student College Finder

> **Find Your Dream College. Plan Your Career. Ace Your Exams.**

Stuzen is a premium, production-ready web application that helps Indian students discover colleges, track entrance exams, explore careers, and get AI-powered academic guidance.

---

## 🚀 Live Demo

Run locally:
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🔍 College Search** | Search and filter 50+ colleges by state, stream, fees, and type |
| **📊 Smart Dashboard** | Personalized home with exam countdowns, college recommendations, and daily priorities |
| **🤖 AI Counselor** | Chat-based academic guidance with personalized responses |
| **🗺️ College Map** | Interactive map showing college locations with details |
| **⚖️ Compare Colleges** | Side-by-side comparison of up to 3 colleges |
| **📅 Exam Tracker** | Countdown timers, eligibility info, and exam calendars |
| **💼 Career Explorer** | Discover careers with salary, growth, and required degrees |
| **🔖 Bookmarks** | Save colleges for later review and comparison |
| **🌓 Dark Mode** | Full light/dark theme support with system preference detection |
| **📱 Mobile First** | Responsive design optimized for phones, tablets, and desktops |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + TypeScript 6 (strict mode) |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router DOM 7 |
| **Maps** | MapLibre GL |
| **Icons** | Lucide React |
| **Storage** | Browser LocalStorage (persistent sessions) |

---

## 📁 Project Structure

```
stuzen/
├── src/
│   ├── pages/           # 15 page components (one per route)
│   ├── components/       # Shared components (layout, auth, error boundaries)
│   ├── contexts/         # React Context providers (auth, profile, theme, etc.)
│   ├── hooks/            # Custom React hooks (localStorage, search)
│   ├── utils/            # Business logic (college scoring, exam analysis)
│   ├── data/             # Static data (colleges, exams, careers)
│   ├── types/            # TypeScript type definitions
│   ├── index.css         # Global styles + CSS custom properties theme system
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── index.html            # HTML entry point
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

For a detailed breakdown, see [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md).

---

## 🏗️ Architecture

Stuzen uses a **React Context-based architecture** with the following design principles:

- **Single Page Application (SPA):** All navigation happens client-side via React Router
- **State Management:** React Context (no Redux/Zustand needed for this scale)
- **Persistent Storage:** localStorage for auth, profile, and preferences
- **Data Layer:** Static JSON files (designed to be replaced by a real API)
- **Theme System:** CSS Custom Properties with Tailwind CSS dark mode

For detailed architecture docs, see [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## 🎨 Design System

The app uses a **CSS Custom Properties** theme system defined in `src/index.css`:

```css
:root {
  --bg-page:          #F6F7FB;
  --bg-surface:       #ffffff;
  --text-primary:     #0A2540;
  --text-secondary:   #425466;
  --accent-primary:   #635BFF;
  --border-default:   #E3E8EF;
  --shadow-card:      0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06);
}

.dark {
  --bg-page:          #0B1120;
  --bg-surface:       #1E293B;
  --text-primary:     #F1F5F9;
  --accent-primary:   #818CF8;
  --border-default:   #334155;
}
```

Component classes like `.sz-card`, `.btn-primary`, `.sz-input` use these variables automatically.

---

## 🧑‍💻 For Developers

### Quick Start

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding a New Page

1. Create a new file in `src/pages/YourPage.tsx`
2. Add the route in `src/App.tsx`
3. Add a link in `src/components/layout/PageShell.tsx` if needed

### Adding a New Component

1. Create a file in `src/components/YourComponent.tsx`
2. Add a file header comment explaining what it does
3. Export it and import where needed

### Modifying the Theme

Edit the CSS custom properties in `src/index.css`:
```css
:root {
  --accent-primary: #your-color;  /* Changes primary color in light mode */
}

.dark {
  --accent-primary: #your-dark-color;  /* Changes primary color in dark mode */
}
```

For a complete developer guide, see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md).

---

## 📋 Documentation Index

| Document | Purpose |
|----------|---------|
| [AUDIT_REPORT.md](./AUDIT_REPORT.md) | Complete UI/UX, code quality, and performance audit |
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | Detailed product description and user flows |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System architecture, data flow, and design patterns |
| [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) | Complete directory tree with file descriptions |
| [CODE_EXPLANATION.md](./CODE_EXPLANATION.md) | How key code sections work |
| [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) | How to develop, extend, and deploy the app |

---

## 🐛 Known Issues & Next Steps

See [AUDIT_REPORT.md](./AUDIT_REPORT.md) for:
- Complete list of bugs fixed in this session
- Performance improvements made
- Remaining recommendations for future work

---

## 📄 License

MIT License — free for personal and commercial use.

---

<p align="center">
  Built with ❤️ for students everywhere.
</p>
