import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function AdminEditCouponPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCouponData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/coupons/${id}`);
        const couponData = response.data.coupon;
        Object.keys(couponData).forEach(key => {
            setValue(key, couponData[key]);
        });
      } catch (error) {
        console.error('Error fetching coupon data:', error);
        setErrorMessage('Error fetching coupon data. Please try again.');
      }
    };

    fetchCouponData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
    //   const formData = new FormData();
    //   formData.append('name', data.name);
    //   formData.append('type', data.type);
    //   formData.append('discount', data.discount);
  
      const updatedCoupon = {
        name: data.name,
        type: data.type,
        discount: parseFloat(data.discount)
      }
      console.log(updatedCoupon);
  
      const response = await axios.put(`http://localhost:3000/api/coupons/${id}`, updatedCoupon, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      console.log('Coupon updated:', response.data);
      setSuccessMessage('Coupon updated successfully!');
      navigate('/admin/manage-coupons');
    } catch (error) {
      console.error('Error updating coupon:', error);
      setErrorMessage('Error updating coupon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h2 className="text-3xl font-bold text-white">Edit Coupon</h2>
            <p className="text-blue-100 mt-2">Update the details of your coupon!</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label htmlFor="name" className="label text-gray-700 font-semibold">Coupon Name</label>
                <input
                  id="name"
                  type="text"
                  className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                  {...register("name", { required: "Coupon name is required" })}
                  placeholder="Enter coupon name"
                />
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
              </div>
              <div className="form-control">
                <label htmlFor="type" className="label text-gray-700 font-semibold">Coupon Type</label>
                <select
                  id="type"
                  className={`select select-bordered w-full ${errors.type ? 'select-error' : ''}`}
                  {...register("type", { required: "Coupon type is required" })}
                >
                  <option value="">Select type</option>
                  <option value="fixed">Fixed</option>
                  <option value="percent">Percent</option>
                </select>
                {errors.type && <span className="text-red-500 text-sm mt-1">{errors.type.message}</span>}
              </div>
              <div className="form-control">
                <label htmlFor="discount" className="label text-gray-700 font-semibold">Discount</label>
                <input
                  id="discount"
                  type="text"
                  className={`input input-bordered w-full ${errors.discount ? 'input-error' : ''}`}
                  {...register("discount", {
                    required: "Discount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid discount"
                    },
                    validate: { 
                      betweenDiscount: (value) => {
                        const selectedType = watch('type');
                        if (selectedType === 'percent') {
                          if (!value || isNaN(value) || value < 1 || value > 100) {
                            return 'Discount must be between 1 and 100';
                          }
                        }
                        return true;
                      }
                    }
                  })}
                  placeholder="Enter discount"
                />
                {errors.discount && <span className="text-red-500 text-sm mt-1">{errors.discount.message}</span>}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Coupon'
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

export default AdminEditCouponPage;
