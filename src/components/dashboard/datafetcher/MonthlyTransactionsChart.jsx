import { Bar } from 'react-chartjs-2';

const MonthlyTransactionsChart = ({ data }) => {
  return (
    <div className="chart-section card">
      <h3>Monthly Transactions Chart</h3>
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

export default MonthlyTransactionsChart;