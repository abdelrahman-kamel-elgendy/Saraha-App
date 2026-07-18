# Saraha App

Express + MongoDB app: users get a shareable link where anyone can send them
an anonymous message.

## Setup
```
npm install
cp .env.example .env   # set MONGODB_URI and JWT_SECRET
npm start
```

Then open http://localhost:3000

## How it works
- Register an account -> get a link like `/u/yourname`
- Share that link anywhere
- Anyone (no login needed) can send you an anonymous message from that page
- Log in to `/dashboard.html` to read/delete messages in your inbox

## Project structure
```
src/
├── server.js                         # Bootstraps the app, starts the listener
├── app.js                            # Express app configuration (middleware, routes)
│
├── config/
│   ├── db.js                         # MongoDB connection
│   └── env.js                        # Loads & validates environment variables
│
├── controllers/
│   ├── auth.controller.js            # Register / Login / Logout / Me
│   ├── health.controller.js          # Service health check
│   └── messages.controller.js        # Send / Inbox / Delete messages
│
├── middlewares/
│   ├── auth.middleware.js            # Verifies JWT cookie
│   └── error.middleware.js           # Global error handler
│
├── repositories/
│   ├── user.repository.js            # User database operations
│   └── message.repository.js         # Message database operations
│
├── routes/
│   ├── auth.routes.js
│   ├── health.routes.js
│   └── message.routes.js
│
├── services/
│   ├── auth.service.js               # Authentication business logic
│   └── messages.service.js           # Message business logic
│
├── utils/
│   ├── ApiResponse.js                # Standard success response helper
│   ├── AppError.js                   # Custom operational error class
│   └── asyncHandler.js               # Async controller wrapper
│
└── validators/
    ├── auth.validator.js             # Authentication validation schemas
    └── messages.validator.js         # Message validation schemas
```

Request flow: `route -> controller -> service -> repository -> MongoDB`.

## API response format

Every endpoint returns a consistent envelope via `ApiResponse`, so the
frontend never has to guess the shape of a response.

**Success:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "id": "64f...", "username": "abdo" }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Username already taken",
  "statusCode": 409
}
```

## Global exception handling

Controllers are wrapped in `asyncHandler`, so any thrown or rejected error —
from a validator, service, or repository — is forwarded to `next()`
automatically instead of needing a `try/catch` in every controller:

```js
const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return res.status(201).json(new ApiResponse(201, user, "User registered successfully"));
});
```

`middlewares/error.middleware.js` catches everything centrally at the end of
the middleware chain. It distinguishes expected errors (`AppError` instances,
e.g. validation failures, duplicate username, not found — returned with their
own `statusCode` and `message`) from unexpected ones (logged server-side,
returned to the client as a generic 500 so internals are never leaked).

## Stack
- Express (routing)
- MongoDB + Mongoose (storage)
- bcryptjs (password hashing)
- jsonwebtoken + httpOnly cookie (auth)

## Notes / next steps
- Rate-limit `/api/messages/send/:username` to prevent spam/abuse
- Add profanity/abuse filtering on message content
- Consider adding email verification, password reset
- For production: set a strong `JWT_SECRET`, serve behind HTTPS, set `secure: true` on the cookie, and point `MONGODB_URI` at a managed cluster (e.g. Atlas)