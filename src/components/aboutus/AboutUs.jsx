import './AboutUs.css';
import { Link } from 'react-router-dom';

function AboutUs() {
    return (
        <>
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
                            <h6 style={{ fontWeight: "bolder" }}>Etivac Street</h6>
                            <p>
                            ExpenseWize PH <br />
                                Pilipins 69 <br />
                                SE-111 53 Etivac <br />
                                Philippines <br />
                                Reg no: 556703-7485 <br />
                                ExpenseWize@gmail.com
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

            {/* hidden div script  */}
        </>

    );
}

export default AboutUs;