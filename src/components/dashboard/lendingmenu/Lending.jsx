import { useState } from 'react';
import './LendingForm.css';

const Lending = () => {
    const [lendingTitle, setLendingTitle] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        console.log({
            lendingTitle,
            name,
            date,
            amount,
            description,
            status
        });
        // Clear form fields after submission
        setLendingTitle('');
        setName('');
        setDate('');
        setAmount('');
        setDescription('');
        setStatus('Pending');
    };

    return (
        <div className="container">
            <h1>Add New Lending</h1>
            <form onSubmit={handleSubmit}>
                <label>Lending Title</label>
                <input
                    type="text"
                    value={lendingTitle}
                    onChange={(e) => setLendingTitle(e.target.value)}
                    placeholder="Enter lending title"
                    required
                />
                
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name of the lender"
                    required
                />
                
                <label>Date of Lending</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                
                <label>Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                />
                
                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description"
                />
                
                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Received">Received</option>
                </select>
                
                <button type="submit" className="add-btn">Add Lending</button>
            </form>
        </div>
    );
};

export default Lending;
