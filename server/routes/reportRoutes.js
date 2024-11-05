// server/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/generateReport', auth, async (req, res) => {
  const { reportType, startDate, endDate } = req.query;
  console.log(`Generating ${reportType} report from ${startDate} to ${endDate}`);
  
  try {
    let query;
    if (reportType === 'expenses') {
      query = `
        SELECT 
          -- expense_id AS id, 
          expense_title AS title, 
          category_id AS category, 
          expense_date AS expenseDate, 
          expense_description AS description, 
          expense_registered_date AS registeredDate, 
          expense_cost AS cost 
        FROM expenses 
        WHERE expense_date BETWEEN ? AND ?`;
    } else if (reportType === 'lendings') {
      query = `
        SELECT 
          -- lending_id AS id, 
          lending_title AS title, 
          lending_borrower_name AS name, 
          lending_date AS dateLending, 
          lending_payback_date AS datePayBack, 
          lending_description AS description, 
          lending_status AS status, 
          lending_registered_date AS registeredDate, 
          lending_amount AS amount 
        FROM lendings 
        WHERE lending_date BETWEEN ? AND ?`;
    }

    const [rows] = await db.query(query, [startDate, endDate]);
    res.json(rows);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
});

module.exports = router;