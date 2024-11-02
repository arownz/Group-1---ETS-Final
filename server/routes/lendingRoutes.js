// server/routes/lendingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Create a lending record
router.post('/', auth, async (req, res) => {
    const userId = req.userId;
    const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;
    const query = `
        INSERT INTO lendings (user_id, lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    try {
      const result = await db.query(query, [userId, lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status]);
      res.status(201).json({ message: 'Lending record added successfully!', recordId: result.insertId });
    } catch (error) {
      console.error('Error adding lending record:', error);
      res.status(500).json({ error: 'Failed to add lending record' });
    }
  });

// Get all lending records
router.get('/', auth, async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM lendings');
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving lending records:', error);
        res.status(500).json({ error: 'Failed to retrieve lending records' });
    }
});

// Get a specific lending record by ID
router.get('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM lendings WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Lending record not found' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Error retrieving lending record:', error);
        res.status(500).json({ error: 'Failed to retrieve lending record' });
    }
});

// Update a lending record
router.put('/update/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;
    const query = `
        UPDATE lendings SET lending_title = ?, lending_borrower_name = ?, lending_date = ?, lending_payback_date = ?, lending_amount = ?, lending_description = ?, lending_status = ? 
        WHERE id = ?
    `;
    try {
        await db.query(query, [lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status, id]);
        res.json({ message: 'Lending record updated successfully!' });
    } catch (error) {
        console.error('Error updating lending record:', error);
        res.status(500).json({ error: 'Failed to update lending record' });
    }
});

// Delete a lending record
router.delete('/delete/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM lendings WHERE id = ?', [id]);
        res.json({ message: 'Lending record deleted successfully!' });
    } catch (error) {
        console.error('Error deleting lending record:', error);
        res.status(500).json({ error: 'Failed to delete lending record' });
    }
});

module.exports = router;
