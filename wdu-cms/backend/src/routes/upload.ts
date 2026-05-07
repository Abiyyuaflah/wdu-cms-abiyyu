import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma';
import { requireSuperAdmin } from '../middleware/auth';

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config — disk storage, max 5MB, images only
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    // Sanitize filename but preserve readability
    const baseName = file.originalname
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9\s\-_]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
    'application/pdf', 'text/html'
  ];
  
  // Also check file extension for robustness
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf', '.html', '.htm'];
  
  if (allowedMimes.includes(file.mimetype) || allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar, PDF, dan HTML (HTM) yang diperbolehkan'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 20 * 1024 * 1024 // 20MB for PDF support
  },
});

// POST /api/v1/upload — upload image (requires Super Admin)
router.post('/', requireSuperAdmin, upload.single('file'), async (req: any, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Tidak ada file yang diupload' });
    }

    const baseUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const apiUrl = process.env.API_URL || 'http://localhost:3001';
    const fileUrl = `${apiUrl}/api/v1/uploads/${file.filename}`;

    const media = await prisma.media.create({
      data: {
        filename: file.filename,
        url: fileUrl,
        mimeType: file.mimetype,
        size: file.size,
        altText: req.body.altText || '',
        uploadedBy: req.user.name || req.user.email || 'Admin',
      },
    });

    res.status(201).json({
      id: media.id,
      url: media.url,
      filename: media.filename,
      mimeType: media.mimeType,
      size: media.size,
    });
  } catch (error: any) {
    console.error('[UPLOAD ERROR]:', error);
    res.status(500).json({ error: 'Gagal mengupload file' });
  }
});

// DELETE /api/v1/upload/:filename — delete media by filename
router.delete('/:filename', requireSuperAdmin, async (req: any, res) => {
  try {
    const filename = req.params.filename;
    if (!filename) {
      return res.status(400).json({ error: 'Filename diperlukan' });
    }

    // Delete file from disk
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database (if exists)
    try {
      const media = await prisma.media.findFirst({ where: { filename } });
      if (media) {
        await prisma.media.delete({ where: { id: media.id } });
      }
    } catch (dbError) {
      console.warn('DB delete failed (file still deleted from disk):', dbError);
    }

    res.json({ success: true, message: 'File berhasil dihapus' });
  } catch (error: any) {
    console.error('[UPLOAD DELETE ERROR]:', error);
    res.status(500).json({ error: 'Gagal menghapus file' });
  }
});

// GET /api/v1/upload/list — list all media from DB
router.get('/list', async (_req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ media });
  } catch (error: any) {
    console.error('[UPLOAD LIST ERROR]:', error);
    res.status(500).json({ error: 'Gagal memuat data media' });
  }
});

// DELETE /api/v1/upload/:id — delete media
router.delete('/:id', requireSuperAdmin, async (req: any, res) => {
  try {
    const media = await prisma.media.findUnique({ where: { id: req.params.id } });
    if (!media) {
      return res.status(404).json({ error: 'Media tidak ditemukan' });
    }

    // Delete file from disk
    const filePath = path.join(uploadsDir, media.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.media.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    console.error('[UPLOAD DELETE ERROR]:', error);
    res.status(500).json({ error: 'Gagal menghapus media' });
  }
});

export default router;
