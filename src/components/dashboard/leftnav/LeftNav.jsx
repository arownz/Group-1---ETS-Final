import { FaHome, FaMoneyBillAlt, FaCog, FaSignOutAlt, FaMoneyCheck } from 'react-icons/fa';
import './LeftNav.css';
import { FaHandHoldingDollar, FaPrint, FaSackDollar } from 'react-icons/fa6';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const LeftNav = ({ isVisible }) => {
  return (  
    <nav className={`leftnav ${isVisible ? '' : 'hidden'}`}>
      <ul className="nav-list">
        <li><FaHome /> <Link to="/Dashboard">Dashboard</Link></li>
        <li><FaMoneyBillAlt /> <Link to="/expensemenu/Expense">Expenses</Link></li>
        <li><FaMoneyCheck /> <Link to="/expensemenu/ManageExpense">Manage Expenses</Link></li>
        <li><FaHandHoldingDollar /> <Link to="/lendingmenu/Lending">Lending</Link></li>
        <li><FaSackDollar /> <Link to="/lendingmenu/ManageLending">Manage Lending</Link></li>
        <li><FaPrint /> <Link to="/reportmenu/Report">Report</Link></li>
        <li><FaCog /> <Link to="/settingmenu/Setting">Settings</Link></li>
      </ul>
      <div className="logout-section">
        <FaSignOutAlt /> <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default LeftNav;