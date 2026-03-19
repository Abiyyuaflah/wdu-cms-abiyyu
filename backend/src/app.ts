import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRoutes from './routes/contentRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'WDU CMS API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api', contentRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
