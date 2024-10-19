import { useState } from 'react';
import styles from './ManageExpenses.module.css'; // CSS Module

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Rent', category: 'Housing', cost: 20000, date: '2023-04-18', description: 'Monthly Rent', registeredDate: '2023-04-19' },
    { id: 2, title: 'Entertainment', category: 'Leisure', cost: 500, date: '2023-04-17', description: 'Movie tickets', registeredDate: '2023-04-18' },
    // Add more dummy data as needed...
  ]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Open Edit Modal
  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  // Open Delete Modal
  const handleDelete = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  return (
    <div className={styles.manageExpensesContainer}>
      <h2>Manage Expense</h2>

      <div className={styles.tableHeader}>
        <label>Show
          <select>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select> entries
        </label>
      </div>

      <table className={styles.expenseTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Expense Title</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Expense Date</th>
            <th>Description</th>
            <th>Registered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>{expense.cost}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.registeredDate}</td>
              <td>
                <button className={styles.actionBtn} onClick={() => handleEdit(expense)}>Edit</button>
                <button className={styles.actionBtn} onClick={() => handleDelete(expense)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button className={styles.pageBtn}>Previous</button>
        <button className={styles.pageBtn}>Next</button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Edit Expense</h4>
            <input
              type="text"
              value={selectedExpense.title}
              onChange={(e) => setSelectedExpense({ ...selectedExpense, title: e.target.value })}
              placeholder="Expense Title"
            />
            {/* Add more input fields as needed */}
            <div className={styles.modalButtons}>
              <button className={styles.addBtn} onClick={() => setShowEditModal(false)}>Save</button>
              <button className={styles.closeBtn} onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Are you sure you want to delete this expense?</h4>
            <div className={styles.modalButtons}>
              <button className={styles.addBtn} onClick={() => {
                setExpenses(expenses.filter(e => e.id !== selectedExpense.id));
                setShowDeleteModal(false);
              }}>Yes</button>
              <button className={styles.closeBtn} onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExpenses;
