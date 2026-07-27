# API Architecture

The backend exposes a RESTful API designed around resources (Colleges, Exams, Users).

## Base URL
`/api/v1`

## Authentication
All protected routes require a Bearer token in the `Authorization` header.
```http
Authorization: Bearer <jwt_token>
```

## Standard Response Format
All API responses follow a predictable JSON structure to simplify frontend error handling.

**Success (2xx):**
```json
{
  "success": true,
  "data": { ... } 
}
```

**Error (4xx / 5xx):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format"
  }
}
```

---

## Endpoints (Current & Planned)

### 1. Authentication (`/api/v1/auth`)

#### `POST /auth/register`
- **Purpose:** Create a new user account.
- **Request Body:** `{ "name": "...", "email": "...", "password": "..." }`
- **Response:** User object + JWT Token.
- **Validation:** Passwords must be > 8 chars, email must be valid format.

#### `POST /auth/login`
- **Purpose:** Authenticate an existing user.
- **Request Body:** `{ "email": "...", "password": "..." }`
- **Response:** User object + JWT Token.

---

### 2. Colleges (`/api/v1/colleges`)

#### `GET /colleges`
- **Purpose:** Retrieve a list of colleges, with optional filtering.
- **Query Params:** `?type=IIT&location=Delhi&limit=10`
- **Response:** Array of College objects.

#### `GET /colleges/:id`
- **Purpose:** Retrieve detailed information for a specific college, including programs and placements.
- **Response:** Single College object with nested relations.

---

### 3. Exams (`/api/v1/exams`)

#### `GET /exams`
- **Purpose:** Retrieve upcoming exams.
- **Query Params:** `?category=Engineering`
- **Response:** Array of Exam objects.

---

### 4. User Profile (`/api/v1/users`)

#### `GET /users/me`
- **Purpose:** Fetch the currently authenticated user's profile and tracked/bookmarked data.
- **Auth:** Required.

#### `PUT /users/me`
- **Purpose:** Update user settings (e.g., target stream).
- **Auth:** Required.
- **Request Body:** `{ "stream": "PCM" }`
