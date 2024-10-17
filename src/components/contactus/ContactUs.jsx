function ContactUs() {
    return (
        <div>
            <link rel="stylesheet" href="ContactUs.css" />
            
            <main>
                <div className="container" style={{ marginTop: 50 }}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 style={{ fontSize: 50, fontWeight: "bolder" }}>
                                Contact ExpenseWize
                            </h1>
                            <p>
                                We appreciate your interest in ExpenseWize. Please select from the
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
                                <p>Toll-free from the Philippines</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: "bolder" }}>
                                    +6566778139
                                    <br />
                                    +6566778140
                                </h3>
                                <p>Outside the Philippines</p>
                            </div>
                            <div className="col-md-4">
                                <h3 style={{ fontWeight: "bolder" }}>Find A Location</h3>
                                <p>View a list of local ExpenseWize office information.</p>
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
                                        Thank you for your interest in ExpenseWize&#39;s services. Please
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
                                        We&#39;ll never share your email with anyone else.
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
                                        ExpenseWize for the purpose of fulfilling this request and in
                                        accordance with ExpenseWize’s Privacy Statement
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
        </div>
    );
}

export default ContactUs;