import { useState } from 'react';
import styles from './Report.module.css';
import api from '../../../api/api';

const Report = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [showPrintableReport, setShowPrintableReport] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleGenerateReport = async () => {
    if (!reportType || !startDate || !endDate) {
      setConfirmationMessage('Please select a report type and date range');
      setMessageType('warning');
      setTimeout(() => setConfirmationMessage(''), 3000);
      return;
    }

    try {
      const response = await api.get('/reports/generateReport', {
        params: {
          reportType,
          startDate,
          endDate,
        },
      });

      setReportData(response.data);
      setShowPrintableReport(true);
      setConfirmationMessage('Report generated successfully!');
      setMessageType('success');
    } catch (error) {
      console.error("Error fetching report data:", error);
      setConfirmationMessage('Error generating report');
      setMessageType('error');
    }
    setTimeout(() => setConfirmationMessage(''), 3000);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printableArea');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title style="text-align: center;">Print Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .justifyCell { text-align: center; }
            .grandTotal { font-weight: bold; }
            .grandTotal td:last-child { border-left: 2px solid #2f855a; }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2>Print Report</h2>
          </div>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
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
              <option value="expenses">Expense Report</option>
              <option value="lendings">Lending Report</option>
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
            <h3 className={styles.reportTitle} style={{ textAlign: 'center', margin: '0 auto', display: 'block' }}>
              {reportType === 'expenses' ? 'Expense' : 'Lending'}: Datewise Range Report from {startDate} to {endDate}
            </h3>
            <table className={styles.reportTable}>
              <thead>
                <tr>
                  {reportType === 'expenses' ? (
                    <>
                      {/*<th>Expense ID</th>*/}
                      <th>Title of Expense</th>
                      <th>Category</th>
                      <th>Date of Expense</th>
                      <th>Description</th>
                      <th>Expense Registered Date</th>
                      <th>Cost</th>
                    </>
                  ) : (
                    <>
                      {/* <th>Lending ID</th> */}
                      <th>Title of Lending</th>
                      <th>Name of Borrower</th>
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
                    {reportType === 'expenses' ? (
                      <>
                        {/*<td className={styles.justifyCell}>{item.id}</td> */}
                        <td className={styles.leftCell} style={{ textAlign: 'left' }}>{item.title}</td>
                        <td className={styles.justifyCell}>{item.category}</td>
                        <td className={styles.justifyCell}>{item.expenseDate}</td>
                        <td className={styles.leftCell} style={{ textAlign: 'left' }}>{item.description}</td>
                        <td className={styles.justifyCell}>{item.registeredDate}</td>
                        <td className={styles.justifyCell}>{item.cost}</td>
                      </>
                    ) : (
                      <>
                        {/*<td className={styles.justifyCell}>{item.id}</td>*/}
                        <td className={styles.leftCell} style={{ textAlign: 'left' }}>{item.title}</td>
                        <td className={styles.justifyCell}>{item.name}</td>
                        <td className={styles.justifyCell}>{item.dateLending}</td>
                        <td className={styles.justifyCell}>{item.datePayBack}</td>
                        <td className={styles.leftCell} style={{ textAlign: 'left' }}>{item.description}</td>
                        <td className={styles.justifyCell}>{item.status}</td>
                        <td className={styles.justifyCell}>{item.registeredDate}</td>
                        <td className={styles.justifyCell}>{item.amount}</td>
                      </>
                    )}
                  </tr>
                ))}
                <tr className={styles.grandTotal}>
                  <td colSpan={reportType === 'expenses' ? 5 : 7}>Grand Total</td>
                  <td className={styles.justifyCell}>
                    {reportType === 'expenses'
                      ? reportData.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0).toFixed(2)
                      : reportData.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)
                    }
                  </td>
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