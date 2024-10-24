import { useState } from 'react';
import styles from './Report.module.css';

const Report = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [showPrintableReport, setShowPrintableReport] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [messageType, setMessageType] = useState('');


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

  const handleGenerateReport = () => {
    if (!reportType || !startDate || !endDate) {
      setConfirmationMessage('Please select a report type and date range');
      setMessageType('warning');
      setTimeout(() => setConfirmationMessage(''), 3000);
      return;
    }

    const data = reportType === 'expense' ? expenseData : lendingData;
    const filteredData = data.filter(item => {
      const itemDate = new Date(reportType === 'expense' ? item.expenseDate : item.dateLending);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

    setReportData(filteredData);
    setShowPrintableReport(true);
    setConfirmationMessage('Report generated successfully!');
    setMessageType('success');
    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printableArea');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write('<html><head><title>Print Report</title>');
    WinPrint.document.write('<style>');
    WinPrint.document.write(`
      table { width: 100%; border-collapse: collapse; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
      .justifyCell { text-align: center; }
      .grandTotal { font-weight: bold; }
      .grandTotal td:last-child { border-left: 2px solid #2f855a; }
    `);
    WinPrint.document.write('</style></head><body>');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.write('</body></html>');
    WinPrint.document.close();
    WinPrint.focus();
    setTimeout(() => {
      WinPrint.print();
      WinPrint.close();
    }, 250);
  };

  const handleReset = () => {
    setReportType('');
    setStartDate('');
    setEndDate('');
    setReportData([]);
    setShowPrintableReport(false);
    setConfirmationMessage('Form and table reset successfully!');
    setMessageType('success');
    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.formWrapper}>
      <h2>Generate Report</h2>
        <div className={styles.reportForm}>
          <div className={styles.formGroup}>
            <label>Report Type:</label>
            <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="">Choose a Report Type</option>
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
          <div className={styles.buttonGroup}>
            <button className={styles.generateBtn} onClick={handleGenerateReport}>Generate Report</button>
            <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
          </div>
        </div>
        {confirmationMessage && (
          <div className={`${styles.confirmationMessage} ${styles[messageType]}`}>
            {confirmationMessage}
          </div>
        )}
      </div>

      {showPrintableReport && (
        <div className={styles.tableWrapper}>
          <div className={styles.printBtnWrapper}>
            <button className={styles.printBtn} onClick={handlePrint}>Print</button>
          </div>
          <div id="printableArea">
            <h3 className={styles.reportTitle}>
              {reportType === 'expense' ? 'Expense' : 'Lending'}: Datewise Range Report from {startDate} to {endDate}
            </h3>
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
                        <td className={styles.justifyCell}>{item.id}</td>
                        <td>{item.title}</td>
                        <td className={styles.justifyCell}>{item.category}</td>
                        <td className={styles.justifyCell}>{item.expenseDate}</td>
                        <td>{item.description}</td>
                        <td className={styles.justifyCell}>{item.registeredDate}</td>
                        <td className={styles.justifyCell}>{item.amount}</td>
                      </>
                    ) : (
                      <>
                        <td className={styles.justifyCell}>{item.id}</td>
                        <td>{item.title}</td>
                        <td className={styles.justifyCell}>{item.name}</td>
                        <td className={styles.justifyCell}>{item.dateLending}</td>
                        <td className={styles.justifyCell}>{item.datePayBack}</td>
                        <td>{item.description}</td>
                        <td className={styles.justifyCell}>{item.status}</td>
                        <td className={styles.justifyCell}>{item.registeredDate}</td>
                        <td className={styles.justifyCell}>{item.amount}</td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className={styles.grandTotal}>
                  <td colSpan={reportType === 'expense' ? 6 : 8}>Grand Total</td>
                  <td className={styles.justifyCell}>{reportData.reduce((sum, item) => sum + item.amount, 0)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;