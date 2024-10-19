import { useState, useEffect } from 'react';
import styles from './ManageLending.module.css';

const ManageLending = () => {
  const [lendings, setLendings] = useState([]);
  const [filteredLendings, setFilteredLendings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLending, setEditingLending] = useState(null);

  // Fetch lendings data (mock data for now)
  useEffect(() => {
    const mockLendings = [
      {
        id: 1,
        title: 'Car Loan',
        lenderName: 'John Doe',
        date: '2023-05-15',
        amount: 5000,
        description: 'Loan for new car',
        status: 'Pending',
        currentTime: new Date().toLocaleString(),
        registeredDate: '2023-05-14',
      },
      // Add more mock data as needed
    ];
    setLendings(mockLendings);
    setFilteredLendings(mockLendings);
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filtering function
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = lendings;
    if (filters.status) {
      filtered = filtered.filter(lending => lending.status === filters.status);
    }
    if (filters.dateFrom) {
      filtered = filtered.filter(lending => new Date(lending.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      filtered = filtered.filter(lending => new Date(lending.date) <= new Date(filters.dateTo));
    }
    setFilteredLendings(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({ status: '', dateFrom: '', dateTo: '' });
    setFilteredLendings(lendings);
    setCurrentPage(1);
  };

  // Edit lending
  const handleEdit = (lending) => {
    setEditingLending(lending);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Update lending logic here
    setShowEditModal(false);
  };

  // Delete lending
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lending record?')) {
      setLendings(lendings.filter(lending => lending.id !== id));
      setFilteredLendings(filteredLendings.filter(lending => lending.id !== id));
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLendings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.manageLendingWrapper}>
      <h2>Manage Lending</h2>

      {/* Filters */}
      <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Received">Received</option>
          </select>
          <input
            type="date"
            name="dateFrom"
            value={filters.dateFrom}
            onChange={handleFilterChange}
            placeholder="From Date"
          />
          <input
            type="date"
            name="dateTo"
            value={filters.dateTo}
            onChange={handleFilterChange}
            placeholder="To Date"
          />
          <button onClick={applyFilters}>Apply Filters</button>
        </div>
        <button onClick={resetFilters} className={styles.resetBtn}>Reset</button>
      </div>

      {/* Lending Table */}
      <table className={styles.lendingTable}>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>#</th>
            <th onClick={() => requestSort('title')}>Title</th>
            <th onClick={() => requestSort('lenderName')}>Lender Name</th>
            <th onClick={() => requestSort('date')}>Date of Lending</th>
            <th onClick={() => requestSort('amount')}>Amount</th>
            <th onClick={() => requestSort('description')}>Description</th>
            <th onClick={() => requestSort('status')}>Status</th>
            <th>Current Time</th>
            <th onClick={() => requestSort('registeredDate')}>Registered Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((lending) => (
            <tr key={lending.id}>
              <td>{lending.id}</td>
              <td>{lending.title}</td>
              <td>{lending.lenderName}</td>
              <td>{lending.date}</td>
              <td>${lending.amount}</td>
              <td>{lending.description}</td>
              <td>{lending.status}</td>
              <td>{new Date().toLocaleString()}</td>
              <td>{lending.registeredDate}</td>
              <td>
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>Actions</button>
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => handleEdit(lending)}>Edit</button>
                    <button onClick={() => handleDelete(lending.id)}>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredLendings.length / itemsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? styles.active : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Lending</h3>
            <form onSubmit={handleEditSubmit}>
              {/* Add form fields for editing lending */}
              <button type="submit">Save Changes</button>
              <button onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLending;