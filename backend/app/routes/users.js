const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  const { email, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { memberships: true, plans: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Join a group
router.post('/users/:id/groups/:groupId', async (req, res) => {
  const { id, groupId } = req.params;
  try {
    const membership = await prisma.groupMembership.create({
      data: { userId: id, groupId },
    });
    res.status(201).json(membership);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to join group' });
  }
});

// Leave a group
router.delete('/users/:id/groups/:groupId', async (req, res) => {
  const { id, groupId } = req.params;
  try {
    await prisma.groupMembership.delete({
      where: { userId_groupId: { userId: id, groupId } },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to leave group' });
  }
});

module.exports = router;