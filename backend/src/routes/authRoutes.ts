import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, name } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ message: 'Username already exists.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: name || username,
        role: 'admin',
      },
    });

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    res.status(201).json({
      message: 'User created successfully.',
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

router.post('/logout', authMiddleware, async (req: AuthRequest, res: Response) => {
  res.json({ message: 'Logout successful.' });
});

export default router;
