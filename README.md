# Holistic Growth CRM

This repository contains a simple CRM prototype with a React frontend and an Express/MongoDB backend.

## Prerequisites

- Node.js 18+
- npm
- MongoDB instance (local or remote)

## Setup

1. **Install dependencies**
   ```bash
   cd shared/types/backend && npm install
   cd ../../..
   cd frontend && npm install
   ```
2. **Environment variables**
   Create a `.env` file in `shared/types/backend` with:
   ```bash
   MONGO_URI=mongodb://localhost:27017/holistic_crm
   FRONTEND_URL=http://localhost:5173
   PORT=3000
   ```

3. **Run the backend**
   ```bash
   cd shared/types/backend
   npm run dev
   ```

4. **Run the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

The frontend will be available on `http://localhost:5173` and proxy requests to the backend at `http://localhost:3000`.

## Project Structure

- `frontend` – React application built with Vite
- `shared/types/backend` – Express API with Mongoose models
- `shared/types` – Shared TypeScript interfaces

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Compile TypeScript
- `npm run lint` – Lint the project

## Notes

This project is a starting point. Enhance authentication, validation, and error handling as needed.
