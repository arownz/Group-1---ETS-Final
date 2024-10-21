// src/components/dashboard/lendingmenu/ManageLending.jsx

import { useState, useEffect } from 'react';
import styles from './ManageLending.module.css';

const ManageLending = () => {
  const [lendings, setLendings] = useState([
    { id: 1, title: 'Personal Loan', name: 'John Doe', dateLending: '2024-05-01', datePayBack: '2024-06-01', amount: 1000, description: 'Emergency fund', status: 'Pending', registeredDate: '2024-04-30' },
    { id: 2, title: 'Business Loan', name: 'Jane Smith', dateLending: '2024-05-05', datePayBack: '2024-07-05', amount: 5000, description: 'Startup capital', status: 'Received', registeredDate: '2024-05-04' },
    // Add more dummy data as needed...
  ]);

  const [filteredLendings, setFilteredLendings] = useState(lendings);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editConfirmationMessage, setEditConfirmationMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationMessage, setDeleteConfirmationMessage] = useState('');
  const [selectedLending, setSelectedLending] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    amountOrder: '',
    dateLendingOrder: '',
    datePayBackOrder: '',
    registeredDateOrder: ''
  });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredLendings.length / itemsPerPage);

  // Apply filters
  useEffect(() => {
    let result = [...lendings];

    if (filters.status) {
      result = result.filter(lending => lending.status === filters.status);
    }

    if (filters.amountOrder) {
      result.sort((a, b) => filters.amountOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);
    }

    if (filters.dateLendingOrder) {
      result.sort((a, b) => filters.dateLendingOrder === 'asc' ? new Date(a.dateLending) - new Date(b.dateLending) : new Date(b.dateLending) - new Date(a.dateLending));
    }

    if (filters.datePayBackOrder) {
      result.sort((a, b) => filters.datePayBackOrder === 'asc' ? new Date(a.datePayBack) - new Date(b.datePayBack) : new Date(b.datePayBack) - new Date(a.datePayBack));
    }

    if (filters.registeredDateOrder) {
      result.sort((a, b) => filters.registeredDateOrder === 'asc' ? new Date(a.registeredDate) - new Date(b.registeredDate) : new Date(b.registeredDate) - new Date(a.registeredDate));
    }

    setFilteredLendings(result);
    setCurrentPage(1);
  }, [filters, lendings]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      amountOrder: '',
      dateLendingOrder: '',
      datePayBackOrder: '',
      registeredDateOrder: ''
    });
  };

  const handleEdit = (lending) => {
    setSelectedLending(lending);
    setShowEditModal(true);
  };

  const handleDelete = (lending) => {
    setSelectedLending(lending);
    setShowDeleteModal(true);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredLendings.slice(startIndex, endIndex);
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
    <div className={styles.manageLendingWrapper}>
      <h2>Manage Lending</h2>

      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>

          <select
            value={filters.amountOrder}
            onChange={(e) => handleFilterChange('amountOrder', e.target.value)}
          >
            <option value="">Sort by Amount</option>
            <option value="asc">Amount (Low to High)</option>
            <option value="desc">Amount (High to Low)</option>
          </select>

          <select
            value={filters.dateLendingOrder}
            onChange={(e) => handleFilterChange('dateLendingOrder', e.target.value)}
          >
            <option value="">Sort by Lending Date</option>
            <option value="desc">Date (Newest First)</option>
            <option value="asc">Date (Oldest First)</option>
          </select>

          <select
            value={filters.datePayBackOrder}
            onChange={(e) => handleFilterChange('datePayBackOrder', e.target.value)}
          >
            <option value="">Sort by Pay Back Date</option>
            <option value="desc">Date (Newest First)</option>
            <option value="asc">Date (Oldest First)</option>
          </select>

          <select
            value={filters.registeredDateOrder}
            onChange={(e) => handleFilterChange('registeredDateOrder', e.target.value)}
          >
            <option value="">Sort by Registered Date</option>
            <option value="desc">Date (Newest First)</option>
            <option value="asc">Date (Oldest First)</option>
          </select>
        </div>

        <button onClick={resetFilters} className={styles.resetBtn}>Reset Filters</button>
      </div>

      <table className={styles.lendingTable}>
        <thead>
          <tr>
            <th>#</th>
            <th>Title of Lending</th>
            <th>Name of Borrower</th>
            <th>Date of Lending</th>
            <th>Date of Pay Back</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Status</th>
            <th>Current Time</th>
            <th>Lending Registered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((lending) => (
            <tr key={lending.id}>
              <td>{lending.id}</td>
              <td>{lending.title}</td>
              <td>{lending.name}</td>
              <td>{lending.dateLending}</td>
              <td>{lending.datePayBack}</td>
              <td>{lending.amount}</td>
              <td>{lending.description}</td>
              <td>
                <span className={`${styles.statusIndicator} ${styles[lending.status.toLowerCase()]}`}>
                  {lending.status}
                </span>
              </td>
              <td>{new Date().toLocaleString()}</td>
              <td>{lending.registeredDate}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownToggle}>
                    Action
                  </button>
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEdit(lending)}>Edit</button>
                    <button onClick={() => handleDelete(lending)}>Delete</button>
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
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Edit Lending</h4>
            <form className={styles.lendingForm}>
              <div className={styles.formGroup}>
                <label>Title of Lending</label>
                <input
                  type="text"
                  value={selectedLending.title}
                  onChange={(e) => setSelectedLending({ ...selectedLending, title: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Name of Lender</label>
                <input
                  type="text"
                  value={selectedLending.name}
                  onChange={(e) => setSelectedLending({ ...selectedLending, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Lending</label>
                <input
                  type="date"
                  value={selectedLending.dateLending}
                  onChange={(e) => setSelectedLending({ ...selectedLending, dateLending: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Pay Back</label>
                <input
                  type="date"
                  value={selectedLending.datePayBack}
                  onChange={(e) => setSelectedLending({ ...selectedLending, datePayBack: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Amount</label>
                <input
                  type="number"
                  value={selectedLending.amount}
                  onChange={(e) => setSelectedLending({ ...selectedLending, amount: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  value={selectedLending.description}
                  onChange={(e) => setSelectedLending({ ...selectedLending, description: e.target.value })}
                  rows="4"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={selectedLending.status}
                  onChange={(e) => setSelectedLending({ ...selectedLending, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Received">Received</option>
                </select>
              </div>

              <div className={styles.modalButtons}>
                <button type="button" className={styles.saveBtn} onClick={() => {
                  setLendings(lendings.map(l => l.id === selectedLending.id ? selectedLending : l));
                  setEditConfirmationMessage('Lending updated successfully!');

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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4>Are you sure you want to delete this lending?</h4>

            <div className={styles.modalButtons}>
              <button className={styles.deleteBtn} onClick={() => {
                setLendings(lendings.filter(l => l.id !== selectedLending.id));
                setDeleteConfirmationMessage('Lending deleted successfully!');

                setTimeout(() => {
                  setDeleteConfirmationMessage('');
                  setShowDeleteModal(false);
                }, 3000);
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

export default ManageLending;