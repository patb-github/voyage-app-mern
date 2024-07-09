import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import axios from 'axios';

function AdminEditTripPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sub_expenses',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const watchRating = watch('rating');
  const currentRating = parseFloat(watchRating || 0).toFixed(1);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/trips/${id}`
        );
        const tripData = response.data.trip;
        Object.keys(tripData).forEach((key) => {
          if (key !== 'sub_expenses' && key !== 'images') {
            setValue(key, tripData[key]);
          }
        });
        setValue('sub_expenses', tripData.sub_expenses || []);
        setExistingImages(tripData.images || []);
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setErrorMessage('Error fetching trip data. Please try again.');
      }
    };

    fetchTripData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('duration_days', data.duration_days);
      formData.append('destination_from', data.destination_from);
      formData.append('destination_to', data.destination_to);
      formData.append('rating', data.rating);
      formData.append('price', data.price);
      formData.append('description', data.description);

      // Append sub_expenses as an array of objects
      data.sub_expenses.forEach((exp, index) => {
        formData.append(
          `sub_expenses[${index}][expense_name]`,
          exp.expense_name
        );
        formData.append(
          `sub_expenses[${index}][expense_amount]`,
          exp.expense_amount
        );
      });

      // Append existing images
      existingImages.forEach((image, index) => {
        formData.append(`existingImages[${index}]`, image);
      });

      // Append new images
      newImages.forEach((image, index) => {
        formData.append('images', image);
      });

      // Log FormData contents for debugging
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await axios.patch(
        `http://localhost:3000/api/trips/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Trip updated:', response.data);
      setSuccessMessage('Trip updated successfully!');
    } catch (error) {
      console.error(
        'Error updating trip:',
        error.response?.data || error.message
      );
      setErrorMessage('Error updating trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };
  const removeExistingImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={handleBack}
          className="mb-4 btn btn-outline btn-primary"
        >
          Back
        </button>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h2 className="text-3xl font-bold text-white">Edit Trip</h2>
            <p className="text-blue-100 mt-2">
              Update the details of your exciting trip!
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label
                  htmlFor="name"
                  className="label text-gray-700 font-semibold"
                >
                  Trip Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.name ? 'input-error' : ''
                  }`}
                  {...register('name', { required: 'Trip name is required' })}
                  placeholder="Enter trip name"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="duration_days"
                  className="label text-gray-700 font-semibold"
                >
                  Duration (days)
                </label>
                <input
                  id="duration_days"
                  type="number"
                  className={`input input-bordered w-full ${
                    errors.duration_days ? 'input-error' : ''
                  }`}
                  {...register('duration_days', {
                    required: 'Duration is required',
                    min: 1,
                  })}
                  placeholder="Enter duration in days"
                />
                {errors.duration_days && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.duration_days.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="destination_from"
                  className="label text-gray-700 font-semibold"
                >
                  From
                </label>
                <input
                  id="destination_from"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.destination_from ? 'input-error' : ''
                  }`}
                  {...register('destination_from', {
                    required: 'Origin is required',
                  })}
                  placeholder="Enter origin"
                />
                {errors.destination_from && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.destination_from.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="destination_to"
                  className="label text-gray-700 font-semibold"
                >
                  To
                </label>
                <input
                  id="destination_to"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.destination_to ? 'input-error' : ''
                  }`}
                  {...register('destination_to', {
                    required: 'Destination is required',
                  })}
                  placeholder="Enter destination"
                />
                {errors.destination_to && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.destination_to.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label
                  htmlFor="price"
                  className="label text-gray-700 font-semibold"
                >
                  Total Price
                </label>
                <input
                  id="price"
                  type="text"
                  className={`input input-bordered w-full ${
                    errors.price ? 'input-error' : ''
                  }`}
                  {...register('price', {
                    required: 'Price is required',
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: 'Please enter a valid price',
                    },
                  })}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control">
              <label
                htmlFor="description"
                className="label text-gray-700 font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered h-32 w-full"
                {...register('description')}
                placeholder="Describe the trip..."
              ></textarea>
            </div>

            <div className="form-control">
              <label
                htmlFor="rating"
                className="label text-gray-700 font-semibold"
              >
                Rating:{' '}
                <span className="text-blue-600 ml-2">{currentRating}</span>
              </label>
              <input
                id="rating"
                type="range"
                min="0"
                max="5"
                step="0.1"
                className="range range-primary"
                {...register('rating')}
              />
              <div className="w-full flex justify-between text-xs px-2 mt-2">
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <div className="h-2 border-l border-gray-300"></div>
                    <span className="mt-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card bg-base-200 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg text-gray-700">
                  Sub Expenses
                </h3>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-x-2">
                    <input
                      type="text"
                      className="input input-bordered input-sm flex-grow"
                      placeholder="Expense Name"
                      {...register(`sub_expenses.${index}.expense_name`, {
                        required: true,
                      })}
                    />
                    <input
                      type="text"
                      className="input input-bordered input-sm w-24"
                      placeholder="Amount"
                      {...register(`sub_expenses.${index}.expense_amount`, {
                        required: true,
                        pattern: /^\d+(\.\d{1,2})?$/,
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-ghost btn-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    append({ expense_name: '', expense_amount: '' })
                  }
                  className="btn btn-primary btn-sm mt-2"
                >
                  Add Expense
                </button>
              </div>
            </div>

            <div className="form-control">
              <label
                htmlFor="images"
                className="label text-gray-700 font-semibold"
              >
                Upload New Images
              </label>
              <input
                id="images"
                type="file"
                multiple
                onChange={handleNewImageUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">
                Existing Images:
              </h4>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {existingImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`existing ${index}`}
                      className="w-full h-24 object-cover rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">New Images:</h4>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {newImages.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`new ${index}`}
                      className="w-full h-24 object-cover rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Trip'
              )}
            </button>
          </form>
        </div>
        {successMessage && (
          <div className="alert alert-success mt-6">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-error mt-6">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}

export default AdminEditTripPage;
