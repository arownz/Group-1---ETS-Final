import { Pie } from 'react-chartjs-2';

const CategoryExpenseChart = ({ data }) => {
  return (
    <div className="chart-section card">
      <h3>Expense Category Breakdown</h3>
      <div className="chart-container">
        <Pie
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

export default CategoryExpenseChart;
