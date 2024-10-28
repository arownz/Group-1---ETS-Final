import { Bar } from 'react-chartjs-2';

const MonthlyExpenseChart = ({ data }) => {
  return (
    <div className="chart-section card">
      <h3>Monthly Expense Chart</h3>
      <div className="chart-container">
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;