const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// Get all groups
router.get('/groups', async (req, res) => {
  try {
    const groups = await prisma.group.findMany();
    res.json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// Get plans for a specific group
router.get('/groups/:groupId/plans', async (req, res) => {
  const { groupId } = req.params;
  try {
    const plans = await prisma.plan.findMany({
      where: { groupId },
    });
    res.json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
});

// Create a new plan
router.post('/groups/:groupId/plans', async (req, res) => {
  const { groupId } = req.params;
  const { title, description, location, proposedTime, createdById } = req.body;
  try {
    const newPlan = await prisma.plan.create({
      data: {
        groupId,
        title,
        description,
        location,
        proposedTime: proposedTime ? new Date(proposedTime) : null,
        createdById,
      },
    });
    res.status(201).json(newPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create plan' });
  }
});

module.exports = router;