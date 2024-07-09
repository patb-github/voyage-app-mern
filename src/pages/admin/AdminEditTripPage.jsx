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
  const [currentRating, setCurrentRating] = useState(0);

  const watchRating = watch('rating');

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
        setCurrentRating(tripData.rating || 0);
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setErrorMessage('Error fetching trip data. Please try again.');
      }
    };

    fetchTripData();
  }, [id, setValue]);

  useEffect(() => {
    setCurrentRating(parseFloat(watchRating || 0).toFixed(1));
  }, [watchRating]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // สร้าง object ใหม่สำหรับส่งข้อมูล
      const tripData = {
        ...data,
        sub_expenses: data.sub_expenses.map((expense) => ({
          expense_name: expense.expense_name,
          expense_amount: parseFloat(expense.expense_amount),
          _id: expense._id, // ถ้ามี _id
        })),
        images: [
          ...existingImages,
          ...newImages.map((file) => URL.createObjectURL(file)),
        ],
      };

      console.log('Sending data:', tripData);

      const response = await axios.patch(
        `http://localhost:3000/api/trips/${id}`,
        tripData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      console.log('Response:', response.data);
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
              <div className="w-full flex justify-between px-2 mt-1">
                {[0, 1, 2, 3, 4].map((value) => (
                  <div key={value} className="flex justify-between w-full">
                    {[0.2, 0.4, 0.6, 0.8].map((decimal, index) => (
                      <div
                        key={index}
                        className="h-1 border-l border-gray-300"
                      ></div>
                    ))}
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
