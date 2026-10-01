import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import moduleRoutes from './routes/modules';
import quizRoutes from './routes/quiz';
import detectionRoutes from './routes/detection';
import posterRoutes from './routes/posters';
import progressRoutes from './routes/progress';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS for production and development
app.use(cors({
  origin: '*', // Allows Vercel frontend, local Vite dev server, etc.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Id']
}));

app.use(express.json());

// Health Check Endpoint (Required by Specification)
app.get('/api/health', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'PhishGuard API Backend'
  });
});

// Register Sub-Routes
app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/detection', detectionRoutes);
app.use('/api/posters', posterRoutes);
app.use('/api/progress', progressRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Unhandled API Error:', err);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

// Start Server in Standalone Node Environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🛡️ PhishGuard API Backend running on port ${PORT}`);
    console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;
