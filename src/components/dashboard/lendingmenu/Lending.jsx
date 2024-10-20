import { useState } from 'react';
import styles from './Lending.module.css';

const Lending = () => {
  const [lendingData, setLendingData] = useState({
    title: '',
    name: '',
    date: '',
    amount: '',
    description: '',
    status: ''
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLendingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to save lending data
    console.log('Lending data submitted:', lendingData);
    setConfirmationMessage('Lending record added successfully!');

    // Clear the form
    setLendingData({
      title: '',
      name: '',
      date: '',
      amount: '',
      description: '',
      status: ''
    });

    // Clear confirmation message after 3 seconds
    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  return (
    <div className={styles.lendingContainer}>
      <h2>Add Lending Record</h2>

      <form onSubmit={handleSubmit} className={styles.lendingForm}>
        <div className={styles.formGroup}>
          <label>Title of Lending</label>
          <input
            type="text"
            name="title"
            value={lendingData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Name of Lender</label>
          <input
            type="text"
            name="name"
            value={lendingData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Lending</label>
          <input
            type="date"
            name="date"
            value={lendingData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Deadline</label>
          <input
            type="date"
            name="dateOfDeadline"
            value={lendingData.dateOfDeadline}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={lendingData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={lendingData.description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="status"
            value={lendingData.status}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose Status</option>
            <option value="pending">Pending</option>
            <option value="received">Received</option>
          </select>
        </div>

        {confirmationMessage && (
          <div className={styles.confirmationMessage}>
            {confirmationMessage}
          </div>
        )}

        <button type="submit" className={styles.addLendingBtn}>Add Lending Record</button>
      </form>
    </div>
  );
};

export default Lending;