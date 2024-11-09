import './Dashboard.css'; // Custom styles
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import ExpenseSummary from './datafetcher/ExpenseSummary';
import MonthlyTransactionsChart from './datafetcher/MonthlyTransactionsChart';
import CategoryExpenseChart from './datafetcher/CategoryExpenseChart';
import api from '../../../src/api/api'; // filepath - /src/api/api.js
import { useState, useEffect } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [expenseStats, setExpenseStats] = useState({
    thisMonth: { totalNumberOfExpenses: 0, totalExpenses: 0, totalNumberOfLendings: 0, totalLendings: 0 },
    thisYear: { totalNumberOfExpenses: 0, totalExpenses: 0, totalNumberOfLendings: 0, totalLendings: 0 },
    totalYearTransactions: 0,
    monthlyTransactions: 0,
    monthlyTransactionsData: Array(12).fill(0),
  });
  const [monthlyData, setMonthlyData] = useState(Array(12).fill(0)); // Array for monthly transaction data
  const [categoryData, setCategoryData] = useState([]); // Add this line


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await api.get('/dashboard/dashboard-summary', {
          params: {
            user_id: userId
          }
        });
        console.log("Fetched expenseStats:", response.data);  // Debug log
        setExpenseStats(response.data);  // Set the data as-is
        setMonthlyData(response.data.monthlyTransactionsData);
        setCategoryData(response.data.categoryExpenses); // Add this line
        console.log("Fetched monthlyData:", response.data.monthlyTransactionsData);  // Debug log
        console.log("Fetched categoryData:", response.data.categoryExpenses);  // Debug log
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!expenseStats) return <p>Loading...</p>;

  // Prepare data for the bar chart
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Transactions',
        data: monthlyData, // Use monthlyData state here
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="allmenu-container">
      <h2>User Dashboard</h2>
      <div className="allmenu-content-inner">
        <ExpenseSummary stats={expenseStats} />
        <MonthlyTransactionsChart data={barChartData} />
        {categoryData.length > 0 && (
          <CategoryExpenseChart data={{
            labels: categoryData.map(category => category.label),
            datasets: [
              {
                label: 'Expense Category',
                data: categoryData.map(category => category.data),
                backgroundColor: [ // custom colors
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(170, 130, 234, 0.6)',
                  'rgba(134, 163, 213, 0.6)',
                  'rgba(134, 104, 21, 0.6)',
                  'rgba(123, 49, 50, 0.6)',
                  'rgba(432, 31, 51, 0.6)',
                  'rgba(102, 512, 12, 0.6)',
                  'rgba(123, 123, 123, 0.6)',
                  'rgba(251, 61, 12, 0.6)',
                  'rgba(231, 75, 23, 0.6)'
                ],
                borderWidth: 1
              }
            ]
          }} />
        )}
        <button className="floating-add-btn">
          <Link to="/expensewize/ExpenseWizeAI">+</Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
