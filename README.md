# Todo Backend API

A RESTful API for a Todo application with JWT authentication.

## Tech Stack

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for input validation

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| PUT | `/api/auth/password` | Change password | Yes |

### Todos

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/todos` | Get all todos | Yes |
| GET | `/api/todos/:id` | Get single todo | Yes |
| POST | `/api/todos` | Create todo | Yes |
| PUT | `/api/todos/:id` | Update todo | Yes |
| PATCH | `/api/todos/:id/toggle` | Toggle completion | Yes |
| DELETE | `/api/todos/:id` | Delete todo | Yes |
| DELETE | `/api/todos/completed` | Delete all completed | Yes |
| GET | `/api/todos/stats` | Get statistics | Yes |

## Request/Response Examples

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Todo
```bash
POST /api/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z"
}
```

### Get Todos with Filters
```bash
GET /api/todos?completed=false&priority=high&page=1&limit=10
Authorization: Bearer <token>
```

## Response Format

All responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## License

MIT
