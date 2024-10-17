import { FaBars } from 'react-icons/fa'; // Importing FontAwesome icon for toggle button
import './Header.css';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const Header = ({ title, toggleNav, navVisible }) => {
  return (
    <header className={`dashboard-header ${navVisible ? 'nav-visible' : 'nav-hidden'}`}>
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
            {/* Updated navigation links */}
            <Link to="/settingmenu/Setting">Setting</Link>
            <Link to="/">Logout</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
