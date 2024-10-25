import { useState } from 'react';
import styles from './Expense.module.css';

const Expense = () => {
  const [categories, setCategories] = useState(['Grocery', 'Entertainment', 'Bills', 'Games', 'Rent']);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryConfirmation, setCategoryConfirmation] = useState('');
  const [expenseConfirmation, setExpenseConfirmation] = useState('');
  const [expenseData, setExpenseData] = useState({
    title: '',
    date: '',
    category: '',
    cost: '',
    description: ''
  });

  const addCategory = () => {
    if (newCategory) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowAddCategory(false);
      setCategoryConfirmation('Category added successfully!');
      setTimeout(() => setCategoryConfirmation(''), 2000);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to save expense data
    console.log('Expense data submitted:', expenseData);
    setExpenseConfirmation('Expense added successfully!');
    
    // Clear the form
    setExpenseData({
      title: '',
      date: '',
      category: '',
      cost: '',
      description: ''
    });

    // Clear confirmation message after 3 seconds
    setTimeout(() => setExpenseConfirmation(''), 3000);
  };

  return (
    <div className={styles.expenseContainer}>
      <h2>Add Expense</h2>

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
            name="category"
            value={expenseData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
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