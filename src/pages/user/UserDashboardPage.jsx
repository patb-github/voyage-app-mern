import React, { useState, useEffect, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../context/UserContext';
import axios from 'axios';

const UserDashboardPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGender, setSelectedGender] = useState('');
  const fileInputRef = useRef(null);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstname,
        lastName: user.lastname,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
        phoneNumber: user.phone,
        email: user.email,
        gender: user.gender,
      });
      setSelectedGender(user.gender || '');
    }
  }, [user, reset]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const showModal = () => {
    document.getElementById('update_modal').showModal();
  };

  const onSubmit = async (data) => {
    const updatedFields = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      country: data.country,
      phone: data.phoneNumber,
    };

    if (selectedImage) {
      updatedFields.profileImage = selectedImage;
    }

    try {
      console.log('Before update:', user);
      const response = await axios.put(
        `http://localhost:3000/api/profile/${user.id}`,
        updatedFields
      );
      console.log('After update:', response.data);

      setUser((prevUser) => ({
        ...prevUser,
        ...response.data,
      }));

      console.log('After setUser:', user);
      setModalContent({
        title: 'Success',
        message: 'Profile updated successfully!',
      });
      showModal();

      reset(response.data);
      setSelectedGender(response.data.gender || '');
    } catch (error) {
      console.error('Error updating user data:', error);
      setModalContent({
        title: 'Error',
        message: 'Failed to update profile. Please try again.',
      });
      showModal();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 p-8 bg-gray-50">
            <div className="text-center">
              <img
                src={
                  selectedImage || user?.profileImage || '/default-avatar.png'
                }
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={triggerFileInput}
                className="btn btn-outline btn-sm mt-2"
              >
                Change Photo
              </button>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user?.firstname} {user?.lastname}
              </h2>
            </div>
          </div>
          <div className="p-8 flex-grow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Account Settings
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    First name*
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    defaultValue={user?.firstname}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Last name*
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    defaultValue={user?.lastname}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    {...register('gender')}
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-Select-</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    {...register('dateOfBirth')}
                    defaultValue={user?.dateOfBirth}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Phone number*
                  </label>
                  <div className="flex">
                    <select className="w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>+66</option>
                    </select>
                    <input
                      type="tel"
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^\d{9}$/,
                          message: 'Phone number must be 9 digits',
                        },
                      })}
                      defaultValue={user?.phone}
                      className="flex-grow px-3 py-2 border border-gray-300 border-l-0 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (
                          (!/^\d$/.test(e.key) && e.key !== 'Backspace') ||
                          (e.target.value.length >= 9 && e.key !== 'Backspace')
                        ) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-sm">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    defaultValue={user?.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                    disabled
                  />
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isDirty && !selectedImage}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalContent.title}</h3>
          <p className="py-4">{modalContent.message}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserDashboardPage;
