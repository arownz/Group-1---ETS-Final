import './App.css';
import './AboutUs.css';
import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <>
            {/* styling  */}
            <link rel="stylesheet" href="style.css" />
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
            <link rel="icon" type="image/x-icon" href="/src/assets/rounded-1.png" />
            <link rel="stylesheet" href="AboutUs.css" />

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
                <div className="container">
                    <h1
                        className="py-5 text-center"
                        style={{ fontSize: 50, fontWeight: "bolder" }}
                    >
                        About Us
                    </h1>
                    <div className="row">
                        <div className="col-md-8">
                            <p>
                                Welcome to ExpenseWize, your reliable companion in achieving
                                financial wellness. At ExpenseWize, we understand the importance of
                                managing your finances effectively to reach your goals and secure
                                your future.
                            </p>
                            <p>
                                Our mission is to empower individuals and businesses with the tools
                                and insights they need to make informed financial decisions. Whether
                                you&apos;re tracking personal expenses, managing a small business, or
                                planning for retirement, ExpenseWize is here to support you every
                                step of the way.
                            </p>
                            <p>
                                With user-friendly interfaces and powerful features, our platform
                                provides comprehensive solutions for budgeting, expense tracking,
                                investment management, and more. We believe in simplicity, accuracy,
                                and transparency, ensuring that our users have the clarity they need
                                to take control of their finances.
                            </p>
                            <p>
                                Backed by a team of finance experts and technology enthusiasts,
                                ExpenseWize is committed to innovation and excellence. We
                                continuously strive to enhance our platform, incorporating the
                                latest advancements in financial technology to deliver an
                                unparalleled user experience.
                            </p>
                            <p>
                                Join thousands of satisfied users who trust ExpenseWize to streamline
                                their financial journey. Whether you&apos;re just starting or well on
                                your way to financial success, ExpenseWize is here to help you
                                thrive.
                            </p>
                            <p>Start your journey to financial wellness today with ExpenseWize.</p>
                        </div>
                        <div className="col-md-4 px-md-5 mt-5 mt-md-0">
                            <h3 className="text-success" style={{ fontWeight: "bolder" }}>
                                {" "}
                                ExpenseWize HQ
                            </h3>
                            <h6 style={{ fontWeight: "bolder" }}>ABC Street</h6>
                            <p>
                            ExpenseWize PH <br />
                                Pilipins 19 <br />
                                SE-111 53 Etivac <br />
                                Philippines <br />
                                Reg no: 556703-7485 <br />
                                office@ExpenseWize.com
                            </p>
                        </div>
                    </div>
                </div>
                {/* Customer Service and Support */}
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-center py-5" style={{ fontWeight: "bolder" }}>
                                Customer Service and Support
                            </h2>
                            <div className="row">
                                <div className="col-md-10 mx-auto">
                                    <p>
                                        <a href="#" className="text-success">
                                            1. Community.{" "}
                                        </a>{" "}
                                        Get fast support from expert ExpenseWize users. If there isn’t
                                        already an answer there to your question, post it and someone
                                        will quickly answer. You can also suggest and vote on new ideas
                                        for ExpenseWize or simply discuss music with other fans.
                                    </p>
                                    <p>
                                        <a href="#" className="text-success">
                                            2. Contact Us.{" "}
                                        </a>{" "}
                                        Contact our Customer Support if you don’t find a solution on our
                                        support site or Community.
                                    </p>
                                    <p>
                                        <a href="#" className="text-success">
                                            3. Audiobook refunds.
                                        </a>
                                        If you’ve listened to less than 50% of an audiobook purchased in
                                        the last 7 days, you may be eligible for a refund. Check out our
                                        policy for details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Or pick a topic: */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 className="text-center py-5" style={{ fontWeight: "bolder" }}>
                                Or pick a topic:
                            </h2>
                            <ul>
                                <li>
                                    Advertising on ExpenseWize?{" "}
                                    <a href="" className="text-success">
                                        Advertisers section
                                    </a>
                                </li>
                                <li>
                                    Press query?{" "}
                                    <a href="" className="text-success">
                                        Press section{" "}
                                    </a>
                                </li>
                                <li>
                                    Applying for a job?{" "}
                                    <a href="" className="text-success">
                                        {" "}
                                        Jobs section
                                    </a>
                                </li>
                            </ul>
                            <p style={{ marginLeft: 20 }}>
                            ExpenseWize PH, Inc. provides the ExpenseWize service to users in the
                                United States. ExpenseWize PH provides the ExpenseWize service to
                                users in all other markets.
                            </p>
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
        </>

    );
}

export default AboutUs;