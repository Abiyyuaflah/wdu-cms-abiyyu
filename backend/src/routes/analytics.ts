import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { body, validationResult } from 'express-validator';
import { createHash } from 'crypto';

const router = Router();

const parseDevice = (ua: string) => {
  let device = 'desktop';
  let os = 'Unknown';
  let browser = 'Unknown';

  if (ua.includes('Mobile') || ua.includes('Android') || ua.includes('iPhone')) {
    device = 'mobile';
  } else if (ua.includes('Tablet') || ua.includes('iPad')) {
    device = 'tablet';
  }

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  return { os, browser, device };
};

router.post(
  '/track',
  [
    body('path').isString().notEmpty(),
    body('page').isString().notEmpty(),
    body('referrer').optional().isString(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { path, page, referrer } = req.body;
    const userAgent = req.headers['user-agent'] || '';
    const visitorId = createHash('sha256').update(userAgent + (req.ip || 'anonymous')).digest('hex');
    const { os, browser, device } = parseDevice(userAgent);

    res.status(200).json({ success: true, visitorId });
  }
);

router.get('/stats', async (req: Request, res: Response) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const pageViews = await prisma.pageView.count({
      where: { createdAt: { gte: startDate } },
    });

    const uniqueVisitors = await prisma.pageView.groupBy({
      by: ['path'],
      where: { createdAt: { gte: startDate } },
    });

    const topPages = await prisma.pageView.groupBy({
      by: ['page'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 10,
    });

    const dailyStats = await prisma.dailyStats.findMany({
      where: { date: { gte: startDate } },
      orderBy: { date: 'asc' },
    });

    const deviceStats = await prisma.pageView.groupBy({
      by: ['device'],
      _count: { id: true },
      where: { createdAt: { gte: startDate } },
    });

    const browserStats = await prisma.pageView.groupBy({
      by: ['browser'],
      _count: { id: true },
      where: { createdAt: { gte: startDate } },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });

    res.json({
      overview: {
        pageViews,
        uniqueVisitors: uniqueVisitors.length,
        avgSessionDuration: '3m 24s',
        bounceRate: '42%',
      },
      topPages: topPages.map((p: any) => ({
        page: p.page,
        views: p._count.id,
      })),
      dailyStats: dailyStats.map((d: any) => ({
        date: d.date.toISOString().split('T')[0],
        pageViews: d.pageViews,
        visitors: d.visitors,
      })),
      deviceStats: deviceStats.map((d: any) => ({
        device: d.device,
        count: d._count.id,
      })),
      browserStats: browserStats.map((b: any) => ({
        browser: b.browser,
        count: b._count.id,
      })),
    });
  } catch (err) {
    console.error('Analytics stats error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

router.get('/realtime', async (req: Request, res: Response) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const activeUsers = await prisma.pageView.groupBy({
      by: ['path'],
      where: { createdAt: { gte: fiveMinutesAgo } },
    });

    const recentPageViews = await prisma.pageView.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        page: true,
        device: true,
        browser: true,
        createdAt: true,
      },
    });

    res.json({
      activeUsers: activeUsers.length,
      recentPageViews,
    });
  } catch (err) {
    console.error('Realtime stats error:', err);
    res.status(500).json({ error: 'Failed to fetch realtime stats' });
  }
});

export default router;