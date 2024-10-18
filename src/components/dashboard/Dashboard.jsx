import './Dashboard.css'; // Custom styles
import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import { Outlet } from 'react-router-dom'; // Import Outlet for nested routes


const Dashboard = () => {
  const [navVisible, setNavVisible] = useState(true); // Toggle state for nav

  // Toggle function for left nav

  // Dummy data for expense stats
  const expenseStats = {
    todayExpense: 270,
    yesterdayExpense: 250,
    numberOfExpenses: 2,
    totalExpense: 520
  };

  // Bar chart data (for monthly expenses)
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: [500, 400, 600, 700, 300, 200, 400, 500, 450, 650, 500, 300], // Sample data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  // Pie chart data (for category-wise expenses)
  const pieChartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'],
    datasets: [
      {
        label: 'Expense Category',
        data: [200, 150, 100, 50, 20], // Sample data
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

        {/* Main Dashboard Content */}
        <div className="allmenu-content-inner">

          {/* Key Expense Stats */}
          <div className="expense-summary">
            <div className="stat-card card">
              <h4>Today’s Expense</h4>
              <p>₱{expenseStats.todayExpense}</p>
            </div>
            <div className="stat-card card">
              <h4>Yesterday’s Expense</h4>
              <p>₱{expenseStats.yesterdayExpense}</p>
            </div>
            <div className="stat-card card">
              <h4>Number of Expenses</h4>
              <p>{expenseStats.numberOfExpenses}</p>
            </div>
            <div className="stat-card card">
              <h4>Total Expense</h4>
              <p>₱{expenseStats.totalExpense}</p>
            </div>
          </div>

          {/* Monthly Expense Chart */}
          <div className="chart-section card">
            <h3>Monthly Expense Chart</h3>
            <div className="chart-container">
              <Bar
                data={barChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="chart-section card">
            <h3>Expense Category Breakdown</h3>
            <div className="chart-container">
              <Pie
                data={pieChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </div>
          {/* Child routes will be rendered here */}
          <Outlet />

          <button className="floating-add-btn">
            <Link to="/expensemenu/Expense">+</Link>
          </button>
        </div>
      </div>
  );
};

export default Dashboard;
