# Stuzen — Student College Finder 🎓

> **Find Your Dream College. Plan Your Career. Ace Your Exams.**

Stuzen is a premium, production-ready full-stack web application that helps Indian students discover colleges, track entrance exams, explore careers, and get AI-powered academic guidance.

---

## 🚀 Live Environments

The application is deployed live in production:
- **Frontend (Deployed on Vercel):** [https://studzens.vercel.app](https://studzens.vercel.app)
- **Backend (Deployed on Railway):** Node.js API handling business logic and data routing.
- **Database (Hosted on Neon):** Serverless PostgreSQL.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM 7
- **Maps:** MapLibre GL
- **Icons:** Lucide React

### Backend & Database
- **Runtime:** Node.js (Express.js)
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Language:** TypeScript (ESM)

---

## 🌐 Architecture & Monorepo Structure

This project uses npm workspaces to manage a monorepo structure, allowing seamless sharing of database types between the frontend and backend.

```
studzens/
├── frontend/      # React & Vite application (Vercel)
├── backend/       # Express.js REST API (Railway)
└── database/      # Prisma schema, migrations, and database types
```

---

## 💻 Local Development

Follow these steps to run the complete stack on your local machine:

### 1. Prerequisites
- Node.js (v20 or higher)
- PostgreSQL (or a Neon database string)

### 2. Setup Environment Variables
Create a `.env` file in the `database` folder with your connection string:
```bash
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
```

### 3. Install & Run
Run these commands from the root directory:

```bash
# Install all dependencies across all workspaces
npm install

# Push database schema & generate Prisma client
npm run build --workspace=@studzens/database

# Start both frontend and backend development servers
npm run dev
```
- Frontend will run on: `http://localhost:5173`
- Backend API will run on: `http://localhost:3000`

---

## 🤝 Contributing

We welcome contributions from the open-source community! Whether it's fixing a bug, adding a new feature, or improving documentation, we'd love your help.

### How to Contribute

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/studzens.git
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-amazing-feature
   ```
4. **Make your changes** and commit them using descriptive messages:
   ```bash
   git commit -m "feat: add amazing new feature"
   ```
5. **Push your branch** to GitHub:
   ```bash
   git push origin feature/your-amazing-feature
   ```
6. **Open a Pull Request (PR)** on the main repository.

### Contribution Guidelines
- Ensure your code follows the existing TypeScript conventions and strict mode rules.
- Test your changes locally before submitting a PR.
- If you're changing the database schema in `database/prisma/schema.prisma`, remember to test the migration via Prisma.

---

## ✨ Features

- **🔍 College Search**: Search and filter colleges by state, stream, fees, and type.
- **📊 Smart Dashboard**: Personalized home with exam countdowns, college recommendations, and daily priorities.
- **🤖 AI Counselor**: Chat-based academic guidance with personalized AI responses.
- **🗺️ College Map**: Interactive map showing college locations with details.
- **📅 Exam Tracker**: Countdown timers, eligibility info, and exam calendars.
- **💼 Career Explorer**: Discover careers with salary, growth, and required degrees.

---

## 📄 License

MIT License — free for personal and commercial use.

---

<p align="center">
  Built with ❤️ for students everywhere.
</p>
