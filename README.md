# Intro to Backend

This project serves as an introductory backend API, designed to demonstrate fundamental backend development concepts using modern JavaScript technologies. It includes user authentication and a simple CRUD system for managing posts.

## Tech Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** (^5.1.0) - Fast, unopinionated web framework for building APIs
- **MongoDB** (with Mongoose ^8.20.0) - NoSQL database and Object Data Modeling (ODM) library
- **bcrypt** (^6.0.0) - Password hashing and verification
- **dotenv** (^17.2.3) - Environment variable management
- **nodemon** (^3.1.11) - Development dependency for auto-restarting the server on file changes

## Features

### User Authentication
- **Register User** (`POST /api/v1/users/register`): Create a new user account with username (unique, 2-20 chars), email (unique, validated), and password (hashed with bcrypt, 6-30 chars). Returns user ID, email, and username.
- **Login User** (`POST /api/v1/users/login`): Authenticate user by email and password. Compares hashed password and returns user details on success.
- **Logout User** (`POST /api/v1/users/logout`): Simple logout endpoint (marks session as logged out, though stateless in current implementation).

### Post Management (CRUD Operations)
Posts include fields: `name` (string), `description` (string), `age` (number, 1-120).

- **Create Post** (`POST /api/v1/posts/create`): Add a new post.
- **Get All Posts** (`GET /api/v1/posts/getPosts`): Retrieve all posts.
- **Update Post** (`PATCH /api/v1/posts/update/:id`): Update existing post by ID.
- **Delete Post** (`DELETE /api/v1/posts/delete/:id`): Remove post by ID.

The API connects to MongoDB using a connection string from environment variables and runs on port 8000 (configurable via `PORT` env var).