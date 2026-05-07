import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

export const requireSuperAdmin = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token tidak ditemukan' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };
    
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - User tidak ditemukan' });
    }
    
    if (user.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Forbidden - Super Admin only' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Token tidak valid' });
  }
};
