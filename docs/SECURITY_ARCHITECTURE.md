# Security Architecture

## Authentication & Authorization
- **Current State:** The frontend simulates authentication using React Context and `localStorage`. This is for MVP demonstration only and is **NOT** secure for production.
- **Production State (Planned):**
  - **JWT (JSON Web Tokens):** Upon login, the backend will issue an `access_token` (short-lived, e.g., 15m) and a `refresh_token` (HttpOnly, Secure cookie, e.g., 7d).
  - **Stateless Verification:** The Express middleware will verify the `access_token` signature using a secret `JWT_SECRET` stored in the environment variables.

## Data Validation & Sanitization
- All incoming requests to the API will be validated using **Zod** against strict schemas. This prevents NoSQL/SQL injection attacks and ensures data integrity before it ever reaches Prisma.
- The frontend uses React, which inherently escapes strings rendered in JSX, mitigating XSS (Cross-Site Scripting) attacks.

## Environment Secrets
- Secrets (Database URLs, API Keys for Gemini) are **never** committed to the repository. They are stored in `.env` files locally (which are gitignored) and injected securely via Vercel/Railway environment variables in production.

## Rate Limiting
- The Express backend will implement `express-rate-limit` to prevent brute-force attacks on the `/auth/login` endpoint and prevent DDoS attacks on heavy queries (like `/colleges/search`).
