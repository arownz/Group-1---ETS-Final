import { useState } from 'react';
import './Expense.css'; // Assuming you have the Expense.css file for styling

function Expense() {
  const [expense, setExpense] = useState({
    title: '',
    category: '',
    date: '',
    cost: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit expense logic here
    console.log(expense);
  };

  const openAddCategoryPopup = () => {
    // Logic to handle opening the "Add Category" popup
    alert('Add Category popup');
  };

  return (
    <>
      <main>
        <div
          className="container shadow my-5 p-5 rounded"
          style={{ backgroundColor: "white" }}
        >
          <div className="row text-center">
            <h1 style={{ fontSize: 40, fontWeight: "bolder" }}>
              Add New Expense
            </h1>
          </div>
          <div className="row py-5 justify-content-center">
            <div className="col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="expenseTitle" className="form-label">
                    Expense Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expenseTitle"
                    name="title"
                    value={expense.title}
                    onChange={handleInputChange}
                    placeholder="Enter expense title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <div className="d-flex">
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={expense.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Bills">Bills</option>
                      <option value="Rent">Rent</option>
                    </select>
                    <button
                      type="button"
                      className="btn btn-secondary ms-2"
                      onClick={openAddCategoryPopup}
                    >
                      Add Category
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={expense.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="cost" className="form-label">
                    Cost
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="cost"
                    name="cost"
                    value={expense.cost}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={expense.description}
                    onChange={handleInputChange}
                    placeholder="Enter a brief description"
                    rows="3"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-success btn-lg">
                  Add Expense
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Expense;
