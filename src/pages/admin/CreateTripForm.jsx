import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

function CreateTripForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      destination_from: '',
      destination_to: '',
      rating: 0,
      price: '',
      description: '',
      sub_expenses: [],
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sub_expenses"
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'sub_expenses') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });

      const response = await axios.post('/api/trips', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Trip created:', response.data);
      setSuccessMessage('Trip created successfully!');
    } catch (error) {
      console.error('Error creating trip:', error);
      setErrorMessage('Error creating trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <div className="container mx-auto mt-8 p-4 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Trip Name</span>
            </label>
            <input
              id="name"
              type="text"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register("name", { required: "Trip name is required" })}
            />
            {errors.name && <span className="text-error text-sm mt-1">{errors.name.message}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="destination_from" className="label">
              <span className="label-text">From</span>
            </label>
            <input
              id="destination_from"
              type="text"
              className={`input input-bordered w-full ${errors.destination_from ? 'input-error' : ''}`}
              {...register("destination_from", { required: "Origin is required" })}
            />
            {errors.destination_from && <span className="text-error text-sm mt-1">{errors.destination_from.message}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="destination_to" className="label">
              <span className="label-text">To</span>
            </label>
            <input
              id="destination_to"
              type="text"
              className={`input input-bordered w-full ${errors.destination_to ? 'input-error' : ''}`}
              {...register("destination_to", { required: "Destination is required" })}
            />
            {errors.destination_to && <span className="text-error text-sm mt-1">{errors.destination_to.message}</span>}
          </div>
          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text">Total Price</span>
            </label>
            <input
              id="price"
              type="text"
              className={`input input-bordered w-full ${errors.price ? 'input-error' : ''}`}
              {...register("price", { 
                required: "Price is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message: "Please enter a valid price"
                }
              })}
            />
            {errors.price && <span className="text-error text-sm mt-1">{errors.price.message}</span>}
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="description" className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            id="description"
            className="textarea textarea-bordered h-24 w-full"
            {...register("description")}
          ></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="rating" className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            id="rating"
            type="range"
            min="0"
            max="5"
            step="0.1"
            className="range range-primary"
            {...register("rating")}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg">Sub Expenses</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="flex space-x-2">
                <input
                  type="text"
                  className="input input-bordered input-sm flex-grow"
                  placeholder="Expense Name"
                  {...register(`sub_expenses.${index}.expense_name`, { required: true })}
                />
                <input
                  type="text"
                  className="input input-bordered input-sm w-24"
                  placeholder="Amount"
                  {...register(`sub_expenses.${index}.expense_amount`, {
                    required: true,
                    pattern: /^\d+(\.\d{1,2})?$/
                  })}
                />
                <button type="button" onClick={() => remove(index)} className="btn btn-ghost btn-sm">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ expense_name: '', expense_amount: '' })}
              className="btn btn-primary btn-sm mt-2"
            >
              Add Expense
            </button>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="images" className="label">
            <span className="label-text">Upload Images</span>
          </label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
        </div>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`preview ${index}`}
              className="w-full h-20 object-cover rounded"
            />
          ))}
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Creating...
            </>
          ) : (
            'Create Trip'
          )}
        </button>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-4">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="alert alert-error mt-4">{errorMessage}</div>
      )}
    </div>
  );
}

export default CreateTripForm;