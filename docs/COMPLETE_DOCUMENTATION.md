# Studzens Master Documentation Guide

Welcome to the central hub for the Studzens Engineering Documentation. This file serves as the master index to all architectural, design, and deployment documents in this repository.

## Table of Contents

### 1. Project Overview & Strategy
- **[Project Overview](PROJECT_OVERVIEW.md):** The vision, business goals, history, and target audience of Studzens.
- **[Roadmap](ROADMAP.md):** Planned features, technical debt reduction strategies, and future architectural shifts.
- **[Known Limitations](KNOWN_LIMITATIONS.md):** Current constraints in the system and technical debt.
- **[Architectural Decision Records (ADRs)](ARCHITECTURAL_DECISIONS.md):** The "Why" behind our tech stack choices (React, Vite, Prisma, Neon).

### 2. High-Level Architecture
- **[System Architecture](SYSTEM_ARCHITECTURE.md):** The big picture. How the browser, Edge CDN, Backend, and Database communicate. Includes a comprehensive Mermaid flow diagram.
- **[Data Flow](DATA_FLOW.md):** Sequence diagrams explaining how data moves during specific user actions (e.g., Logging in, Pinning an exam).
- **[User Journey & Flow](USER_FLOW.md):** State diagram mapping the lifecycle of a user navigating the application.

### 3. Frontend Architecture (React/Vite)
- **[Frontend Architecture](FRONTEND_ARCHITECTURE.md):** Deep dive into the React SPA structure, routing strategy, and styling conventions.
- **[Component Architecture](COMPONENT_ARCHITECTURE.md):** The complete React component tree and our design philosophy (Smart vs. Dumb components).
- **[State Management](STATE_MANAGEMENT.md):** How we handle global state (AuthContext, ProfileContext), local state, and browser storage persistence.

### 4. Backend & API Architecture (Node/Express)
- **[Backend Architecture](BACKEND_ARCHITECTURE.md):** The Express.js layer. Explains our "Thin Controller, Fat Service" philosophy.
- **[API Architecture](API_ARCHITECTURE.md):** Documentation of REST endpoints, request/response formats, and validation rules.

### 5. Database Architecture (Postgres/Prisma)
- **[Database Architecture](DATABASE_ARCHITECTURE.md):** The Entity Relationship Diagram (ERD), schema highlights, and our strategy for handling unstructured data using JSONB.

### 6. DevOps & Infrastructure
- **[Deployment Architecture](DEPLOYMENT_ARCHITECTURE.md):** How the app gets from code to production. Explains the Vercel (Frontend) and Neon (Database) serverless environments.
- **[Security Architecture](SECURITY_ARCHITECTURE.md):** Authentication flow, JWT handling, environment variable protection, and rate limiting.
- **[Folder Structure](FOLDER_STRUCTURE.md):** A detailed walkthrough of the physical files in this repository and how they depend on each other.
- **[Performance Strategy](PERFORMANCE.md):** How we maintain lightning-fast load times using edge caching and optimized React rendering.

---

### How to use this documentation
If you are a **new developer**, start with the [Project Overview](PROJECT_OVERVIEW.md) and [Folder Structure](FOLDER_STRUCTURE.md).
If you are a **DevOps engineer**, review the [Deployment Architecture](DEPLOYMENT_ARCHITECTURE.md).
If you are contributing a **new feature**, review the [Frontend Architecture](FRONTEND_ARCHITECTURE.md) and [State Management](STATE_MANAGEMENT.md) guides before touching the codebase.
