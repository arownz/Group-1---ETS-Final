import { useState, useEffect } from 'react';
import styles from './ManageExpense.module.css';
import api from '../../../api/api'; // Make sure this path is correct

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState([]);
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
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  // Fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
      setFilteredExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get('/expenses/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = [...expenses];

    if (filters.category !== '') {
      result = result.filter(expense => expense.category_id === parseInt(filters.category));
    }

    if (filters.costOrder) {
      result.sort((a, b) => filters.costOrder === 'asc' ? a.expense_cost - b.expense_cost : b.expense_cost - a.expense_cost);
    }

    if (filters.dateOrder) {
      result.sort((a, b) => filters.dateOrder === 'asc' ? new Date(a.expense_date) - new Date(b.expense_date) : new Date(b.expense_date) - new Date(a.expense_date));
    }

    if (filters.registeredDateOrder) {
      result.sort((a, b) => filters.registeredDateOrder === 'asc' ? new Date(a.expense_registered_date) - new Date(b.expense_registered_date) : new Date(b.expense_registered_date) - new Date(a.expense_registered_date));
    }

    setFilteredExpenses(result);
    setCurrentPage(1);
  }, [filters, expenses]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value === '' ? '' : value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      costOrder: '',
      dateOrder: '',
      registeredDateOrder: '',
    });
  };

  const handleEditClick = (expense) => {
    const date = new Date(expense.expense_date).toISOString().split('T')[0]; setSelectedExpense({
      id: expense.id,
      title: expense.expense_title,
      date,
      category_id: expense.category_id,
      cost: expense.expense_cost,
      description: expense.expense_description,
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };

  const handleEdit = async (updatedExpense) => {
    try {
      const response = await api.put(`/expenses/${updatedExpense.id}`, {
        expense_title: updatedExpense.title,
        expense_date: updatedExpense.date,
        category_id: updatedExpense.category_id,
        expense_cost: updatedExpense.cost,
        expense_description: updatedExpense.description,
      });
      setExpenses(expenses.map(e => e.id === updatedExpense.id ? response.data : e));
      setFilteredExpenses(filteredExpenses.map(e => e.id === updatedExpense.id ? response.data : e));
      //setFilteredExpenses([...expenses]); // Add this line to update the filteredExpenses state
      setEditConfirmationMessage('Expense updated successfully!');
      setTimeout(() => {
        setEditConfirmationMessage('');
        setShowEditModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating expense:', error);
      setEditConfirmationMessage('Failed to update expense. Please try again.');
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await api.delete(`/expenses/${expenseId}`);
      setExpenses(expenses.filter(e => e.id !== expenseId));
      setFilteredExpenses(filteredExpenses.filter(e => e.id !== expenseId));
      //setFilteredExpenses([...expenses]); // Add this line to update the filteredExpenses state
      setDeleteConfirmationMessage('Expense deleted successfully!');
      setTimeout(() => {
        setDeleteConfirmationMessage('');
        setShowDeleteModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error deleting expense:', error);
      setDeleteConfirmationMessage('Failed to delete expense. Please try again.');
    }
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExpenses.slice(startIndex, endIndex);
  };

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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
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
            {/* <th>Expense ID</th> */}
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
              {/* <td>{expense.id}</td> */}
              <td>{expense.expense_title}</td>
              <td>{expense.category_name}</td>
              <td>{expense.expense_cost}</td>
              <td>{new Date(expense.expense_date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              <td>{expense.expense_description}</td>
              <td>{new Date(expense.expense_registered_date).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownToggle}>
                    Action
                  </button>
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEditClick(expense)}>Edit</button>
                    <button onClick={() => handleDeleteClick(expense)}>Delete</button>
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
      {showEditModal && selectedExpense && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Edit Expense</h4>

            <form className={styles.expenseForm}>
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
                  value={selectedExpense.category_id}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, category_id: e.target.value })}
                >
                  <option value="">Choose Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
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
                <button type="button" className={styles.addCategoryModalBtn} onClick={() => {
                  handleEdit(selectedExpense);
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
                      const response = await api.post('/expenses/categories', { category_name: newCategory });
                      setCategories([...categories, { id: response.data.categoryId, category_name: newCategory }]);
                      setNewCategory('');
                      setShowAddCategory(false);
                      setConfirmationMessage('Category added successfully!');
                      setTimeout(() => setConfirmationMessage(''), 2000);
                    } catch (error) {
                      console.error('Error adding category:', error);
                      setConfirmationMessage('Failed to add category. Please try again.');
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
      {showDeleteModal && selectedExpense && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Are you sure you want to delete this expense?</h4>

            {/* In the Delete Confirmation Modal */}
            <div className={styles.modalButtons}>
              <button className={styles.addBtn} onClick={() => {
                handleDelete(selectedExpense.id);

                // Remove the deleted expense from the expenses array
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

    </div>
  );
};

export default ManageExpenses;