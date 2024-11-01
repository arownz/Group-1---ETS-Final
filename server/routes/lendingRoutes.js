// server/routes/lendingRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Create a lending
router.post('/create', (req, res) => {
  const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;
  const query = 'INSERT INTO lendings SET ?';
  db.query(query, { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status }, (err, results) => {
    if (err) {
      console.error('error creating lending:', err);
      res.status(500).send({ message: 'Error creating lending' });
    } else {
      res.send({ message: 'Lending created successfully' });
    }
  });
});

// Get all lendings
router.get('/all', (req, res) => {
  const query = 'SELECT * FROM lendings';
  db.query(query, (err, results) => {
    if (err) {
      console.error('error getting lendings:', err);
      res.status(500).send({ message: 'Error getting lendings' });
    } else {
      res.send(results);
    }
  });
});

// Get a lending by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'SELECT * FROM lendings WHERE id = ?';
  db.query(query, id, (err, results) => {
    if (err) {
      console.error('error getting lending:', err);
      res.status(500).send({ message: 'Error getting lending' });
    } else {
      res.send(results[0]);
    }
  });
});

// Update a lending
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status } = req.body;
  const query = 'UPDATE lendings SET ? WHERE id = ?';
  db.query(query, [{ lending_title, lending_borrower_name, lending_date, lending_payback_date, lending_amount, lending_description, lending_status }, id], (err, results) => {
    if (err) {
      console.error('error updating lending:', err);
      res.status(500).send({ message: 'Error updating lending' });
    } else {
      res.send({ message: 'Lending updated successfully' });
    }
  });
});

// Delete a lending
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM lendings WHERE id = ?';
  db.query(query, id, (err, results) => {
    if (err) {
      console.error('error deleting lending:', err);
      res.status(500).send({ message: 'Error deleting lending' });
    } else {
      res.send({ message: 'Lending deleted successfully' });
    }
  });
});

module.exports = router;