# System Architecture

Stuzen is built using a modern, easy-to-understand **Monorepo Architecture**. We specifically chose technologies that are incredibly developer-friendly, fast, and easy to use.

## The Full Stack Workflow

1. **The User Interface (Frontend):** 
   - A single-page application built with React and Vite. 
   - It communicates with the backend via REST API calls. 
   - Deployed on **Vercel** for lightning-fast, zero-configuration global delivery.

2. **The Server (Backend):** 
   - A simple Express.js Node server handling business logic and API requests. 
   - Deployed on **Railway**, which makes running Node servers as easy as a single click.

3. **The Data Layer (Database):** 
   - A serverless PostgreSQL database hosted on **Neon**. Neon takes away all the headache of managing databases—it just works like magic.
   - We use **Prisma ORM** to talk to the database. Prisma is widely considered the most developer-friendly database tool available today because it gives you autocomplete for all your database queries!

---

## 🛠️ The Tech Stack (Why we chose it)

Our stack was designed with one primary goal: **Make it easy and friendly to build and scale.**

| Technology | Role | Why it's friendly & easy to use |
|------------|------|---------------------------------|
| **Vite** | Frontend Tooling | Extremely fast. It starts up instantly, so you never have to wait for your screen to update when you change code. |
| **Tailwind CSS** | Styling | You design right in your HTML without having to write separate CSS files or invent class names. |
| **React** | User Interface | The most popular UI library in the world, meaning if you get stuck, the answer is just a Google search away. |
| **Express.js** | Backend API | The easiest, most straightforward way to build a web server in Node.js. |
| **Prisma** | Database ORM | The ultimate beginner-friendly database tool. It reads your database tables and gives you perfect TypeScript autocomplete. No SQL knowledge required! |
| **Neon** | Database Hosting | Serverless PostgreSQL. It scales automatically and gives you a connection string in seconds. No complex server configuration. |
| **Vercel & Railway** | Deployment | Drag-and-drop / GitHub-linked deployments. You just push your code to GitHub, and these platforms handle the rest automatically. |

## Data Flow

1. User interacts with a React component (e.g., clicks "Save College").
2. The frontend makes an HTTP `fetch` request to our Express Backend.
3. The Express Backend receives the request, verifies it, and uses Prisma to save the data.
4. Prisma writes the data to the Neon PostgreSQL database.
5. The backend sends a success response back to the frontend, which updates the UI.
