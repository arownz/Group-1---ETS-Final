import './Dashboard.css'; // Custom styles
import { useState } from 'react';
import Header from './header/Header'; // Header component
import LeftNav from './leftnav/LeftNav'; // Left Navigation component
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {

  const [navVisible, setNavVisible] = useState(true); // Toggle state for nav

  // Toggle function for left nav
  const toggleNav = () => setNavVisible(!navVisible);

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
    <div className="dashboard-container">
      {/* Pass toggleNav and navVisible state to Header and LeftNav */}
      <Header title="Dashboard" toggleNav={toggleNav} />
      <LeftNav isVisible={navVisible} />

      <div className={`dashboard-content ${navVisible ? 'nav-visible' : ''}`}>

        {/* Main Dashboard Content */}
        <div className="dashboard-content">
          {/* Key Expense Stats */}
          <div className="expense-summary card">
            <div className="stat-card">
              <h4>Today’s Expense</h4>
              <p>₱{expenseStats.todayExpense}</p>
            </div>
            <div className="stat-card">
              <h4>Yesterday’s Expense</h4>
              <p>₱{expenseStats.yesterdayExpense}</p>
            </div>
            <div className="stat-card">
              <h4>Number of Expenses</h4>
              <p>{expenseStats.numberOfExpenses}</p>
            </div>
            <div className="stat-card">
              <h4>Total Expense</h4>
              <p>₱{expenseStats.totalExpense}</p>
            </div>
          </div>

          {/* Monthly Expense Chart */}
          <div className="chart-section card">
            <h3>Monthly Expense Chart</h3>
            <Bar
              data={barChartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                height: 300 // Add this line
              }}  
            />
          </div>

          {/* Category Pie Chart */}
          <div className="chart-section card">
            <h3>Expense Category Breakdown</h3>
            <Pie
              data={pieChartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                height: 300 // Add this line
              }}
            />
          </div>

          {/* Floating Button */}
          <button className="floating-add-btn" onClick={() => window.location.href = '/expense'}>
            +
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
