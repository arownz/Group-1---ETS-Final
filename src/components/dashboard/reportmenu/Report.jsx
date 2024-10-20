// src/components/dashboard/reportmenu/Report.jsx

import React, { useState, useEffect } from 'react';
import styles from './Report.module.css';

const Report = () => {
  const [reportType, setReportType] = useState('expense');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [showPrintableReport, setShowPrintableReport] = useState(false);

  // Dummy data for demonstration
  const expenseData = [
    { id: 1, title: 'Groceries', category: 'Food', expenseDate: '2024-10-25', description: 'Weekly groceries', registeredDate: '2024-10-24', amount: 150 },
    { id: 2, title: 'Electricity Bill', category: 'Utilities', expenseDate: '2024-11-01', description: 'Monthly bill', registeredDate: '2024-10-31', amount: 200 },
    // Add more dummy data as needed
  ];

  const lendingData = [
    { id: 1, title: 'Friend Loan', name: 'John Doe', dateLending: '2024-10-22', datePayBack: '2024-11-22', description: 'Emergency loan', status: 'Pending', registeredDate: '2024-10-21', amount: 500 },
    { id: 2, title: 'Business Loan', name: 'Jane Smith', dateLending: '2024-10-30', datePayBack: '2024-12-30', description: 'Startup funds', status: 'Received', registeredDate: '2024-10-29', amount: 1000 },
    // Add more dummy data as needed
  ];

  useEffect(() => {
    // In a real application, you would fetch data from your backend here
    if (reportType === 'expense') {
      setReportData(expenseData);
    } else {
      setReportData(lendingData);
    }
  }, [reportType]);

  const handleGenerateReport = () => {
    // Filter data based on date range
    const filteredData = reportData.filter(item => {
      const itemDate = new Date(reportType === 'expense' ? item.expenseDate : item.dateLending);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

    setReportData(filteredData);
    setShowPrintableReport(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.reportContainer}>
      <h2>Generate Report</h2>
      <div className={styles.reportForm}>
        <div className={styles.formGroup}>
          <label>Report Type:</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="expense">Expense Report</option>
            <option value="lending">Lending Report</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className={styles.generateBtn} onClick={handleGenerateReport}>Generate Printable Report</button>
      </div>

      {showPrintableReport && (
        <div className={styles.printableReport}>
          <h3>{reportType === 'expense' ? 'Expense' : 'Lending'}: Datewise Range Report from {startDate} to {endDate}</h3>
          <button className={styles.printBtn} onClick={handlePrint}>Print</button>
          <table className={styles.reportTable}>
            <thead>
              <tr>
                {reportType === 'expense' ? (
                  <>
                    <th>Expense ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Expense Date</th>
                    <th>Description</th>
                    <th>Registered Date</th>
                    <th>Amount</th>
                  </>
                ) : (
                  <>
                    <th>Lending ID</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Date of Lending</th>
                    <th>Date of Pay Back</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Registered Date</th>
                    <th>Amount</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.id}>
                  {reportType === 'expense' ? (
                    <>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.expenseDate}</td>
                      <td>{item.description}</td>
                      <td>{item.registeredDate}</td>
                      <td>{item.amount}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.name}</td>
                      <td>{item.dateLending}</td>
                      <td>{item.datePayBack}</td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                      <td>{item.registeredDate}</td>
                      <td>{item.amount}</td>
                    </>
                  )}
                </tr>
              ))}
              <tr className={styles.grandTotal}>
                <td colSpan={reportType === 'expense' ? 6 : 8}>Grand Total</td>
                <td>{reportData.reduce((sum, item) => sum + item.amount, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Report;