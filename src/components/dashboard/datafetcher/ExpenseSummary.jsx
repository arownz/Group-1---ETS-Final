
const ExpenseSummary = ({ stats }) => {
  return (
    <div className="expense-summary">
      <div className="stat-card card">
        <h4>Number of Expenses</h4>
        <p>{stats.numberOfExpenses}</p>
      </div>
      <div className="stat-card card">
        <h4>Number of Lendings</h4>
        <p>{stats.numberOfLendings}</p>
      </div>
      <div className="stat-card card">
        <h4>This Week Transactions</h4>
        <p>₱{stats.thisWeekTransactions}</p>
      </div>
      <div className="stat-card card">
        <h4>This Month Transactions</h4>
        <p>₱{stats.thisMonthTransactions}</p>
      </div>
      <div className="stat-card card">
        <h4>Total Tracker</h4>
        <p>₱{stats.totalTracker}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
