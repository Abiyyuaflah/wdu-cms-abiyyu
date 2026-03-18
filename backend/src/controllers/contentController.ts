import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getLandingContent = async (req: Request, res: Response) => {
  try {
    const globalContent = await prisma.globalContent.findFirst();
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    const gallery = await prisma.gallery.findMany({ orderBy: { order: 'asc' } });
    const testimonials = await prisma.testimonial.findMany({ orderBy: { order: 'asc' } });

    res.json({
      globalContent,
      services,
      gallery,
      testimonials
    });
  } catch (error) {
    console.error('Error fetching landing content:', error);
    res.status(500).json({ error: 'Failed to fetch landing content' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { section, data } = req.body;

    switch (section) {
      case 'globalContent':
        const existingContent = await prisma.globalContent.findFirst();
        if (existingContent) {
          await prisma.globalContent.update({
            where: { id: existingContent.id },
            data
          });
        } else {
          await prisma.globalContent.create({ data });
        }
        break;

      case 'services':
        if (data.id) {
          await prisma.service.update({
            where: { id: data.id },
            data
          });
        } else {
          await prisma.service.create({ data });
        }
        break;

      case 'gallery':
        if (data.id) {
          await prisma.gallery.update({
            where: { id: data.id },
            data
          });
        } else {
          await prisma.gallery.create({ data });
        }
        break;

      case 'testimonials':
        if (data.id) {
          await prisma.testimonial.update({
            where: { id: data.id },
            data
          });
        } else {
          await prisma.testimonial.create({ data });
        }
        break;

      default:
        return res.status(400).json({ error: 'Invalid section' });
    }

    res.json({ success: true, message: `${section} updated successfully` });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
};
