# Task Manager

A full-stack web application for creating, viewing, updating, and deleting tasks. Built with React (Vite + TypeScript + Tailwind) and Node.js (Express + MongoDB with Mongoose).

## Features

- **Dashboard**: List all tasks with Title, Description, Status, and Created Date
- **Add Task**: Form with validation (title required)
- **Edit Task**: Update title, description, and status
- **Delete Task**: Remove tasks with confirmation
- **Mark Completed / Pending**: Toggle task status with a visual indicator for completed tasks
- Tasks are sorted by latest created first
- Responsive layout

## Prerequisites

- **Node.js** (v18 or later)
- **MongoDB** (local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string)

## Setup

### 1. Backend (server)

```bash
cd server
npm install
```

Create a `.env` file (see `server/.env.example`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
```

### 2. Frontend (client)

```bash
cd client
npm install
```

Create a `.env` file in `client/` (see `client/.env.example`):

```
VITE_API_URL=http://localhost:5000
```

## Run

1. **Start MongoDB** (if running locally).

2. **Start the API server**:

```bash
cd server
npm run dev
```

Server runs at `http://localhost:5000`.

3. **Start the React app** (in a new terminal):

```bash
cd client
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`) in your browser.

**Note:** "Failed to fetch" means the client cannot reach the API. Ensure the server is running and `VITE_API_URL` in `client/.env` points to it (e.g. `http://localhost:5000`).

**MongoDB Atlas:** If you see `querySrv ENOTFOUND _mongodb._tcp....mongodb.net`, your network or DNS cannot resolve Atlas SRV records. Use the **standard** (non-SRV) connection string from Atlas (e.g. from "Connect using MongoDB Compass" or the non-`mongodb+srv` URI), or use local MongoDB: `MONGODB_URI=mongodb://localhost:27017/taskmanager`.

## API Endpoints

| Method   | Endpoint      | Description        |
|----------|---------------|--------------------|
| GET      | /tasks        | Get all tasks      |
| POST     | /tasks        | Create a task      |
| PUT      | /tasks/:id    | Update a task      |
| DELETE   | /tasks/:id    | Delete a task      |
