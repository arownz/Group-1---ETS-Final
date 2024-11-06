const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/dashboard-summary', auth, async (req, res) => {
    try {

        const [totalExpenses] = await db.query(`
            SELECT COUNT(*) AS totalNumberOfExpenses 
            FROM expenses`
          );
          
          const [totalLendings] = await db.query(`
            SELECT COUNT(*) AS totalNumberOfLendings 
            FROM lendings`
          );

        // Query for "This Month" expenses and lendings summaries
        const [thisMonthExpenses] = await db.query(`
            SELECT SUM(expense_cost) AS totalExpenses, 
                   COUNT(*) AS totalNumberOfExpenses 
            FROM expenses 
            WHERE MONTH(expense_date) = MONTH(CURDATE()) 
            AND YEAR(expense_date) = YEAR(CURDATE())`
        );

        const [thisMonthLendings] = await db.query(`
            SELECT SUM(lending_amount) AS totalLendings, 
                   COUNT(*) AS totalNumberOfLendings 
            FROM lendings 
            WHERE MONTH(lending_date) = MONTH(CURDATE()) 
            AND YEAR(lending_date) = YEAR(CURDATE())`
        );

        // Query for "This Year" expenses and lendings summaries
        const [thisYearExpenses] = await db.query(`
            SELECT SUM(expense_cost) AS thisYearExpenses, 
                   COUNT(*) AS totalNumberOfExpenses 
            FROM expenses 
            WHERE YEAR(expense_date) = YEAR(CURDATE())`
        );

        const [thisYearLendings] = await db.query(`
            SELECT SUM(lending_amount) AS thisYearLendings, 
                   COUNT(*) AS totalNumberOfLendings 
            FROM lendings 
            WHERE YEAR(lending_date) = YEAR(CURDATE())`
        );

        // Combine monthly data for expenses and lendings
        const monthlyTransactionsData = Array(12).fill(0); // Initialize an array for 12 months

        // Query for monthly expenses per month in the current year
        const [monthlyExpenses] = await db.query(`
            SELECT MONTH(expense_date) AS month, 
                   SUM(expense_cost) AS totalExpenseCost 
            FROM expenses 
            WHERE YEAR(expense_date) = YEAR(CURDATE()) 
            GROUP BY MONTH(expense_date)
            ORDER BY month`
        );

        // Query for monthly lendings per month in the current year
        const [monthlyLendings] = await db.query(`
            SELECT MONTH(lending_date) AS month, 
                   SUM(lending_amount) AS totalLendingAmount 
            FROM lendings 
            WHERE YEAR(lending_date) = YEAR(CURDATE()) 
            GROUP BY MONTH(lending_date)
            ORDER BY month`
        );

        const [categories] = await db.query(`
            SELECT e.category_id, c.category_name 
            FROM expenses e
            LEFT JOIN categories c ON e.category_id = c.id
            GROUP BY e.category_id, c.category_name
          `);
          
          const categoryExpenses = await Promise.all(categories.map(async (category) => {
            const [expenses] = await db.query(`
              SELECT SUM(expense_cost) AS totalExpenses 
              FROM expenses 
              WHERE category_id = ?
            `, [category.category_id]);
            return {
              label: category.category_name,
              data: expenses[0].totalExpenses || 0,
            };
          }));

        // Populate monthly data array
        monthlyExpenses.forEach(expense => {
            const monthIndex = expense.month - 1; // Zero-based index
            monthlyTransactionsData[monthIndex] += Number(expense.totalExpenseCost) || 0;
        });

        monthlyLendings.forEach(lending => {
            const monthIndex = lending.month - 1; // Zero-based index
            monthlyTransactionsData[monthIndex] += Number(lending.totalLendingAmount) || 0;
        });

        // Calculate the total for the entire year by adding yearly expenses and lendings
        const totalYearTransactions =
            (Number(thisYearExpenses[0]?.thisYearExpenses) || 0) +
            (Number(thisYearLendings[0]?.thisYearLendings) || 0);

        // Calculate the total for this month by adding monthly expenses and lendings
        const monthlyTransactions =
            (Number(thisMonthExpenses[0]?.totalExpenses) || 0) +
            (Number(thisMonthLendings[0]?.totalLendings) || 0);

        // Response object
        res.json({
            thisMonth: {
              totalExpenses: Number(thisMonthExpenses[0]?.totalExpenses) || 0,
              totalNumberOfExpenses: Number(thisMonthExpenses[0]?.totalNumberOfExpenses) || 0,
              totalLendings: Number(thisMonthLendings[0]?.totalLendings) || 0,
              totalNumberOfLendings: Number(thisMonthLendings[0]?.totalNumberOfLendings) || 0,
            },
            thisYear: {
              totalExpenses: Number(thisYearExpenses[0]?.thisYearExpenses) || 0,
              totalNumberOfExpenses: Number(thisYearExpenses[0]?.totalNumberOfExpenses) || 0,
              totalLendings: Number(thisYearLendings[0]?.thisYearLendings) || 0,
              totalNumberOfLendings: Number(thisYearLendings[0]?.totalNumberOfLendings) || 0,
            },
            totalNumberOfExpenses: Number(totalExpenses[0]?.totalNumberOfExpenses) || 0,
            totalNumberOfLendings: Number(totalLendings[0]?.totalNumberOfLendings) || 0,
            totalYearTransactions,
            monthlyTransactions,
            monthlyTransactionsData,
            categoryExpenses
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});

module.exports = router;
