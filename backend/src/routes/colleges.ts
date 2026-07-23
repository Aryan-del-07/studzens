import { Router } from 'express';
import { prisma } from '../db.js';

const router = Router();

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await prisma.college.findMany({
      include: {
        programs: true,
        placements: true,
      },
      take: 20, // Pagination limit for now
    });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Get college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await prisma.college.findUnique({
      where: { id: req.params.id },
      include: {
        programs: true,
        placements: true,
        reviews: true,
        facilities: true,
      },
    });
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch college details' });
  }
});

export default router;
