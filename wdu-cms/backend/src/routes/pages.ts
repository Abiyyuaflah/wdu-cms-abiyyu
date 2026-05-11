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
  const data: any = {};
  if (title !== undefined) data.title = title;
  if (metaTitle !== undefined) data.metaTitle = metaTitle;
  if (metaDesc !== undefined) data.metaDesc = metaDesc;
  if (sections !== undefined) data.sections = sections;
  if (isPublished !== undefined) data.isPublished = isPublished;
  const page = await prisma.page.update({
    where: { slug: req.params.slug },
    data,
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