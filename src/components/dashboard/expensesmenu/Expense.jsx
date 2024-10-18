import './Expense.css'; // You can create custom styles for Expense

const Expense = () => {
  return (
    <div className="expense-container">
      <h1>Expense Management</h1>
      <p>Here you can manage your expenses, add new transactions, and track your spending.</p>

      {/* Add buttons, forms, tables, or any other layout you'd like */}
      <button className="add-expense-btn">Add New Expense</button>
      
      <div className="expense-table">
        <h2>Your Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-10-18</td>
              <td>Food</td>
              <td>$50</td>
              <td><button>Edit</button> <button>Delete</button></td>
            </tr>
            {/* More rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expense;