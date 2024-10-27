import { useState, useEffect } from 'react';
import styles from './Expense.module.css';


const Expense = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryConfirmation, setCategoryConfirmation] = useState('');
  const [expenseConfirmation, setExpenseConfirmation] = useState('');
  const [expenseData, setExpenseData] = useState({
    title: '',
    date: '',
    category_id: '',
    cost: '',
    description: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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
  const addCategory = async () => {
    if (newCategory) {
      try {
        const response = await fetch('/api/expenses/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ category_name: newCategory })
        });
        if (response.ok) {
          await fetchCategories();
          setNewCategory('');
          setShowAddCategory(false);
          setCategoryConfirmation('Category added successfully!');
          setTimeout(() => setCategoryConfirmation(''), 2000);
        } else {
          console.error('Failed to add category');
        }
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(expenseData)
      });
      if (response.ok) {
        setExpenseConfirmation('Expense added successfully!');
        setExpenseData({
          title: '',
          date: '',
          category_id: '',
          cost: '',
          description: ''
        });
        setTimeout(() => setExpenseConfirmation(''), 3000);
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className={styles.expenseContainer}>
      <h2>Add Expense Record</h2>

      <form onSubmit={handleSubmit} className={styles.expenseForm}>
        <div className={styles.formGroup}>
          <label>Title of Expense</label>
          <input
            type="text"
            name="title"
            value={expenseData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Expense</label>
          <input
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category_id"
            value={expenseData.category_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.category_name}</option>
            ))}
          </select>

          {categoryConfirmation && (
            <div className={styles.categoryConfirmation}>
              {categoryConfirmation}
            </div>
          )}
          <button type="button" onClick={() => setShowAddCategory(true)} className={styles.addCategoryBtn}>
            + Add Category
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Cost of Item</label>
          <input
            type="number"
            name="cost"
            value={expenseData.cost}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={expenseData.description}
            onChange={handleInputChange}
          />
        </div>

        {expenseConfirmation && (
          <div className={styles.expenseConfirmation}>
            {expenseConfirmation}
          </div>
        )}
        <button type="submit" className={styles.addExpenseBtn}>Add Expense Record</button>
      </form>

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
    </div>
  );
};

export default Expense;