# Folder Structure

Stuzen is organized as a **Monorepo** using npm workspaces. This keeps the frontend, backend, and database code separated logically while allowing them to easily share dependencies (like Prisma types).

```text
studzens/
├── frontend/                 # 🌐 The React User Interface (Deployed on Vercel)
│   ├── src/
│   │   ├── api/              # API calls to the backend
│   │   ├── components/       # Reusable UI elements
│   │   ├── contexts/         # State management
│   │   ├── pages/            # Page layouts
│   │   └── utils/            # Helper functions
│   ├── vite.config.ts        # Vite configuration (Easy and fast builds!)
│   └── package.json          # Frontend dependencies
│
├── backend/                  # ⚙️ The Node.js Server (Deployed on Railway)
│   ├── src/
│   │   ├── routes/           # Express API endpoints
│   │   ├── db.ts             # Prisma Database connection logic
│   │   └── index.ts          # Server entry point
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Backend dependencies
│
├── database/                 # 🗄️ Database Schema & Types (Hosted on Neon)
│   ├── prisma/
│   │   └── schema.prisma     # The single source of truth for our database tables
│   ├── package.json          # Prisma dependencies and migration scripts
│   └── .env                  # (Git ignored) Your secret database connection string
│
├── docs/                     # 📚 Project Documentation
│   ├── ARCHITECTURE.md
│   ├── DEVELOPER_GUIDE.md
│   ├── FOLDER_STRUCTURE.md
│   └── PROJECT_OVERVIEW.md
│
├── package.json              # The Root Monorepo configuration
└── README.md                 # Main project instructions
```

## Why this structure?
This setup is extremely **beginner-friendly and easy to maintain**:
- By splitting into workspaces, you never accidentally mix backend secret code with frontend browser code.
- We have a dedicated `database` folder, which means both the `backend` and `frontend` can safely import database types without messy relative paths.
- It makes deployment simple: Vercel only cares about `frontend`, and Railway only cares about `backend`.
