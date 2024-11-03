const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Create expense
router.post('/', auth, async (req, res) => {
  try {
    const { expense_title, category_id, expense_cost, expense_date, expense_description } = req.body;

    // Check if the category exists
    const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [category_id]);
    if (!category.length) {
      return res.status(400).json({ message: 'Category does not exist' });
    }

    // Create a expense entry
    console.log('Request body:', req.body);
    const [result] = await db.execute(
      'INSERT INTO expenses (user_id, expense_title, category_id, expense_cost, expense_date, expense_description) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId, expense_title, category_id || null, expense_cost, expense_date, expense_description]
    );
    res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
});

// Add a new category
router.post('/categories', auth, async (req, res) => {
  try {
    const { category_name } = req.body;
    const [result] = await db.execute(
      'INSERT INTO categories (user_id, category_name) VALUES (?, ?)',
      [req.userId, category_name]
    );
    res.status(201).json({ message: 'Category added successfully', categoryId: result.insertId });
  } catch (error) {
    console.error('Add category error:', error);
    res.status(500).json({ message: 'Error adding category', error: error.message });
  }
});

// Get all categories for a user
router.get('/categories', auth, async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT id, category_name FROM categories WHERE user_id = ?', [req.userId]);
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Get all expenses for a user (with optional filters)
router.get('/', auth, async (req, res) => {
  try {
    let query = `
      SELECT e.*, 
             c.category_name,
             1 as is_custom
      FROM expenses e 
      LEFT JOIN categories c ON e.category_id = c.id AND c.user_id = ?
      WHERE e.user_id = ?
    `;
    const queryParams = [req.userId, req.userId];

    if (req.query.category) {
      query += ' AND c.category_name = ?';
      queryParams.push(req.query.category);
    }

    if (req.query.startDate && req.query.endDate) {
      query += ' AND e.expense_date BETWEEN ? AND ?';
      queryParams.push(req.query.startDate, req.query.endDate);
    }

    if (req.query.sortBy) {
      query += ` ORDER BY ${req.query.sortBy} ${req.query.sortOrder || 'ASC'}`;
    }

    const [expenses] = await db.execute(query, queryParams);
    res.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

// Update an expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { expense_title, category_id, expense_cost, expense_date, expense_description } = req.body;
    await db.execute(
      'UPDATE expenses SET expense_title = ?, category_id = ?, expense_cost = ?, expense_date = ?, expense_description = ? WHERE id = ? AND user_id = ?',
      [expense_title, category_id, expense_cost, expense_date, expense_description, req.params.id, req.userId]
    );
    res.json({ message: 'Expense updated successfully' });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.execute('DELETE FROM expenses WHERE id = ? AND user_id = ?', [req.params.id, req.userId]);
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
});

module.exports = router;