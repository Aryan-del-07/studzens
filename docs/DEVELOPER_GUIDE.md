# Developer Guide

Welcome to the Stuzen codebase! We have designed this project specifically to be **friendly, easy to use, and simple to contribute to**, even if you are newer to full-stack development.

This guide will help you get the entire full-stack application running on your computer in minutes.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
Before you start, make sure you have:
- **Node.js** installed (Version 20 or higher)
- **Git** installed

### 2. Clone the Code
```bash
git clone https://github.com/Aryan-del-07/studzens.git
cd studzens
```

### 3. Setup the Database Connection
We use Neon (Serverless PostgreSQL), which is incredibly easy to use.
1. Create a file named `.env` inside the `database` folder.
2. Add your database connection string to it like this:
   ```bash
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   ```
   *(If you don't have one, you can easily create a free database at neon.tech in 2 minutes!)*

### 4. Install Dependencies
Because this is an npm workspace (monorepo), a single command installs everything for the frontend, backend, and database!
```bash
npm install
```

### 5. Prepare the Database (Prisma)
Prisma is our incredibly friendly database tool. We need to tell it to read your `.env` file and prepare your database tables.
Run this command from the root `studzens` folder:
```bash
npm run build --workspace=@studzens/database
```
This command pushes our database schema to your live database and generates the autocomplete types for TypeScript!

---

## 🚀 Running the App Locally

To start the app, you only need one command! From the root directory, run:

```bash
npm run dev
```

This magic command automatically starts **both** the backend and the frontend at the same time:
- **Frontend** is running on: `http://localhost:5173`
- **Backend** is running on: `http://localhost:3000`

Just open `http://localhost:5173` in your browser and you're good to go!

---

## 📖 How to Contribute

We designed our tech stack to be approachable:
- Want to change how something looks? Open any React file in `frontend/src/` and use **Tailwind CSS** classes (like `text-red-500` or `p-4`).
- Want to add a new database table? Open `database/prisma/schema.prisma`. It is written in plain English. Just add your model and run `npx prisma db push` inside the database folder!
- Want to add a new API route? Open `backend/src/routes/` and add a new Express endpoint.

We welcome all Pull Requests on GitHub!
