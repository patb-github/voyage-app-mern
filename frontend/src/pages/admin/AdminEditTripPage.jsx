import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosUser from '../../utils/axiosUser'; // ปรับ path ตามโครงสร้างโปรเจคของคุณ
import TripForm from '../../components/admin/TripForm';

function AdminEditTripPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await axiosUser.get(`/trips/${id}`);
        setTripData(response.data.trip);
      } catch (error) {
        console.error('Error fetching trip data:', error);
        setErrorMessage('Error fetching trip data. Please try again.');
      }
    };

    fetchTripData();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === 'sub_expenses') {
          data[key].forEach((exp, index) => {
            formData.append(
              `sub_expenses[${index}][expense_name]`,
              exp.expense_name
            );
            formData.append(
              `sub_expenses[${index}][expense_amount]`,
              exp.expense_amount
            );
          });
        } else if (key === 'image') {
          if (data[key]) {
            formData.append('images', data[key]);
          }
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await axiosUser.patch(`/trips/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

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

  if (!tripData) {
    return <div>Loading...</div>;
  }

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
          <TripForm
            onSubmit={onSubmit}
            initialData={tripData}
            isEditing={true}
          />
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
