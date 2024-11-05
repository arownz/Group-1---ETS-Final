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
        -- lending_id AS id,
          e.expense_title AS title, 
          c.category_name AS category, 
          DATE_FORMAT(e.expense_date, '%d/%m/%Y') AS expenseDate, 
          e.expense_description AS description, 
          DATE_FORMAT(e.expense_registered_date, '%d/%m/%Y, %H:%i:%s') AS registeredDate, 
          e.expense_cost AS cost 
        FROM expenses e
        LEFT JOIN categories c ON e.category_id = c.id
        WHERE e.expense_date BETWEEN ? AND ?`;
    } else if (reportType === 'lendings') {
      query = `
        SELECT 
          -- lending_id AS id, 
          lending_title AS title, 
          lending_borrower_name AS name, 
          DATE_FORMAT(lending_date, '%d/%m/%Y') AS dateLending, 
          DATE_FORMAT(lending_payback_date, '%d/%m/%Y') AS datePayBack, 
          lending_description AS description, 
          lending_status AS status, 
          DATE_FORMAT(lending_registered_date, '%d/%m/%Y, %H:%i:%s') AS registeredDate, 
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
  console.log('Request body:', req.body);
});

module.exports = router;