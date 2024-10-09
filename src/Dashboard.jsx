import './App.css';
import './Dashboard.css';
import { Link } from 'react-router-dom';

function Dashboard() {

    return (
        <>
            {/* styling  */}
            < link rel="stylesheet" href="App.css" />
            {/* font  */}
            <link
                href="https://fonts.googleapis.com/css?family=Open+Sans"
                rel="stylesheet"
                type="text/css"
            />
            {/* bootstrap  */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
            />
            {/* icons  */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
            />
            <link rel="icon" type="image/x-icon" href="Images/rounded-1.png" />
            <link rel="stylesheet" href="BlueBox.css" />
            <link rel="stylesheet" href="Dashboard.css" />
            {/* Navbar Section */}
            <header>
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-light p-3 shadow-sm">
                    <div className="container">
                        <Link className="navbar-brand" to="/App">
                            <img src="./src/assets/logo.png" alt="logo" style={{ height: 60 }} />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-uppercase" to="/Dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-2 text-uppercase" to="/AboutUs">
                                        About us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link mx-2 text-uppercase"
                                        to="/ContactUs"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        ACCOUNT
                                    </a>
                                    <ul className="dropdown-menu text-center">
                                        <li>
                                            <Link className="dropdown-item" to="/SignUp">
                                                SIGN UP
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/SignIn">
                                                SIGN IN
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* progress bar */}
                <div className="progress-container">
                    <div className="progress-bar" id="myBar" />
                </div>
            </header>
            <main>
                <div className="container py-5">
                    <div className="card">
                        <div className="card-header bg-success text-center">
                            <h1 className="fw-bold text-white">Expense Tracker</h1>
                        </div>
                        <div className="card-body">
                            <form id="expenseForm">
                                <div className="row gx-3 align-items-center">
                                    <div className="col-md-4 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Expense Type"
                                            id="expenseType"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            required=""
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">$</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Amount"
                                                id="amount"
                                                required=""
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Add Expense
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <h2 className="mb-3">Expense List</h2>
                            <div id="expenseList" />
                            <div className="total-box mt-4">
                                <h3>Total Money Spent</h3>
                                <p id="totalAmount">$0</p>
                            </div>
                            <div className="mt-5">
                                <canvas id="expenseChart" width={800} height={400} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className=" container-fluid text-lg-start  text-muted ">
          {/* Section: Social media */}
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            {/* Left */}
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>
            {/* Right */}
            <div>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-facebook fs" />
              </a>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-twitter-x" />
              </a>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-google" />
              </a>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-instagram" />
              </a>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-linkedin" />
              </a>
              <a href="" className="me-4 text-reset">
                <i className="bi bi-github" />
              </a>
            </div>
          </section>
          {/* Section: Links  */}
          <section className="">
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3" />
                    <img src="./src/assets/logo.png" alt="" style={{ height: 50 }} />
                  </h6>
                  <p>
                    Here you can use rows and columns to organize your footer content.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                {/* Grid column */}
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="bi bi-house" /> Philippines, PH 10012, PH
                  </p>
                  <p>
                    <i className="bi bi-envelope" />
                    .  info@example.com
                  </p>
                  <p>
                    <i className="bi bi-telephone" /> + 63 123 456 78
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4">
            © 2024 Copyright:
            <Link className="text-reset" to="/App">
              ExpenseWize
            </Link>
          </div>
        </footer>
            {/* hidden div script  */}
            {/* fade in  */}
            {/* progress bar  */}
            {/* blue box  */}
        </>
    );
}

export default Dashboard;