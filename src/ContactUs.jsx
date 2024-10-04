function ContactUs() {
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
            <title>Contact us | Spend Wise</title>
            <link rel="icon" type="image/x-icon" href="Images/rounded-1.png" />
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n*{\n  margin: 0px;\n  padding: 0px;\n}\n\nbody{\n  padding-top: 100px;\n}\n\na{\n  text-decoration: none;\n}\n\n.progress-container {\n  width: 100%;\n  background-color: #f1f1f1;\n}\n\n.progress-bar {\n  height: 3px;\n  background-color: #4caf50;\n  width: 0%;\n}\n\n@media (max-width: 991.98px) {\n  .navbar-collapse {\n    display: none !important;\n  }\n}\na{\n  text-decoration: none;\n}\n\n"
                }}
            />
            <header>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-light p-3 shadow-sm">
                    <div className="container">
                        {/* Logo */}
                        <a className="navbar-brand" href="index.html">
                            <img src="Images/logo.png" alt="logo" style={{ height: 60 }} />
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
                                        href="dashboard1.html"
                                    >
                                        Dashboard
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-2 text-uppercase" href="about-us.html">
                                        About us
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link mx-2 text-uppercase"
                                        href="contact-us.html"
                                    >
                                        contact-us
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
                                            <a className="dropdown-item" href="sign-up.html">
                                                SIGN UP
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="sign.in.html">
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
                <div className="container" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
                                Contact Spend Wise
                            </h1>
                            <p>
                                We appreciate your interest in Spend Wise. Please select from the
                                options below.
                            </p>
                        </div>
                        <div className="row py-5">
                            <div className="col-lg-12">
                                <h2 style={{ fontWeight: "bolder" }}>General Inquiries</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: "bolder" }}>1 (877) 889-9009</h3>
                                <p>Toll-free from the United States and Canada</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: "bolder" }}>
                                    +6566778139
                                    <br />
                                    +6566778140
                                </h3>
                                <p>Outside the United States and Canada</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: "bolder" }}>Find A Location</h3>
                                <p>View a list of local Spend Wise office information.</p>
                            </div>
                        </div>
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-12">
                                    <h2 style={{ fontWeight: "bolder" }} className="text-center">
                                        Send us a question
                                    </h2>
                                </div>
                                <div className="row">
                                    <p>
                                        Thank you for your interest in Spend Wise's services. Please
                                        provide the following information about your business needs to
                                        help us serve you better. This information will enable us to
                                        route your request to the appropriate person. You should receive
                                        a response within one to two business days.
                                    </p>
                                    <h6>All fields are required when completing this form.</h6>
                                </div>
                            </div>
                            <form className="py-4">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id=""
                                        aria-describedby=""
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                    />
                                    <div id="emailHelp" className="form-text">
                                        We'll never share your email with anyone else.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Phone Number" className="form-label">
                                        Phone Number
                                    </label>
                                    <input type="tel" className="form-control" id="" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-group">
                                        <label htmlFor="comment">How can we help you?</label>
                                        <textarea
                                            className="form-control"
                                            rows={5}
                                            id="comment"
                                            defaultValue={""}
                                        />
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
                                        Spend Wise for the purpose of fulfilling this request and in
                                        accordance with Spend Wise’s Privacy Statement
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary px-5 my-4">
                                    Submit
                                </button>
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
                                    <img src="Images/logo.png" alt="" style={{ height: 50 }} />
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
                                    <i className="bi bi-house" /> New York, NY 10012, US
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
                        Spend Wise
                    </a>
                </div>
            </footer>
            {/* hidden div script  */}
        </>
    );
}