import { Navbar, Nav, Dropdown } from 'react-bootstrap';

const TopNavigation = ({ activePageTitle }) => {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">{activePageTitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Welcome User
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNavigation;