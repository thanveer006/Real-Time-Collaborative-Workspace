Real-Time Collaborative Workspace

This repository contains a backend application developed as part of the PurpleMerit Backend Developer Assessment (December 2025).
The project demonstrates core backend engineering concepts including authentication, authorization, real-time communication, background job processing, caching, and containerized deployment.

Technology Stack

Node.js (ES Modules)

Express.js

MongoDB Atlas

Redis (Upstash / Docker)

BullMQ

Socket.IO

JSON Web Tokens (JWT)

Swagger (OpenAPI)

Jest & Supertest

Docker & Docker Compose

Project Structure
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
├── app.js
├── server.js
└── swagger.js

Features

JWT-based authentication with refresh tokens

Role-based access control (OWNER, COLLABORATOR, VIEWER)

Project and workspace management

Real-time collaboration using Socket.IO and Redis Pub/Sub

Asynchronous job processing with BullMQ and background workers

Redis-based caching and rate limiting

MongoDB persistence with Mongoose

Swagger API documentation

Integration tests with Jest

Dockerized application setup

Authentication & Authorization

The application uses JWT for stateless authentication.
Access control is enforced using middleware that validates tokens and user roles for protected routes.
The same JWT mechanism is applied to WebSocket connections.

Real-Time Communication

Socket.IO is used to support real-time collaboration features such as workspace events, file updates, and cursor activity.
Redis Pub/Sub is used to enable cross-instance communication and scalability.

Background Job Processing

The system supports asynchronous job processing using BullMQ.
Jobs are queued, processed by a worker, retried on failure, and their status is stored in MongoDB.
Idempotency is enforced using an idempotency key.

API Documentation

Swagger UI is available at:

GET /api-docs


This provides detailed information about all available endpoints.

Running the Application
Local Setup
npm install
npm run dev


Health check:

GET http://localhost:5000/health

Docker Setup
docker compose up --build


This starts:

Backend service

Redis service

MongoDB runs on MongoDB Atlas.

Environment Variables

Create a .env file in the project root:

PORT=5000
NODE_ENV=production

MONGO_URL=your_mongodb_atlas_url
REDIS_URL=your_redis_url

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

Testing
npm test


The test suite includes integration tests for authentication, projects, and health endpoints.
Database and Redis connections are properly closed after tests.

Notes

MongoDB is used as the primary database for flexibility and scalability.

Redis is used for caching, rate limiting, real-time messaging, and job queues.

The application is designed to be stateless and horizontally scalable.

Author

Thanveer
Backend Developer

Submission

This project is submitted as part of the PurpleMerit Backend Developer Assessment.
All required features have been implemented and verified.
