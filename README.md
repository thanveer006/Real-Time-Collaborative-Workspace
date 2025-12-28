PurpleMerit Backend Assessment

A scalable backend system built as part of the Backend Developer Assessment – December 2025 for PurpleMerit.
The application demonstrates clean architecture, secure authentication, real-time collaboration, background job processing, caching, and production-ready practices.

🚀 Tech Stack

Node.js (ES Modules)

Express.js

MongoDB Atlas (Primary database)

Redis (Upstash / Docker) – caching, rate limiting, Pub/Sub

BullMQ – asynchronous job processing

Socket.IO – real-time collaboration

JWT – authentication & authorization

Swagger (OpenAPI) – API documentation

Jest + Supertest – integration testing

Docker & Docker Compose

🏗️ Architecture Overview

The project follows a layered, modular architecture:

src/
├── api/
│   └── v1/
│       ├── auth/
│       ├── projects/
│       ├── workspaces/
│       └── jobs/
├── domain/
│   └── entities/
├── infrastructure/
│   ├── database/
│   ├── queue/
│   └── websocket/
├── middleware/
├── swagger.js
├── app.js
└── server.js

Key Design Principles

Separation of concerns (controller / service / domain)

Stateless APIs with JWT

Redis for performance & scalability

Idempotent job handling

Fail-safe middleware (graceful degradation)

🔐 Authentication & Authorization

JWT-based authentication

Access token

Refresh token

Role-Based Access Control (RBAC)

OWNER

COLLABORATOR

VIEWER

Middleware enforced on protected routes

Secure token validation for HTTP and WebSocket connections

📁 Core Features
1️⃣ Projects & Workspaces

Create, update, delete projects

Invite collaborators

Assign and update roles

Create and list workspaces per project

2️⃣ Real-Time Collaboration

Socket.IO based communication

Workspace join/leave events

File change and cursor update events

Redis Pub/Sub for multi-instance scalability

3️⃣ Background Jobs

Job submission API

BullMQ queue with retries & backoff

Dedicated worker for processing jobs

Job status persisted in MongoDB

Idempotency via idempotencyKey

4️⃣ Performance & Scalability

Redis caching for read-heavy APIs

Redis-based rate limiting

Stateless services suitable for horizontal scaling

⚡ Redis Usage

Redis is used for:

API rate limiting

Caching project and workspace reads

Pub/Sub for WebSocket events

BullMQ job queue & worker

Supports:

Upstash Redis (production)

Docker Redis (local development)

📚 API Documentation

Swagger UI is available at:

GET /api-docs


All endpoints, request bodies, and responses are documented.

🧪 Testing

Jest + Supertest integration tests

Covers:

Authentication flow

Project APIs

Health check

Proper teardown to avoid open handles (MongoDB + Redis closed)

Run tests:

npm test

🐳 Docker Setup
Run with Docker Compose
docker compose up --build


Services:

Backend (Node.js)

Redis

MongoDB is hosted on MongoDB Atlas

⚙️ Environment Variables

Create a .env file in the root:

PORT=5000
NODE_ENV=production

MONGO_URL=your_mongodb_atlas_url

REDIS_URL=your_redis_url

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

▶️ Running Locally (Without Docker)
npm install
npm run dev


Health check:

GET http://localhost:5000/health

🧠 Design Decisions & Trade-offs

MongoDB chosen for flexible schemas and rapid iteration

Redis used explicitly for caching and distributed coordination

BullMQ chosen over simple async handlers for reliability and retries

Fail-open rate limiting to avoid blocking traffic on Redis outages

PostgreSQL connection included to demonstrate multi-database readiness

📌 Assessment Coverage

✔ Authentication & RBAC
✔ Project & Workspace APIs
✔ Real-time collaboration
✔ Asynchronous job processing
✔ Redis caching & rate limiting
✔ API documentation
✔ Automated tests
✔ Dockerized deployment

✅ Submission Notes

GitHub repository includes full source code

Docker setup included

Swagger documentation available

Tests passing

Live deployment link provided separately