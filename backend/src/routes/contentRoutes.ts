import { Router } from 'express';
import { getLandingContent, updateContent } from '../controllers/contentController';

const router = Router();

router.get('/landing', getLandingContent);
router.post('/admin/update', updateContent);

export default router;
