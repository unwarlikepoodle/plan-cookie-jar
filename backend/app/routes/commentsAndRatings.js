// Add routes for comments and ratings
const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

// Add a comment to a plan
router.post('/plans/:planId/comments', async (req, res) => {
  const { planId } = req.params;
  const { userId, content } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: {
        planId,
        userId,
        content,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a plan
router.get('/plans/:planId/comments', async (req, res) => {
  const { planId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { planId },
      include: { user: true },
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add a rating to a plan
router.post('/plans/:planId/ratings', async (req, res) => {
  const { planId } = req.params;
  const { userId, rating } = req.body;
  try {
    const newRating = await prisma.rating.upsert({
      where: { planId_userId: { planId, userId } },
      update: { rating },
      create: { planId, userId, rating },
    });
    res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add rating' });
  }
});

// Get average rating for a plan
router.get('/plans/:planId/ratings/average', async (req, res) => {
  const { planId } = req.params;
  try {
    const averageRating = await prisma.rating.aggregate({
      where: { planId },
      _avg: { rating: true },
    });
    res.json(averageRating._avg);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch average rating' });
  }
});

module.exports = router;