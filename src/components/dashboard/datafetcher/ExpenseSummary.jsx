const ExpenseSummary = ({ stats }) => {
  return (
    <div className="expense-summary">
      <div className="stat-card card">
        <h4>Total Number of Expenses</h4>
        <p>{stats.totalNumberOfExpenses}</p>
      </div>
      <div className="stat-card card">
        <h4>Total Number of Lendings</h4>
        <p>{stats.totalNumberOfLendings}</p>
      </div>
      <div className="stat-card card">
        <h4>This Month Transactions</h4>
        <p>₱{stats.monthlyTransactions}</p>
      </div>
      <div className="stat-card card">
        <h4>This Year Transactions</h4>
        <p>₱{stats.totalYearTransactions}</p>
      </div>
      <div className="stat-card card">
        <h4>Total Tracker</h4>
        <p>₱{stats.totalTracker}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
