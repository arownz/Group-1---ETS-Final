const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all expenses for a user
router.get('/expenses/:userId', auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const [expenses] = await db.query('SELECT * FROM expenses WHERE user_id = ?', [userId]);
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// Get all lendings for a user
router.get('/lendings/:userId', auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const [lendings] = await db.query('SELECT * FROM lendings WHERE user_id = ?', [userId]);
    res.json(lendings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch lendings' });
  }
});

// Get all categories for a user
router.get('/categories/:userId', auth, async (req, res) => {
  const userId = req.params.userId;
  try {
    const [categories] = await db.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

module.exports = router;
