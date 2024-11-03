// src/components/Lending/Lending.jsx
import { useState } from 'react';
import styles from './Lending.module.css';
import api from '../../../api/api';

const Lending = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [lendingData, setLendingData] = useState({
    title: '',
    borrowername: '',
    lendingdate: '',
    paybackdate: '',
    amount: '',
    description: '',
    status: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLendingData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, borrowername, lendingdate, paybackdate, amount, description, status } = lendingData;

      // Validate expense cost
      if (amount <= 0) {
        setConfirmationMessage('Lending amount must be a positive number.');
        return;
      }

      // Add lending
      await api.post('/lendings', {
        lending_title: title,
        lending_borrower_name: borrowername,
        lending_date: lendingdate,
        lending_payback_date: paybackdate,
        lending_amount: parseFloat(amount),
        lending_description: description,
        lending_status: status
      });
      setConfirmationMessage('Lending added successfully!');
      setLendingData({
        title: '',
        borrowername: '',
        lendingdate: '',
        paybackdate: '',
        amount: '',
        description: '',
        status: 'Pending'
      });
      setTimeout(() => setConfirmationMessage(''), 3000);
    } catch (error) {
      console.error('Error adding lending:', error);
      setConfirmationMessage('Failed to add lending. Please try again.');
    }
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
          <label>Borrower&apos;s Name</label>
          <input
            type="text"
            name="borrowername"
            value={lendingData.borrowername}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Lending</label>
          <input
            type="date"
            name="lendingdate"
            value={lendingData.lendingdate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Payback Date</label>
          <input
            type="date"
            name="paybackdate"
            value={lendingData.paybackdate}
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
