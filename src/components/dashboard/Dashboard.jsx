import './Dashboard.css'; // Custom styles
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import ExpenseSummary from './datafetcher/ExpenseSummary';
import MonthlyExpenseChart from './datafetcher/MonthlyExpenseChart';
import CategoryExpenseChart from './datafetcher/CategoryExpenseChart';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {

  // Dummy data for expense stats
  const expenseStats = {
    thisWeekExpense: 270,
    thisMonthExpense: 250,
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
    labels: ['Grocery', 'Entertainment', 'Bills', 'Games', 'Rent'],
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
<h2>User Dashboard</h2>
      <div className="allmenu-content-inner">

        <ExpenseSummary stats={expenseStats} />

        <MonthlyExpenseChart data={barChartData} />

        <CategoryExpenseChart data={pieChartData} />

        <button className="floating-add-btn">
          <Link to="/expensemenu/Expense">+</Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard; 