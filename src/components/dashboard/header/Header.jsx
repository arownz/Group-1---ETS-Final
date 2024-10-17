// Header.jsx
import { FaBars } from 'react-icons/fa'; // Importing FontAwesome icon for toggle button
import './Header.css';

const Header = ({ title, toggleNav, userDropdown }) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        {/* Toggle button to control left nav */}
        <FaBars className="toggle-btn" onClick={toggleNav} />
        <h1 className="header-title">{title}</h1> {/* Dynamic title */}
      </div>
      <div className="header-right">
        {/* User Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">User</button>
          <div className="dropdown-content">
            <a href="#setting">Setting</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
