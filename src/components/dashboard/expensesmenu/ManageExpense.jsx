import { useState, useEffect } from 'react';
import styles from './ManageExpense.module.css';

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteExpenseId, setDeleteExpenseId] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [editConfirmationMessage, setEditConfirmationMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    costOrder: '',
    dateOrder: '',
    registeredDateOrder: ''
  });

  const itemsPerPage = 10;

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [expenses, filters]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
        setFilteredExpenses(data);
      } else {
        console.error('Failed to fetch expenses');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/expenses/categories', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const applyFilters = () => {
    let result = [...expenses];

    if (filters.category) {
      result = result.filter(expense => expense.category === filters.category);
    }

    if (filters.costOrder) {
      result.sort((a, b) => filters.costOrder === 'asc' ? a.cost - b.cost : b.cost - a.cost);
    }

    if (filters.dateOrder) {
      result.sort((a, b) => filters.dateOrder === 'asc' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
    }

    if (filters.registeredDateOrder) {
      result.sort((a, b) => filters.registeredDateOrder === 'asc' ? new Date(a.registeredDate) - new Date(b.registeredDate) : new Date(b.registeredDate) - new Date(a.registeredDate));
    }

    setFilteredExpenses(result);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      costOrder: '',
      dateOrder: '',
      registeredDateOrder: ''
    });
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setShowEditModal(true);
  };

  const handleDelete = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  //connected to delete modal
  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/expenses/${selectedExpense.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        setExpenses(expenses.filter(expense => expense.id !== selectedExpense.id));
        setDeleteConfirmationMessage('Expense deleted successfully!');
        setTimeout(() => {
          setDeleteConfirmationMessage('');
          setShowDeleteModal(false);
        }, 2000);
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/expenses/${selectedExpense.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(selectedExpense)
      });
      if (response.ok) {
        setExpenses(expenses.map(expense =>
          expense.id === selectedExpense.id ? selectedExpense : expense
        ));
        setEditConfirmationMessage('Expense updated successfully!');
        setTimeout(() => {
          setEditConfirmationMessage('');
          setShowEditModal(false);
        }, 2000);
      } else {
        console.error('Failed to update expense');
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  //connected to edit modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedExpense({ ...selectedExpense, [name]: value });
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExpenses.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.manageExpenseWrapper}>
      <h2>Manage Expense</h2>

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {/* Add default categories and fetch new categories from backend */}
            {/* Backend TODO: Fetch categories from database */}
            <option value="Grocery">Grocery</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Games">Games</option>
            <option value="Rent">Rent</option>
          </select>

          <select
            value={filters.costOrder}
            onChange={(e) => handleFilterChange('costOrder', e.target.value)}
          >
            <option value="">Sort by Cost</option>
            <option value="asc">Cost (Low to High)</option>
            <option value="desc">Cost (High to Low)</option>
          </select>

          <select
            value={filters.dateOrder}
            onChange={(e) => handleFilterChange('dateOrder', e.target.value)}
          >
            <option value="">Sort by Expense Date</option>
            <option value="desc">Date (Newest First)</option>
            <option value="asc">Date (Oldest First)</option>
          </select>

          <select
            value={filters.registeredDateOrder}
            onChange={(e) => handleFilterChange('registeredDateOrder', e.target.value)}
          >
            <option value="">Sort by Registered Date</option>
            <option value="desc">Registered Date (Newest First)</option>
            <option value="asc">Registered Date (Oldest First)</option>
          </select>
        </div>

        <button onClick={resetFilters} className={styles.resetBtn}>Reset Filters</button>
      </div>

      <table className={styles.expenseTable}>
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Expense Title</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Expense Date</th>
            <th>Description</th>
            <th>Expense Registered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.title}</td>
              <td>{expense.category}</td>
              <td>{expense.cost}</td>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.registeredDate}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownToggle}>
                    Action
                  </button>
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEdit(expense)}>Edit</button>
                    <button onClick={() => handleDelete(expense)}>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
          </button>
        )}
        {getPageNumbers().map(number => (
          <button
            key={number}
            className={`${styles.pageBtn} ${currentPage === number ? styles.active : ''}`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className={styles.pageBtn} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Edit Expense</h4>
            <form className={styles.expenseForm} onSubmit={handleEditSubmit}>
              <div className={styles.formGroup}>
                <label>Title of Expense</label>
                <input
                  type="text"
                  value={selectedExpense.title}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, title: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Expense</label>
                <input
                  type="date"
                  value={selectedExpense.date}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={selectedExpense.category}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, category: e.target.value })}
                >
                  <option value="">Choose Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setShowAddCategory(true)} className={styles.addCategoryBtn}>
                  + Add Category
                </button>
                {/* Confirmation message */}
                {confirmationMessage && (
                  <div className={styles.confirmationMessage}>
                    {confirmationMessage}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label>Cost of Item</label>
                <input
                  type="number"
                  value={selectedExpense.cost}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, cost: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={selectedExpense.description}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
                  rows="4"
                />
              </div>

              <div className={styles.modalButtons}>
                <button type="submit" className={styles.addCategoryModalBtn} onClick={() => {
                  // Update the expense in the expenses array
                  setExpenses(expenses.map(e => e.id === selectedExpense.id ? selectedExpense : e));
                  setEditConfirmationMessage('Expense updated successfully!');

                  // Remove confirmation message after 2 seconds
                  setTimeout(() => {
                    setEditConfirmationMessage('');
                    setShowEditModal(false);
                  }, 2000);
                }}>Save</button>
                <button type="button" className={styles.closeModalBtn} onClick={() => setShowEditModal(false)}>Cancel</button>
              </div>
              {editConfirmationMessage && (
                <div className={styles.confirmationMessage}>
                  {editConfirmationMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Add New Category</h4>
            <div className={styles.formGroup}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category Name"
              />
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.addCategoryModalBtn}
                onClick={async () => {
                  if (newCategory) {
                    try {
                      const response = await fetch('/api/expenses/categories', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ category: newCategory })
                      });
                      if (response.ok) {
                        setCategories([...categories, newCategory]);
                        setNewCategory('');
                        setShowAddCategory(false);
                        setConfirmationMessage('Category added successfully!');
                        setTimeout(() => setConfirmationMessage(''), 2000);
                      } else {
                        console.error('Failed to add category');
                      }
                    } catch (error) {
                      console.error('Error adding category:', error);
                    }
                  }
                }}
              >
                Add
              </button>
              <button
                className={styles.closeModalBtn}
                onClick={() => setShowAddCategory(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Are you sure you want to delete this expense?</h4>

            {/* In the Delete Confirmation Modal */}
            <div className={styles.modalButtons}>
              <button className={styles.addBtn} onClick={() => {
                setExpenses(expenses.filter(e => e.id !== selectedExpense.id));
                setDeleteConfirmationMessage('Expense deleted successfully!');

                // Remove confirmation message after 3 seconds
                setTimeout(() => {
                  setDeleteConfirmationMessage('');
                  setShowDeleteModal(false);
                }, 2000);
              }}>Yes</button>
              <button className={styles.closeBtn} onClick={() => setShowDeleteModal(false)}>No</button>
            </div>
            {deleteConfirmationMessage && (
              <div className={styles.confirmationMessage}>
                {deleteConfirmationMessage}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global confirmation message */}
      {confirmationMessage && (
        <div className={styles.globalConfirmation}>
          {confirmationMessage}
        </div>
      )}

    </div>
  );
};

export default ManageExpenses;