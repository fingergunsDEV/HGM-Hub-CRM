// backend/src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import crmRoutesV1 from './api/v1/crm.routes';
// import authRoutesV1 from './api/v1/auth.routes'; // etc.
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/holistic_crm';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));
// --- End Database Connection ---


// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Adjust for your frontend
  credentials: true, // If you need to send cookies
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// API Routes
app.get('/api/health', (req: Request, res: Response) => res.status(200).json({ status: 'UP' }));
app.use('/api/v1/crm', crmRoutesV1);
// app.use('/api/v1/auth', authRoutesV1);
// ... other route groups

// Basic Error Handling Middleware (add more sophisticated logging/reporting)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err.stack);
  // You can check err.name or err instanceof specific error types
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

// 404 Handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found on this server.' });
});


export default app;
