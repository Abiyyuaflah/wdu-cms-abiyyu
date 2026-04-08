import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const configs = await prisma.siteConfig.findMany();
  res.json(configs);
});

router.put('/:key', async (req, res) => {
  const { value } = req.body;
  const config = await prisma.siteConfig.upsert({
    where: { key: req.params.key },
    update: { value },
    create: { key: req.params.key, value },
  });
  res.json(config);
});

export default router;