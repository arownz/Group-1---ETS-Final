const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Create a new expense
router.post('/', auth, async (req, res) => {
    try {
        const { expense_title, expense_category, expense_cost, expense_date, expense_description } = req.body;
        const [result] = await db.execute(
            'INSERT INTO expenses (user_id, expense_title, expense_category, expense_cost, expense_date, expense_description) VALUES (?, ?, ?, ?, ?, ?)',
            [req.userId, expense_title, expense_category, expense_cost, expense_date, expense_description]
        );
        res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
    } catch (error) {
        console.error('Create expense error:', error);
        res.status(500).json({ message: 'Error creating expense' });
    }
});

// Get all expenses for a user
router.get('/', auth, async (req, res) => {
    try {
        const [expenses] = await db.execute('SELECT * FROM expenses WHERE user_id = ?', [req.userId]);
        res.json(expenses);
    } catch (error) {
        console.error('Get expenses error:', error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

module.exports = router;