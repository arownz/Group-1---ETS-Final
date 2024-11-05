const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const lendingRoutes = require('./routes/lendingRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();

const app = express();
app.use(cors());

// Middleware
// Increase the limit of profile image here
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Use routes here
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/lendings', lendingRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});