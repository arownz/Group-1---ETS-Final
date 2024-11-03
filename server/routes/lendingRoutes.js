const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Create lending
router.post('/', auth, async (req, res) => {
    try {
        const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;

        // Create a lending entry
        console.log('Request body:', req.body);
        const [result] = await db.execute(
            'INSERT INTO lendings (user_id, lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.userId, lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status || 'Pending']
        );
        res.status(201).json({ message: 'Lending added successfully', lendingId: result.insertId });
    } catch (error) {
        console.error('Add lending error:', error);
        res.status(500).json({ message: 'Error adding lending', error: error.message });
    }
});

// Get all lendings for a user
router.get('/', auth, async (req, res) => {
    try {
      const [lendings] = await db.execute(
        'SELECT * FROM lendings WHERE user_id = ?',
        [req.userId]
      );
      res.json(lendings);
    } catch (error) {
      console.error('Get lendings error:', error);
      res.status(500).json({ message: 'Error fetching lendings' });
    }
  });

// Update a lending entry
router.put('/:id', auth, async (req, res) => {
    try {
        const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;
        await db.execute(
            'UPDATE lendings SET lending_title = ?, lending_borrower_name = ?, lending_date = ?, lending_payback_date = ?, lending_amount = ?, lending_description = ?, lending_status = ? WHERE id = ? AND user_id = ?',
            [lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status, req.params.id, req.userId]
        );
        res.json({ message: 'Lending updated successfully' });
    } catch (error) {
        console.error('Update lending error:', error);
        res.status(500).json({ message: 'Error updating lending', error: error.message });
    }
});

// Delete a lending entry
router.delete('/:id', auth, async (req, res) => {
    try {
        await db.execute(
            'DELETE FROM lendings WHERE id = ? AND user_id = ?',
            [req.params.id, req.userId]
        );
        res.json({ message: 'Lending deleted successfully' });
    } catch (error) {
        console.error('Delete lending error:', error);
        res.status(500).json({ message: 'Error deleting lending' });
    }
});

module.exports = router;
