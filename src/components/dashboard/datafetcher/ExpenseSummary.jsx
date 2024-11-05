
const ExpenseSummary = ({ stats }) => {
  return (
    <div className="expense-summary">
      <div className="stat-card card">
        <h4>Number of Expenses</h4>
        <p>{stats.expenses.numberOfExpenses}</p>
      </div>
      <div className="stat-card card">
        <h4>Number of Lendings</h4>
        <p>{stats.lendings.numberOfLendings}</p>
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
        <p>₱{stats.monthlyTransactions + stats.totalYearTransactions}</p>
      </div>
    </div>
  );
};

export default ExpenseSummary;
