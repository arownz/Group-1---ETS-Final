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
  const [expenseStats, setExpenseStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/dashboard/dashboard-summary'); // Use the API endpoint
        setExpenseStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  if (!expenseStats) return <p>Loading...</p>;

  // Prepare data for bar and pie charts based on fetched data (replace sample data)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Transactions',
        data: [500, 400, 600, 700, 300, 200, 400, 500, 450, 650, 500, 300], // Sample data to be replaced with fetched data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieChartData = {
    labels: ['Grocery', 'Entertainment', 'Bills', 'Games', 'Rent'],
    datasets: [
      {
        label: 'Expense Category',
        data: [200, 150, 100, 50, 20], // Sample data to be replaced with fetched data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
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
        <CategoryExpenseChart data={pieChartData} />
        <button className="floating-add-btn">
          <Link to="/expensewize/ExpenseWizeAI">+</Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;