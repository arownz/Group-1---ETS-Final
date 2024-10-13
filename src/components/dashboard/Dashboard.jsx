import './Dashboard.css';
import './BlueBox.css'

function Dashboard() {

    return (
        <>
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

            {/* hidden div script  */}
        </>
    );
}

export default Dashboard;