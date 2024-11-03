// src/components/dashboard/lendingmenu/ManageLending.jsx
import { useState, useEffect } from 'react';
import styles from './ManageLending.module.css';
import api from '../../../api/api'; // Make sure this path is correct
//import axios from 'axios';

const ManageLending = () => {
  const [lendings, setLendings] = useState([]);
  const [filteredLendings, setFilteredLendings] = useState([]);
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


  useEffect(() => {
    fetchLendings();
  }, []);

  // Fetch lendings
  const fetchLendings = async () => {
    try {
      const response = await api.get('/lendings');
      setLendings(response.data);
      setFilteredLendings(response.data);
    } catch (error) {
      console.error('Failed to fetch lending records:', error);
    }
  };


  // Apply filters
  useEffect(() => {
    let result = [...lendings];

    if (filters.status) {
      result = result.filter(lending => lending.status === filters.status);
    }

    if (filters.amountOrder) {
      result.sort((a, b) => filters.amountOrder === 'asc' ? a.lending_amount - b.lending_amount : b.lending_amount - a.lending_amount);
    }

    if (filters.dateLendingOrder) {
      result.sort((a, b) => filters.dateLendingOrder === 'asc' ? new Date(a.lending_date) - new Date(b.lending_date) : new Date(b.lending_date) - new Date(a.lending_date));
    }

    if (filters.datePayBackOrder) {
      result.sort((a, b) => filters.datePayBackOrder === 'asc' ? new Date(a.lending_payback_date) - new Date(b.lending_payback_date) : new Date(b.lending_payback_date) - new Date(a.lending_payback_date));
    }

    if (filters.registeredDateOrder) {
      result.sort((a, b) => filters.registeredDateOrder === 'asc' ? new Date(a.lending_registered_date) - new Date(b.lending_registered_date) : new Date(b.lending_registered_date) - new Date(a.lending_registered_date));
    }

    setFilteredLendings(result);
    setCurrentPage(1);
  }, [filters, lendings]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value === '' ? '' : value,
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

  const handleEditClick = (lending) => {
    setSelectedLending({
      id: lending.id,
      title: lending.lending_title,
      borrowername: lending.lending_borrower_name,
      lendingdate: new Date(lending.lending_date).toISOString().split('T')[0],
      paybackdate: new Date(lending.lending_payback_date).toISOString().split('T')[0],
      amount: lending.lending_amount,
      description: lending.lending_description,
      status: lending.lending_status
    });
    setShowEditModal(true);
  };

  const handleDeleteClick = (lending) => {
    setSelectedLending(lending);
    setShowDeleteModal(true);
  };

  const handleEdit = async (updatedLending) => {
    try {
      const response = await api.put(`/lendings/${updatedLending.id}`, {
        lending_title: updatedLending.title,
        lending_borrower_name: updatedLending.borrowername,
        lending_date: updatedLending.lendingdate,
        lending_payback_date: updatedLending.paybackdate,
        lending_amount: updatedLending.amount,
        lending_description: updatedLending.description,
        lending_status: updatedLending.status
      });
      setLendings(lendings.map(e => e.id === updatedLending.id ? response.data : e));
      setFilteredLendings(filteredLendings.map(e => e.id === updatedLending.id ? response.data : e));
      //setFilteredLendings([...lendings]); // Add this line to update the filteredLendings state
      setEditConfirmationMessage('Lending updated successfully!');
      setTimeout(() => {
        setEditConfirmationMessage('');
        setShowEditModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error updating lending:', error);
      setEditConfirmationMessage('Failed to update lending. Please try again.');
    }
  };

  const handleDelete = async (lendingId) => {
    try {
      await api.delete(`/lendings/${lendingId}`);
      setLendings(lendings.filter(e => e.id !== lendingId));
      setFilteredLendings(filteredLendings.filter(e => e.id !== lendingId));
      //setFilteredLendings([...lendings]); // Add this line to update the filteredLendings state
      setDeleteConfirmationMessage('Lending deleted successfully!');
      setTimeout(() => {
        setDeleteConfirmationMessage('');
        setShowDeleteModal(false);
      }, 2000);
    } catch (error) {
      console.error('Error deleting lending:', error);
      setDeleteConfirmationMessage('Failed to delete lending. Please try again.');
    }
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
            {/* <th>Lending ID</th> */}
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
              {/* <td>{lending.id}</td> */}
              <td>{lending.lending_title}</td>
              <td>{lending.lending_borrower_name}</td>
              <td>{new Date(lending.lending_date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              <td>{new Date(lending.lending_payback_date).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
              <td>{lending.lending_amount}</td>
              <td>{lending.lending_description}</td>
              <td>
                <span className={`${styles.statusIndicator} ${styles[lending.status.toLowerCase()]}`}>
                  {lending.status}
                </span>
              </td>
              <td>{new Date(lending.lending_registered_date).toLocaleString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownToggle}>
                    Action
                  </button>
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEditClick(lending)}>Edit</button>
                    <button onClick={() => handleDeleteClick(lending)}>Delete</button>
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
                  value={selectedLending.lendingdate}
                  onChange={(e) => setSelectedLending({ ...selectedLending, lendingdate: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Date of Pay Back</label>
                <input
                  type="date"
                  value={selectedLending.paybackdate}
                  onChange={(e) => setSelectedLending({ ...selectedLending, paybackdate: e.target.value })}
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
                  handleEdit(selectedLending.id);

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
                handleDelete(selectedLending.id);

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