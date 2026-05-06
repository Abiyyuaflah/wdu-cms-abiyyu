import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const pages = await prisma.page.findMany({ orderBy: { slug: 'asc' } });
  res.json(pages);
});

router.get('/:slug', async (req, res) => {
  const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
  if (!page) return res.status(404).json({ error: 'Page not found' });
  res.json(page);
});

router.put('/:slug', async (req, res) => {
  const { title, metaTitle, metaDesc, sections, isPublished } = req.body;
  const page = await prisma.page.update({
    where: { slug: req.params.slug },
    data: { title, metaTitle, metaDesc, sections, isPublished },
  });
  res.json(page);
});

router.patch('/:slug/publish', async (req, res) => {
  const { isPublished } = req.body;
  const page = await prisma.page.update({
    where: { slug: req.params.slug },
    data: { isPublished },
  });
  res.json(page);
});

export default router;