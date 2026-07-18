# Saraha App

Saraha App is a lightweight anonymous messaging platform that allows users to create a personal profile link and receive messages from anyone without requiring the sender to log in. The application combines a simple public-facing experience with a private dashboard where the owner can read and manage incoming messages.

## Overview

This project is designed around a simple but practical social messaging flow:

1. A user registers for an account.
2. The app generates a personalized public profile URL such as `/u/yourname`.
3. Anyone can visit that link and submit an anonymous message.
4. The account owner can log in to a dashboard and view or delete messages.

The project is built with Express and MongoDB and follows a clean backend architecture with routes, controllers, services, repositories, validators, and middleware.

## Features

- User registration and authentication
- Secure login using JWTs stored in an HTTP-only cookie
- Public profile routes for receiving anonymous messages
- Anonymous message submission without authentication
- Inbox/dashboard support for viewing and deleting messages
- Consistent API response format through a shared response helper
- Centralized error handling for predictable behavior

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- dotenv for environment configuration

## Project Structure

```text
src/
├── server.js                         # Starts the HTTP server
├── app.js                           # Express app setup and route mounting
├── config/
│   ├── db.js                        # MongoDB connection setup
│   └── env.js                       # Environment variable loading/validation
├── controllers/
│   ├── auth.controller.js          # Auth endpoints
│   ├── health.controller.js       # Health check endpoint
│   └── messages.controller.js      # Message endpoints
├── middlewares/
│   ├── auth.middleware.js          # Auth guard for protected routes
│   └── error.middleware.js        # Global error handler
├── repositories/
│   ├── user.repository.js          # User data access
│   └── message.repository.js       # Message data access
├── routes/
│   ├── auth.routes.js
│   ├── health.routes.js
│   └── message.routes.js
├── services/
│   ├── auth.service.js             # Authentication business logic
│   └── messages.service.js         # Message handling logic
├── utils/
│   ├── ApiResponse.js              # Standard API response wrapper
│   ├── AppError.js                 # Custom error class
│   └── asyncHandler.js             # Async error handling wrapper
└── validators/
    ├── auth.validator.js           # Authentication input validation
    └── messages.validator.js       # Message input validation
```