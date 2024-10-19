import React, { useState } from 'react';
import styles from './Expense.module.css'; // CSS Module

const Expense = () => {
  const [categories, setCategories] = useState(['Grocery', 'Entertainment', 'Bills', 'Games', 'Rent']);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowAddCategory(false);
      setConfirmationMessage('Category added successfully!');
      
      // Remove confirmation message after 3 seconds
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  return (
    <div className={styles.expenseContainer}>
      <h2>Add Expense</h2>

      <form className={styles.expenseForm}>
        <div className={styles.formGroup}>
          <label>Date of Expense</label>
          <input type="date" name="expenseDate" required />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select name="category">
            <option value="">Choose Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button type="button" onClick={() => setShowAddCategory(true)} className={styles.addCategoryBtn}>
            + Add Category
          </button>
        </div>

        {/* Confirmation message */}
        {confirmationMessage && (
          <div className={styles.confirmationMessage}>
            {confirmationMessage}
          </div>
        )}

        {showAddCategory && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h4>Add New Category</h4>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New Category Name"
              />
              <div className={styles.modalButtons}>
                <button className={styles.addCategoryModalBtn} onClick={addCategory}>Add</button>
                <button className={styles.closeModalBtn} onClick={() => setShowAddCategory(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.formGroup}>
          <label>Cost of Item</label>
          <input type="number" name="cost" required />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea name="description" rows="4" />
        </div>

        <button type="submit" className={styles.addExpenseBtn}>Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;
