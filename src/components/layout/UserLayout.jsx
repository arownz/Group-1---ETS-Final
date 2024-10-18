// UserLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../dashboard/header/Header';
import LeftNav from '../dashboard/leftnav/LeftNav';
import { useState } from 'react';

const UserLayout = () => {
  const [navVisible, setNavVisible] = useState(true);

  // Toggle function for left nav
  const toggleNav = () => setNavVisible(!navVisible);

  return (
    <div className="allmenu-container">
      <Header title="ExpenseWize" toggleNav={toggleNav} navVisible={navVisible} />
      <LeftNav isVisible={navVisible} />
      
      {/* This is where the route content will be injected */}
      <div className={`allmenu-content ${navVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="allmenu-content-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
