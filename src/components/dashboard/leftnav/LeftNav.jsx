import { FaHome, FaMoneyBillAlt, FaCog, FaSignOutAlt, FaMoneyBillWave, FaMoneyCheck } from 'react-icons/fa';
import './LeftNav.css';
import { FaHandHoldingDollar, FaPrint, FaSackDollar } from 'react-icons/fa6';

const LeftNav = ({ isVisible }) => {
  return (
    <nav className={`leftnav ${isVisible ? '' : 'hidden'}`}>
      <ul className="nav-list">
        <li><FaHome /> Dashboard</li>
        <li><FaMoneyBillAlt /> Expenses</li>
        <li><FaMoneyCheck /> Manage Expenses</li>
        <li><FaHandHoldingDollar /> Lending Expenses</li>
        <li><FaSackDollar /> Manage Lending</li>
        <li><FaPrint /> Report/Print</li>
        <li><FaCog /> Settings</li>
      </ul>
      <div className="logout-section">
        <FaSignOutAlt /> Logout
      </div>
    </nav>
  );
};

export default LeftNav;
