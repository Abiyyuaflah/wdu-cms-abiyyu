import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import pageRoutes from './routes/pages';
import serviceRoutes from './routes/services';
import projectRoutes from './routes/projects';
import contactRoutes from './routes/contact';
import configRoutes from './routes/config';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/pages', pageRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/config', configRoutes);

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/api/v1`);
});

export { app, prisma };