import React, { useState } from 'react';
import './Expense.css'; // Include your custom CSS

const ManageExpense = () => {
  const [expenses, setExpenses] = useState([
    // Dummy data for now
    {
      id: 1,
      title: 'Grocery Shopping',
      category: 'Grocery',
      date: '2024-10-17',
      cost: 100,
      description: 'Weekly groceries',
      registered: '2024-10-17',
    },
  ]);
  const [editExpense, setEditExpense] = useState(null);
  const [deleteExpense, setDeleteExpense] = useState(null);

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
    // Logic to open edit popup
    alert(`Edit expense: ${expense.title}`);
  };

  const handleDeleteExpense = (expenseId) => {
    setDeleteExpense(expenseId);
    // Logic to open delete confirmation
    alert(`Delete expense with ID: ${expenseId}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Manage Expenses</h1>
      <table className="table table-striped table-hover">
        <thead className="thead-dark">
          <tr>
            <th>ID#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Cost</th>
            <th>Description</th>
            <th>Registered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>{exp.id}</td>
              <td>{exp.title}</td>
              <td>{exp.category}</td>
              <td>{exp.date}</td>
              <td>{exp.cost}</td>
              <td>{exp.description}</td>
              <td>{exp.registered}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEditExpense(exp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteExpense(exp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination and Filter components could go here */}
    </div>
  );
};

export default ManageExpense;
