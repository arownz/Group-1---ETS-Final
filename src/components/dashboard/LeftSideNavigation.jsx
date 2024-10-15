// Left Side Navigation
import  { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import logo from '/public/ETSlogo-removebg-preview.png';

const LeftSideNavigation = () => {
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  return (
    <div>
      <Navbar.Brand href="">
  <img src={logo} alt="Logo" style={{ width: 40 }} />
  ExpenzeWize
</Navbar.Brand>
      {show && (
        <Nav className="flex-column">
          <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          <Nav.Link href="#expenses">Expenses</Nav.Link>
          <Nav.Link href="#manage-expense">Manage Expense</Nav.Link>
          <Nav.Link href="#lending">Lending</Nav.Link>
          <Nav.Link href="#manage-lending">Manage Lending</Nav.Link>
          <Nav.Link href="#report">Report</Nav.Link>
          <Nav.Link href="#setting">Setting</Nav.Link>
          {/* Add more menu items here */}
        </Nav>
      )}
    </div>
  );
};

export default LeftSideNavigation;