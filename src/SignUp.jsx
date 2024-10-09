import { useEffect } from 'react';
import './App.css';
import './SignUp.css';

function Signup() {
  useEffect(() => {
    // Load Bootstrap JavaScript
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js";
    script.integrity = "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);

    // Validate form function
    window.validateForm = function() {
      var username = document.getElementById("name");
      var email = document.getElementById("email");
      var phone = document.getElementById("phone");
      var password = document.getElementById("pass"); 

      if (username.value.trim() === "") {
        document.getElementById("name").style.border = "solid 2px red";
        document.getElementById("nameError").style.visibility = "visible";
        return false;
      } else if (email.value.trim() === "") {
        document.getElementById("email").style.border = "solid 2px red";
        document.getElementById("emailError").style.visibility = "visible";
        return false;
      } else if (phone.value.trim() === "") {
        document.getElementById("phone").style.border = "solid 2px red";
        document.getElementById("phoneError").style.visibility = "visible";
        document.getElementById("phoneError").innerHTML = "*Phone Number cannot be blank";
        return false;
      } else if (phone.value.trim().length !== 10) {
        document.getElementById("phone").style.border = "solid 2px red";
        document.getElementById("phoneError").innerHTML = "*Phone number should be 10 digits";
        return false;
      } else if (password.value.trim() === "") {
        document.getElementById("pass").style.border = "solid 2px red";
        document.getElementById("passError").style.visibility = "visible";
        return false;
      } else if (password.value.trim().length < 8) {
        document.getElementById("pass").style.border = "solid 2px red";
        document.getElementById("passError").style.display = "none";
        document.getElementById("passError1").style.visibility = "visible";
        return false;
      } else {
        return true;
      }
    };

    // Hidden div script
    document.addEventListener("DOMContentLoaded", function() {
      window.addEventListener("scroll", function() {
        var hiddenDiv = document.getElementById("hiddenDiv");
        var scrollPosition = window.scrollY;
        var scrollToShow = 250;

        if (scrollPosition > scrollToShow) {
          hiddenDiv.classList.remove("hidden");
        } else {
          hiddenDiv.classList.add("hidden");
        }
      });
    });

    // Fade-in elements on scroll
    window.addEventListener('scroll', function() {
      const fadeElements = document.querySelectorAll('.fade-element');

      fadeElements.forEach(function(element) {
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

    // Progress bar on scroll
    window.onscroll = function() { myFunction() };

    function myFunction() {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      var navbarHeight = document.querySelector('.header').offsetHeight;
      var progressBar = document.getElementById("myBar");
      progressBar.style.width = scrolled + "%";
      progressBar.style.top = navbarHeight + "px";
    }
  }, []);

  return (
    <>
      {/* Required meta tags */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* styling */}
      <link rel="stylesheet" href="App.css" />
      {/* font */}
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
        type="text/css"
      />
      {/* bootstrap */}
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
      {/* icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
      <title>Sign up | ExpenseWize</title>
      <link rel="icon" type="image/x-icon" href="/src/assets/rounded-1.png" />
      <link rel="stylesheet" href="SignUp.css" />
      <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-light p-3 shadow-sm">
          <div className="container">
            {/* Logo */}
            <a className="navbar-brand" href="App.jsx">
              <img src="/src/assets/logo.png" alt="logo" style={{ height: 60 }} />
            </a>
            {/* Toggler/collapsing button */}
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
            {/* Collapsible content */}
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {/* Navigation links */}
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
              {/* Additional actions */}
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
                      <a className="dropdown-item" href="SignUp.jsx">
                        SIGN UP
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="SignIn.jsx">
                        SIGN IN
                      </a>
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
        <div
          className="container shadow my-5 p-5 rounded"
          style={{ backgroundColor: "white" }}
        >
          <div className="row text-center">
            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
              Start your journey with us
            </h1>
          </div>
          <div className="row py-5">
            <div className="col-lg-6">
              <img src="/src/assets/logup.jpeg" alt="sign up" className="  rounded-3 " />
            </div>
            <div className="col-lg-6">
              <h2 style={{ fontSize: 30, fontWeight: "bolder" }}>
                Create New Account
              </h2>
              <form
                className="py-4"
                action="SignIn.jsx"
                name="myForm"
                onSubmit="return validateForm()"
              >
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Name
                  </label>
                  <span
                    id="nameError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Name cannot be blank
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby=""
                    placeholder="your name"
                  />
                  <div id="fname" className="form-text">
                    Enter your full name
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <span
                    id="emailError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Email cannot be blank
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="example@example.com"
                  />
                  <div id="" className="form-text">
                    We&apos;ll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="Phone Number" className="form-label">
                    Phone Number
                  </label>
                  <span
                    id="phoneError"
                    style={{ color: "red", visibility: "hidden" }}
                  >
                    *Phone Number cannot be blank
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="(xxx) xxx-xxxx"
                  />
                  <div id="" className="form-text">
                    Enter your phone number
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Password"
                    />
                    <span
                      id="passError"
                      style={{ color: "red", visibility: "hidden" }}
                    >
                      *Password cannot be blank
                    </span>
                    <span
                      id="passError1"
                      style={{ color: "red", visibility: "hidden" }}
                    >
                      *Password length should be minimum 8 characters.
                    </span>
                    <div id="password" className="form-text">
                      Enter a strong password
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1"> Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Password"
                    />
                    <div id="" className="form-text">
                      Confirm your password
                    </div>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I agree to the use or processing of my personal information by
                    ExpenseWize for the purpose of fulfilling this request and in
                    accordance with ExpenseWize Privacy Statement
                  </label>
                </div>
                <div className="row">
                  <button type="submit" className="btn btn-success btn-lg my-4">
                    Submit
                  </button>
                </div>
                <div className="row text-center">
                  <div className="col-md-6">
                    <div className="row">
                      <button
                        type="button"
                        className="btn btn-outline-success btn-flat"
                        title="Sign up with Google"
                      >
                        <i className="bi bi-google" />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row m-0">
                      <button
                        type="button"
                        className="btn btn-outline-success "
                        title="Sign up with Facebook"
                      >
                        <i className="bi bi-facebook" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
                  <img src="/src/assets/logo.png" alt="" style={{ height: 50 }} />
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
  );
}

export default Signup;