<div align="center">
  <img src="./public/favicon.svg" alt="Studzens Logo" width="100" />
  <h1>Studzens</h1>
  <p><strong>The Next-Generation Command Center for Indian Students</strong></p>
  <p>
    <img src="https://img.shields.io/badge/react-18-blue.svg" alt="React" />
    <img src="https://img.shields.io/badge/vite-6-purple.svg" alt="Vite" />
    <img src="https://img.shields.io/badge/typescript-strict-blue.svg" alt="TypeScript" />
    <img src="https://img.shields.io/badge/prisma-ORM-black.svg" alt="Prisma" />
  </p>
</div>

---

## 🎯 About The Project

Studzens is a centralized platform designed to demystify the college admission process for Indian students. It tracks entrance exams (JEE, NEET, CLAT, etc.), provides intelligent college recommendations (Reach, Match, Safe), and offers an AI-powered counselor to answer complex admission queries instantly.

### ✨ Features
- **Personalized Dashboard:** Get daily updates on exam countdowns and college matches based on your target stream and budget.
- **Exam Hub:** Track registration deadlines, exam dates, and counseling schedules for over 50+ national and state-level exams.
- **College Directory & Compare:** Research 100+ top Indian colleges, view placement statistics, and compare them side-by-side.
- **AI Counselor:** A floating, context-aware AI assistant that can answer questions about JoSAA counseling, cut-offs, and exam patterns.

---

## 🏗️ Architecture

Studzens utilizes a modern, serverless-first architecture to ensure lightning-fast global delivery.

```mermaid
flowchart LR
    Client[React SPA] -->|HTTPS| Edge[Vercel Edge]
    Edge -->|API Calls| Backend[Express.js Node API]
    Backend -->|TCP| DB[(Neon Postgres)]
```

> **Note:** For a complete breakdown of the architecture, data flows, and state management, please read the [Complete Engineering Documentation](./docs/COMPLETE_DOCUMENTATION.md).

---

## 🚀 Quick Start

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Aryan-del-07/studzens.git
   cd studzens
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```
   *(Note: Navigate into `/frontend`, `/backend`, and `/database` to install local dependencies if using a split monorepo setup).*

3. **Set up Environment Variables**
   Create a `.env` file in the root directory based on the `.env.example`.
   ```env
   DATABASE_URL="postgres://user:pass@ep-restless-bird-xxx.ap-southeast-1.aws.neon.tech/neondb"
   ```

4. **Initialize the Database**
   ```sh
   cd database
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

5. **Start the Frontend Development Server**
   ```sh
   cd frontend
   npm run dev
   ```

The application will now be running at `http://localhost:5173`.

---

## 📁 Folder Structure

```
studzens/
├── frontend/           # React/Vite Application
├── backend/            # Express.js API (In dev)
├── database/           # Prisma Schemas & Seed data
├── docs/               # Architecture & Flow Documentation
└── scripts/            # Utility scripts
```
For a detailed explanation, see [Folder Structure Docs](./docs/FOLDER_STRUCTURE.md).

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct, branching strategy, and the process for submitting Pull Requests.

---

## 🗺️ Roadmap

See our [Roadmap](./docs/ROADMAP.md) to understand where the project is heading next, including the rollout of predictive AI analytics and B2B counseling features.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <i>Built for the students, by the students.</i>
</div>
