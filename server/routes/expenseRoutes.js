const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Get all categories for a user (including default categories)
router.get('/categories', auth, async (req, res) => {
    try {
        const [categories] = await db.execute(`
            SELECT id, category_name, 0 as is_custom
            FROM default_categories
            UNION ALL
            SELECT id, category_name, 1 as is_custom
            FROM categories
            WHERE user_id = ?
            ORDER BY is_custom, category_name
        `, [req.userId]);
        res.json(categories);
    } catch (error) {
        console.error('Get categories error:', error);
        res.status(500).json({ message: 'Error fetching categories' });
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

// Create a new expense
router.post('/', auth, async (req, res) => {
    try {
        const { expense_title, category_id, expense_cost, expense_date, expense_description } = req.body;
        if (!expense_title || !category_id || !expense_cost || !expense_date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the category exists
        const [category] = await db.execute('SELECT * FROM categories WHERE id = ?', [category_id]);
        if (!category.length) {
            const [defaultCategory] = await db.execute('SELECT * FROM default_categories WHERE id = ?', [category_id]);
            if (!defaultCategory.length) {
                return res.status(400).json({ message: 'Category does not exist' });
            }
        }
        console.log('Adding expense...');
        const [result] = await db.execute(
            'INSERT INTO expenses (user_id, expense_title, category_id, expense_cost, expense_date, expense_description) VALUES (?, ?, ?, ?, ?, ?)',
            [req.userId, expense_title, category_id, expense_cost, expense_date, expense_description || null]
        );
        console.log('Expense added successfully:', result);
        res.status(201).json({ message: 'Expense created successfully', expenseId: result.insertId });
    } catch (error) {
        console.error('Create expense error:', error);
        res.status(500).json({ message: 'Error creating expense', error: error.message });
    }
});

// Get all expenses for a user (with optional filters)
router.get('/', auth, async (req, res) => {
    try {
        let query = `
            SELECT e.*, 
                   COALESCE(c.category_name, dc.category_name) as category_name,
                   CASE WHEN c.id IS NOT NULL THEN 1 ELSE 0 END as is_custom
            FROM expenses e 
            LEFT JOIN categories c ON e.category_id = c.id AND c.user_id = ?
            LEFT JOIN default_categories dc ON e.category_id = dc.id
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