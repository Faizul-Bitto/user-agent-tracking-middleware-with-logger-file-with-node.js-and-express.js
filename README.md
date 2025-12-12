# Simple User Agent Tracking Middleware with Node.js and Express.js

A lightweight Express.js API server that implements user-agent tracking and validation middleware. This project demonstrates how to secure API endpoints by validating user-agent headers and tracking them for security analysis.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Examples](#examples)
- [Security Features](#security-features)

## ✨ Features

- **User-Agent Validation**: Automatically blocks suspicious user-agents (curl, wget, bots, scanners, etc.)
- **User-Agent Tracking**: Logs all user-agent strings to a JSON file for analysis
- **Token Authentication**: Simple token-based authentication via query parameter
- **Request Validation**: Uses Joi schema validation for user data
- **RESTful API**: Clean REST endpoints for user management
- **Express.js Middleware**: Modular middleware architecture

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd simple-user-agent-tracking-middleware-with-node.js-and-express.js
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variable:

- `PORT`: The port number on which the server will run (default: 3000)

### Token Configuration

The API uses a simple token-based authentication. Currently, the token is hardcoded as `"123"` in the `IsValid` middleware. To change it, modify `middleware/IsValid.js` or consider using environment variables for production.

## 🚀 Usage

Start the development server:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## 📡 API Endpoints

All endpoints are prefixed with `/api` and require:
1. A valid token query parameter (`?token=123`)
2. A valid user-agent header (not blocked)

### Get All Users

```http
GET /api/users?token=123
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John",
    "email": "john@gmail.com"
  },
  {
    "id": 2,
    "name": "Jane",
    "email": "jane@gmail.com"
  }
]
```

### Get User by ID

```http
GET /api/users/:id?token=123
```

**Parameters:**
- `id` (path parameter): User ID

**Response:**
```json
[
  {
    "id": 1,
    "name": "John",
    "email": "john@gmail.com"
  }
]
```

### Create User

```http
POST /api/users?token=123
Content-Type: application/json
```

**Request Body:**
```json
{
  "id": 4,
  "name": "Alice",
  "email": "alice@example.com"
}
```

**Validation Rules:**
- `id`: Must be a positive number (required)
- `name`: Must be a string between 3-100 characters (required)
- `email`: Must be a valid email address (required)

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 4,
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```

## 🛡️ Middleware

### 1. `isValid` Middleware

Located in `middleware/IsValid.js`

- **Purpose**: Validates the authentication token
- **Validation**: Checks for `token` query parameter (must equal `"123"`)
- **Response**: Returns 401 Unauthorized if token is invalid

### 2. `checkUserAgent` Middleware

Located in `middleware/CheckUserAgent.js`

- **Purpose**: Validates and tracks user-agent headers
- **Blocked Patterns**: Automatically blocks requests from:
  - `curl`
  - `wget`
  - `python-requests`
  - `Go-http-client`
  - `Java`
  - `sqlmap`
  - `nmap`
  - `Nikto`
  - `HeadlessChrome`
  - `PhantomJS`
- **Tracking**: Logs all user-agent strings to `userAgent.json`
- **Response**: Returns 403 Forbidden if user-agent is missing or blocked

## 📁 Project Structure

```
.
├── controller/
│   └── UserController.js      # User business logic
├── middleware/
│   ├── CheckUserAgent.js      # User-agent validation middleware
│   └── IsValid.js              # Token validation middleware
├── model/
│   └── schema/
│       └── User.js             # Joi validation schema
├── routes/
│   └── user.js                 # User routes
├── utils/
│   └── logger.js               # User-agent logging utility
├── index.js                    # Application entry point
├── users.js                    # User data store
├── userAgent.json              # Logged user-agent strings
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🛠️ Technologies Used

- **Express.js** (v5.1.0): Web framework for Node.js
- **Joi** (v18.0.1): Schema validation library
- **Nodemon** (v3.1.10): Development tool for auto-restarting server

## 💡 Examples

### Using cURL (Will be blocked)

```bash
curl http://localhost:3000/api/users?token=123
```

**Response:**
```json
{
  "message": "Forbidden: Suspicious User-Agent"
}
```

### Using Browser or Postman

```bash
GET http://localhost:3000/api/users?token=123
```

With a valid browser user-agent, this will return the users list.

### Creating a User

```bash
curl -X POST http://localhost:3000/api/users?token=123 \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  -d '{
    "id": 4,
    "name": "Alice",
    "email": "alice@example.com"
  }'
```

### Invalid Token

```bash
GET http://localhost:3000/api/users?token=wrong
```

**Response:**
```json
{
  "message": "Unauthorized: Invalid Token"
}
```

## 🔒 Security Features

1. **User-Agent Filtering**: Blocks automated tools and bots
2. **Token Authentication**: Simple token-based access control
3. **Request Validation**: Validates all incoming user data using Joi schemas
4. **User-Agent Logging**: Tracks all user-agent strings for security analysis

## 📝 Notes

- The `userAgent.json` file is automatically created and updated with all user-agent strings
- User data is currently stored in memory (`users.js`). For production, consider using a database
- The token validation is simplified for demonstration. For production, use proper authentication (JWT, OAuth, etc.)
- The user-agent blocking patterns can be customized in `middleware/CheckUserAgent.js`

## 👤 Author

**Faizul Bitto**