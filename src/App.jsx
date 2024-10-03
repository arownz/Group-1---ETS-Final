import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import SignUp from './SignUp'; // Import the SignUp component
import './App.css'

function App() {
  useEffect(() => {
    // Load Bootstrap JavaScript
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Inline JavaScript code
    document.addEventListener("DOMContentLoaded", function () {
      var nextButton = document.querySelector('.next-screen');
      var prevButton = document.querySelector('.prev-screen');
      // Select the pagination dots
      var dots = document.querySelectorAll('.walkthrough-pagination .dot');

      nextButton.addEventListener('click', function () {
        navigateScreens('next');
      });

      prevButton.addEventListener('click', function () {
        navigateScreens('prev');
      });

      // Function to navigate between screens
      function navigateScreens(direction) {
        var currentScreen = document.querySelector('.screen.active');
        var nextScreen = direction === 'next' ? currentScreen.nextElementSibling : currentScreen.previousElementSibling;
        if (nextScreen) {
          currentScreen.classList.remove('active');
          nextScreen.classList.add('active');
          updateActiveDot(nextScreen);
        }
      }

      // Function to update the active dot
      function updateActiveDot(nextScreen) {
        var index = Array.from(nextScreen.parentNode.children).indexOf(nextScreen);
        dots.forEach(function (dot, i) {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      // Check if elements with class 'fade-element' are in viewport and add 'fade-in' class
      window.addEventListener('scroll', function () {
        const fadeElements = document.querySelectorAll('.fade-element');
        fadeElements.forEach(function (element) {
          if (isElementInViewport(element)) {
            element.classList.add('fade-in');
          }
        });
      });

      function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

      // Add other JavaScript code here if needed
    });

    return () => {
      // Cleanup event listeners on component unmount
      document.removeEventListener("DOMContentLoaded", function () { });
    };
  }, []);

  return (
    <Router>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* styling  */}
        <link rel="stylesheet" href="App.css" />
        {/* font  */}
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans"
          rel="stylesheet"
          type="text/css"
        />
        {/* bootstrap  */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* icons  */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        {/* favicon */}
        <link rel="icon" type="image/x-icon" href="/src/assets/rounded-1.png" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n  * {\n      margin: 0px;\n      padding: 0px;\n  }\n\n  a {\n      text-decoration: none !important;\n  }\n\n  .progress-container {\n      width: 100%;\n      background-color: #f1f1f1;\n  }\n\n  "
          }}
        />
        {/* Navbar Section */}
        <header>
          <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-light p-3 shadow-sm">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src="./src/assets/logo.png" alt="logo" style={{ height: 60 }} />
              </a>
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
                    <a
                      className="nav-link mx-2 text-uppercase"
                      href="Dashboard.jsx"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link mx-2 text-uppercase" href="AboutUs.jsx">
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link mx-2 text-uppercase"
                      href="ContactUs.jsx"
                    >
                      Contact Us
                    </a>
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

          {/* Main Content */}
          <div className="container">
            {/* Define Routes for SignUp and SignIn */}
            <Routes>
              <Route path="/SignUp" element={<SignUp />} />
              {/* Other routes can go here */}
            </Routes>
          </div>

        </header>
        <main>
          <div className="container py-5">
            <div className="row justify-content-left align-items-center py-5">
              <div className="col-md-6">
                <h1 className="fw-bolder">Manage your Expenses, Swiftly</h1>
                <p>
                  <i>
                    Transform your financial journey with ease and efficiency,
                    starting now.
                  </i>
                </p>
                <div className="row">
                  <div className="col-8 col-md-12">
                    <a href="SignUp.jsx">
                      <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                      >
                        Start Now
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <br />
                <img
                  src="./src/assets/new1.jpg"
                  alt=""
                  style={{ height: 300 }}
                  className="rounded-3 img-fluid"
                />
              </div>
            </div>
          </div>
          {/* About us   */}
          <div
            className="container-fluid rounded-3 py-5"
            style={{ backgroundColor: "#FAF9F6" }}
          >
            <div className="container">
              <div className="row py-5">
                <div className="col-md-6">
                  <img
                    src="./src/assets/about us"
                    alt=""
                    style={{ height: "auto", maxHeight: 400, width: "100%" }}
                    className="rounded-3 img-fluid"
                  />
                </div>
                <div className="col-md-6">
                  <h4 className="text-success fw-bolder">About</h4>
                  <h2>Discover the world of Financial Planning</h2>
                  <p>
                    Embark on a journey through the realm of Financial Planning, where
                    strategic insights and tailored solutions pave the way to
                    financial stability and prosperity. Explore diverse strategies,
                    smart investments, and expert guidance to navigate the
                    complexities of wealth management and achieve your financial
                    goals.
                  </p>
                  <a
                    href="AboutUs.jsx"
                    className="text-white"
                    style={{ fontSize: 18 }}
                  >
                    <button type="button" className="btn btn-success btn-lg">
                      Read more
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* our servies  */}
          <section>
            <div className="container py-5">
              <div className="row py-5">
                <div className="col-lg-6 d-flex align-items-center">
                  <div className="text-center">
                    <h5 className="text-success fw-bolder">Our Services</h5>
                    <h2>What we offer</h2>
                    <p>
                      &quot;Experience comprehensive financial solutions tailored to your
                      needs. Our offerings include personalized financial planning,
                      investment management, retirement planning, and risk assessment.
                      Let us guide you towards financial security and success, every
                      step of the way.&quot;
                    </p>
                    <button type="button" className="btn btn-success btn-lg">
                      Read more
                    </button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="row gy-4">
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i
                            className="bi bi-piggy-bank-fill"
                            style={{ fontSize: "2em" }}
                          />
                          <h5 className="card-title">Money management</h5>
                          <p className="card-text">
                            Maximize savings and reach financial goals with our
                            advanced money management feature. Budget wisely and
                            prioritize spending effortlessly for long-term success.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i
                            className="bi bi-file-earmark-bar-graph-fill"
                            style={{ fontSize: "2em" }}
                          />
                          <h5 className="card-title">Financial report</h5>
                          <p className="card-text">
                            Generate comprehensive financial reports summarizing
                            expenses and income trends. Access detailed breakdowns of
                            spending categories and visualize financial data for
                            better insights.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i
                            className="bi bi-bar-chart-fill"
                            style={{ fontSize: "2em" }}
                          />
                          <h5 className="card-title">Audit &amp; Assurance</h5>
                          <p className="card-text">
                            Improve internal controls to enhance the reliability and
                            transparency of financial reporting.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-coin" style={{ fontSize: "2em" }} />
                          <h5 className="card-title">Financial plan</h5>
                          <p className="card-text">
                            Develop personalized financial plans tailored to
                            individual goals and circumstances. Analyze income,
                            expenses, assets, and liabilities to create a
                            comprehensive financial overview.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-kanban" style={{ fontSize: "2em" }} />
                          <h5 className="card-title">Profit Planning</h5>
                          <p className="card-text">
                            Monitor performance against profit targets and adjust
                            plans as needed to ensure financial success.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <i className="bi bi-kanban" style={{ fontSize: "2em" }} />
                          <h5 className="card-title">Profit Planning</h5>
                          <p className="card-text">
                            Monitor performance against profit targets and adjust
                            plans as needed to ensure financial success.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* best part  */}
          <div
            className="container-fluid py-5 rounded-3"
            style={{ backgroundColor: "#a7d9bb" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-6 py-4">
                  <div className="d-flex flex-column">
                    <div className="mb-3">
                      <h4 className="fs-4">
                        <i className="bi bi-check-circle fs-5 px-2" />
                        Financial Awareness
                      </h4>
                      <p>
                        Understand where the money is being spent and get a hold of
                        your spending patterns
                      </p>
                    </div>
                    <div className="mb-3">
                      <h4 className="fs-4">
                        <i className="bi bi-check-circle fs-5 px-2" />
                        Setting up of Goals
                      </h4>
                      <p>
                        Facilitates in setting up of financial goals, be it saving up
                        for a vacation or paying off debt
                      </p>
                    </div>
                    <div className="mb-3">
                      <h4 className="fs-4">
                        <i className="bi bi-check-circle fs-5 px-2" />
                        Accessibility and Convenience
                      </h4>
                      <p>
                        Accessible anytime, anywhere. Simplify expense tracking
                        on-the-go
                      </p>
                    </div>
                    <div className="mb-3">
                      <h4 className="fs-4">
                        <i className="bi bi-check-circle fs-5 px-2" />
                        Security
                      </h4>
                      <p>Your financial data is kept secure</p>
                    </div>
                    <div className="mb-3">
                      <h4 className="fs-4">
                        <i className="bi bi-check-circle fs-5 px-2" />
                        Visualize Expenses
                      </h4>
                      <p>
                        Provides visualizations like graphs for better financial
                        expense understanding
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 text-center ">
                  <img
                    src="./src/assets/your need.webp"
                    alt=""
                    style={{ maxHeight: 500, width: "100%" }}
                    className="rounded-3 img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* you need it, we got it  */}
          <div className="container-fluid py-5 " style={{ backgroundColor: "white" }}>
            <div className="container text-center py-5">
              <h1 className="py-5 fw-bolder">You need it, we&apos;ve got it</h1>
              <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-5">
                <div className="col">
                  <div className="p-3">
                    <i
                      className="bi bi-currency-dollar"
                      style={{ fontSize: "2em" }}
                    />
                  </div>
                  <p className=" fw-bold fs-5">Money management</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-graph-up" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Investment tracking</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-credit-card" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Goal prioritization</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-receipt-cutoff" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Bill reminders</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-calculator" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Sync across devices</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-bank" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Security features</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-wallet2" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Income tracking</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-cart3" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Budget tracking</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i
                      className="bi bi-currency-bitcoin"
                      style={{ fontSize: "2em" }}
                    />
                  </div>
                  <p className=" fw-bold fs-5">Multiple currency support</p>
                </div>
                <div className="col">
                  <div className="p-3">
                    <i className="bi bi-check-all" style={{ fontSize: "2em" }} />
                  </div>
                  <p className=" fw-bold fs-5">Secure</p>
                </div>
              </div>
            </div>
          </div>

          {/* blue section  */}
          <section>
            <div
              className="container-fluid rounded-3 py-5"
              style={{ backgroundColor: "#0d084d" }}
            >
              <div className="container py-5">
                <div className="row">
                  <div className="col-lg-6" style={{ color: "white" }}>
                    <h1 style={{ fontWeight: "bolder" }}>
                      Easy Financial Management
                    </h1>
                    <h4>Advanced way to track expenses </h4>
                    <div className="d-flex align-items-baseline mb-3">
                      <i
                        className="bi bi-patch-check-fill"
                        style={{ fontSize: "1.5em" }}
                      />
                      <h5 className="px-2">Intuitive Interface </h5>
                    </div>
                    <p>
                      ExpenseWize is a user-friendly interface, making it easy for
                      users to navigate
                    </p>
                    <div className="d-flex align-items-baseline mb-3">
                      <i
                        className="bi bi-patch-check-fill"
                        style={{ fontSize: "1.5em" }}
                      />
                      <h5 className="px-2"> Comprehensive Expense Tracking</h5>
                    </div>
                    <p>Users can effortlessly record and categorize their expenses</p>
                    <div className="d-flex align-items-baseline mb-3">
                      <i
                        className="bi bi-patch-check-fill"
                        style={{ fontSize: "1.5em" }}
                      />
                      <h5 className="px-2">Insightful Financial Analytics</h5>
                    </div>
                    <p>Spending patterns can be tracke through graphs</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* experts  */}
          <section>
            <div className="container py-5">
              <div className="row py-5">
                <div className="col">
                  <h4 className="text-success">Learn From Experts</h4>
                  <h2>Expert Advisors</h2>
                  <p>
                    &quot;Unlock financial expertise with our platform. Learn from
                    industry-leading experts and gain valuable insights to optimize
                    your financial strategy and achieve your goals.&quot;
                  </p>
                  <button type="button" className="btn btn-success  btn-lg">
                    <a
                      href="ContactUs.jsx "
                      className="text-white"
                      target="_blank"
                      style={{ fontSize: 18 }}
                    >
                      Read more
                    </a>
                  </button>
                </div>
                <div className="col">
                  <img
                    src="./src/assets/advisor1.webp"
                    alt=""
                    style={{ height: 250, paddingLeft: 75 }}
                  />
                </div>
                <div className="col">
                  <img
                    src="./src/assets/advisor2.png" alt="advisor2"
                    style={{ height: 250, paddingLeft: 75 }}
                  />
                </div>
              </div>
            </div>
          </section>
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
                    info@example.com
                  </p>
                  <p>
                    <i className="bi bi-telephone" /> + 01 234 567 88
                  </p>
                  <p>
                    <i className="bi bi-printer" /> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="text-center p-4">
            © 2024 Copyright:
            <a className="text-reset" href="#">
              ExpenseWize
            </a>
          </div>
        </footer>
      </>
    </Router>
  );
}

export default App
