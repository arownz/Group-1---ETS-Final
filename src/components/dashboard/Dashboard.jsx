import  { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [expenseType, setExpenseType] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const chartRef = useRef(null);

    useEffect(() => {
        updateChart();
    }, [expenses]);

    const addExpense = (event) => {
        event.preventDefault();
        const newExpense = { type: expenseType, date: date, amount: parseFloat(amount) };
        setExpenses([...expenses, newExpense]);
        setExpenseType('');
        setDate('');
        setAmount('');
    };

    const displayExpenses = () => {
        return expenses.map((expense, index) => (
            <div key={index} className="card mb-2 expense-item">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-4">{expense.type}</div>
                        <div className="col-sm-3">{expense.date}</div>
                        <div className="col-sm-3">₱{expense.amount}</div>
                        <div className="col-sm-2">
                            <button className="btn btn-info btn-edit" onClick={() => editExpense(index)}>Edit</button>
                            <button className="btn btn-danger btn-delete" onClick={() => deleteExpense(index)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const updateChart = () => {
        if (chartRef.current) {
            chartRef.current.data.labels = expenses.map(expense => expense.date);
            chartRef.current.data.datasets[0].data = expenses.map(expense => expense.amount);
            chartRef.current.update();
        }
    };

    const updateTotal = () => {
        return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
    };

    const editExpense = (index) => {
        const expense = expenses[index];
        setExpenseType(expense.type);
        setDate(expense.date);
        setAmount(expense.amount.toString());
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const deleteExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const chartData = {
        labels: expenses.map(expense => expense.date),
        datasets: [{
            label: 'Money Spent',
            data: expenses.map(expense => expense.amount),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <main>
                <div className="container py-5">
                    <div className="card">
                        <div className="card-header bg-success text-center">
                            <h1 className="fw-bold text-white">Finance Tracker</h1>
                        </div>
                        <div className="card-body">
                            <form id="expenseForm" onSubmit={addExpense}>
                                <div className="row gx-3 align-items-center">
                                    <div className="col-md-4 mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Expense Title"
                                            id="expenseType"
                                            value={expenseType}
                                            onChange={(e) => setExpenseType(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-3 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">₱</span>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Amount"
                                                id="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                required
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
                            <div id="expenseList">
                                {displayExpenses()}
                            </div>
                            <div className="total-box mt-4">
                                <h3>Total Money Spent</h3>
                                <p id="totalAmount">₱ {updateTotal()}</p>
                            </div>
                            <div className="mt-5">
                                <Line ref={chartRef} data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Dashboard;