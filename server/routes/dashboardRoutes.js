const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/dashboard-summary', auth, async (req, res) => {
    try {
        // Query for total expense cost
        const [expenses] = await db.query(`SELECT SUM(expense_cost) AS totalExpenses, 
                                       COUNT(*) AS numberOfExpenses 
                                       FROM expenses 
                                       WHERE MONTH(expense_date) = MONTH(CURDATE()) 
                                       AND YEAR(expense_date) = YEAR(CURDATE())`);
        const [lendings] = await db.query(`SELECT SUM(lending_amount) AS totalLendings, 
                                       COUNT(*) AS numberOfLendings 
                                       FROM lendings 
                                       WHERE MONTH(lending_date) = MONTH(CURDATE()) 
                                       AND YEAR(lending_date) = YEAR(CURDATE())`);

        const [totalYearExpenses] = await db.query(`SELECT SUM(expense_cost) AS thisYearTransactions 
                                                FROM expenses 
                                                WHERE YEAR(expense_date) = YEAR(CURDATE())`);
        const [totalYearLendings] = await db.query(`SELECT SUM(lending_amount) AS thisYearLendings 
                                                FROM lendings 
                                                WHERE YEAR(lending_date) = YEAR(CURDATE())`);

        res.json({
            expenses: expenses[0],
            lendings: lendings[0],
            totalYearTransactions: totalYearExpenses[0].thisYearTransactions + totalYearLendings[0].thisYearLendings,
            monthlyTransactions: expenses[0].totalExpenses + lendings[0].totalLendings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
