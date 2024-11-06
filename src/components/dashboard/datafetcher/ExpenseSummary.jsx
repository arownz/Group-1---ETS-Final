const ExpenseSummary = ({ stats }) => {
  return (
    <div className="expense-summary">
      <div className="stat-card card">
        <h4>Total Number of Expenses</h4>
        <p>{stats.totalNumberOfExpenses || 0}</p>
      </div>
      <div className="stat-card card">
        <h4>Total Number of Lendings</h4>
        <p>{stats.totalNumberOfLendings || 0}</p>
      </div>
      <div className="stat-card card">
        <h4>This Month Transactions</h4>
        <p>₱{stats.monthlyTransactions || 0}</p>
      </div>
      <div className="stat-card card">
        <h4>This Year Transactions</h4>
        <p>₱{stats.totalYearTransactions || 0}</p>
      </div>
      <div className="stat-card card">
        <h4>Total Tracker</h4>
        <p>₱{(stats.monthlyTransactions || 0) + (stats.totalYearTransactions || 0)}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
