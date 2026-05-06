import { Router } from 'express';
import prisma from '../lib/prisma';
import { requireSuperAdmin } from '../middleware/auth';

const router = Router();

// Public: Submit contact form dari website
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  console.log('[DEBUG] POST /contact - Incoming Data:', { name, email, subject });
  
  try {
    const contact = await prisma.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    console.log('[DEBUG] POST /contact - SUCCESS. ID:', contact.id);
    res.json(contact);
  } catch (err) {
    console.error('[DEBUG] POST /contact - ERROR:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Admin: Get inbox statistics
router.get('/stats', async (req, res) => {
  const unreadCount = await prisma.contactMessage.count({
    where: { isRead: false },
  });
  res.json({ unreadCount });
});

// Admin: Get all messages with pagination and search
router.get('/messages', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const search = req.query.search as string;
  const status = req.query.status as string; // 'read' | 'unread'
  const skip = (page - 1) * limit;

  const where: any = {};
  if (search && search.trim() !== '') {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { subject: { contains: search, mode: 'insensitive' } },
      { message: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (status === 'read') where.isRead = true;
  if (status === 'unread') where.isRead = false;

  console.log('[DEBUG] GET /messages - Computed Where:', JSON.stringify(where));

  try {
    console.log('[DEBUG] Querying messages...');
    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
    console.log(`[DEBUG] Found ${messages.length} messages.`);

    console.log('[DEBUG] Querying total count...');
    const total = await prisma.contactMessage.count({ where });
    console.log(`[DEBUG] Total count: ${total}`);

    res.json({ 
      messages, 
      total, 
      page, 
      totalPages: Math.ceil(total / limit) || 0 
    });
  } catch (err) {
    console.error('[DEBUG] GET /messages - FATAL ERROR:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// Admin: Mark single message as read
router.patch('/messages/:id/read', async (req, res) => {
  const message = await prisma.contactMessage.update({
    where: { id: req.params.id },
    data: { isRead: true },
  });
  res.json(message);
});

// Admin: Mark ALL messages as read
router.patch('/messages/mark-all-read', async (req, res) => {
  await prisma.contactMessage.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });
  res.json({ success: true });
});

// Admin: Delete message
router.delete('/messages/:id', requireSuperAdmin, async (req, res) => {
  await prisma.contactMessage.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

export default router;