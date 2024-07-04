import React, { useState } from 'react';
import axios from 'axios';

function CreateTripForm() {
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    destination_from: '',
    destination_to: '',
    rating: 0,
    price: 0,
    description: '',
    sub_expenses: [],
    images: [],
  });

  const [newExpense, setNewExpense] = useState({
    expense_name: '',
    expense_amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const addExpense = () => {
    if (newExpense.expense_name && newExpense.expense_amount > 0) {
      setFormData({
        ...formData,
        sub_expenses: [...formData.sub_expenses, newExpense],
      });
      setNewExpense({ expense_name: '', expense_amount: 0 });
    }
  };

  const removeExpense = (index) => {
    const updatedExpenses = formData.sub_expenses.filter((_, i) => i !== index);
    setFormData({ ...formData, sub_expenses: updatedExpenses });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/trips', formData);
      console.log('Trip created:', response.data);
      // รีเซ็ตฟอร์ม
      setFormData({
        name: '',
        start_date: '',
        end_date: '',
        destination_from: '',
        destination_to: '',
        rating: 0,
        price: 0,
        description: '',
        sub_expenses: [],
        images: [],
      });
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Trip Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">From</span>
            </label>
            <input
              type="text"
              name="destination_from"
              value={formData.destination_from}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">To</span>
            </label>
            <input
              type="text"
              name="destination_to"
              value={formData.destination_to}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        {/* Sub Expenses Table */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Sub Expenses</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Expense Name</th>
                  <th>Amount (฿)</th>
                </tr>
              </thead>
              <tbody>
                {formData.sub_expenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{expense.expense_name}</td>
                    <td>{expense.expense_amount}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeExpense(index)}
                        className="btn btn-error btn-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Input fields for adding new expenses */}
            <div className="flex space-x-2">
              <input
                type="text"
                name="expense_name"
                value={newExpense.expense_name}
                onChange={handleExpenseChange}
                placeholder="Expense Name"
                className="input input-bordered flex-grow"
              />
              <input
                type="number"
                name="expense_amount"
                value={newExpense.expense_amount}
                onChange={handleExpenseChange}
                placeholder="Amount"
                min="0"
                step="0.01"
                className="input input-bordered w-24"
              />
              <button
                type="button"
                onClick={addExpense}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Images</span>
          </label>
          <input
            type="file"
            multiple
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.files })
            }
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Trip
        </button>
      </form>
    </div>
  );
}

export default CreateTripForm;
