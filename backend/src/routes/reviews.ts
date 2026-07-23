import { Router } from 'express';
import { prisma } from '../db.js';
import { z } from 'zod';

const router = Router();

const reviewSchema = z.object({
  collegeId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  content: z.string().min(10),
});

// Post a new review
router.post('/', async (req, res) => {
  try {
    const validatedData = reviewSchema.parse(req.body);
    
    const review = await prisma.review.create({
      data: validatedData,
    });
    
    res.status(201).json(review);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
