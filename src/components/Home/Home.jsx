import { Link } from 'react-router-dom';

function Home() {
    return (
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
                    <Link to="/SignIn">
                      <button
                        type="button"
                        className="btn btn-success btn-lg btn-block"
                      >
                        Start Now
                      </button>
                    </Link>
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
          {/* About us */}
          <div
            className="container-fluid rounded-3 py-5"
            style={{ backgroundColor: "#FAF9F6" }}
          >
            <div className="container">
              <div className="row py-5">
                <div className="col-md-6">
                  <img
                    src="./src/assets/about us.png"
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
                  <Link to="/AboutUs"
                    className="text-white"
                    style={{ fontSize: 18 }}
                  >
                    <button type="button" className="btn btn-success btn-lg">
                      Read more
                    </button>
                  </Link>
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
                    <h5 className="text-success fw-bolder">About</h5>
                    <h2>What is this tool for?</h2>
                    <p>
                      &quot;Experience comprehensive financial solutions tailored to your
                      needs. Our offerings include personalized financial planning,
                      investment management, retirement planning, and risk assessment.
                      Let us guide you towards financial security and success, every
                      step of the way.&quot;
                    </p>
                    <Link to="/AboutUs"
                      className="text-white"
                      style={{ fontSize: 18 }}
                    >
                      <button type="button" className="btn btn-success btn-lg">
                        Read more
                      </button>
                    </Link>
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
                    src="./src/assets/what.png"
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
                    <Link
                      to="/ContactUs"
                      className="text-white"
                      style={{ fontSize: 18 }}
                    >
                      <button type="button" className="btn btn-success btn-lg">
                      Contact Us
                  </button>
                  </Link>
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

    )
};

export default Home;
