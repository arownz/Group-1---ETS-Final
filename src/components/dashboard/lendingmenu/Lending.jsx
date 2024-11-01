// src/components/dashboard/lendingmenu/Lending.jsx
import { useState } from 'react';
import styles from './Lending.module.css';
import axios from 'axios';

const Lending = () => {
  const [lendingData, setLendingData] = useState({
    lending_title: '',
    lending_borrower_name: '',
    lending_date: '',
    lending_payback_date: '',
    lending_amount: '',
    lending_description: '',
    lending_status: ''
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
    axios.post('/api/lending/create', lendingData)
      .then(response => {
        console.log(response.data);
        setConfirmationMessage('Lending record added successfully!');
        setLendingData({
          lending_title: '',
          lending_borrower_name: '',
          lending_date: '',
          lending_payback_date: '',
          lending_amount: '',
          lending_description: '',
          lending_status: ''
        });
      })
      .catch(error => {
        console.error(error);
      });

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
            name="lending_title"
            value={lendingData.lending_title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Name of Borrower</label>
          <input
            type="text"
            name="lending_borrower_name"
            value={lendingData.lending_borrower_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Lending</label>
          <input
            type="date"
            name="lending_date"
            value={lendingData.lending_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Date of Pay Back</label>
          <input
            type="date"
            name="lending_payback_date"
            value={lendingData.lending_payback_date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Amount</label>
          <input
            type="number"
            name="lending_amount"
            value={lendingData.lending_amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="lending_description"
            value={lendingData.lending_description}
            onChange={handleInputChange}
            rows="4"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="lending_status"
            value={lendingData.lending_status}
            onChange={handleInputChange}
            required
          >
            <option value="">Choose Status</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
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