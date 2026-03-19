import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'wdu-cms-secret-key-2024';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export const generateToken = (user: { id: number; username: string; role: string }): string => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const optionalAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
      req.user = decoded;
    } catch (error) {
      // Token invalid, but continue without user
    }
  }
  next();
};
