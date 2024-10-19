
const ExpenseSummary = ({ stats }) => {
    return (
      <div className="expense-summary">
        <div className="stat-card card">
          <h4>This Week Expenses</h4>
          <p>₱{stats.thisWeekExpense}</p>
        </div>
        <div className="stat-card card">
          <h4>This Month Expenses</h4>
          <p>₱{stats.thisMonthExpense}</p>
        </div>
        <div className="stat-card card">
          <h4>Number of Expenses</h4>
          <p>{stats.numberOfExpenses}</p>
        </div>
        <div className="stat-card card">
          <h4>Total Expenses</h4>
          <p>₱{stats.totalExpense}</p>
        </div>
      </div>
    );
  };
  
  export default ExpenseSummary;
  