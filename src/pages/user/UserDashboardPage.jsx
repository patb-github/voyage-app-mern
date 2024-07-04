import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../context/UserContext';

const UserDashboardPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // เมื่อ user ใน context เปลี่ยนแปลง ให้ reset ฟอร์ม
    if (user) {
      reset({
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
        gender: user.gender || '',
        dateOfBirth: user.dateOfBirth || '',
        phoneNumber: user.phoneNumber || '',
        country: user.country || '',
      });
      setSelectedImage(user.profileImage);
    }
  }, [user, reset]);

  const handleImageChange = (event) => {
    // เมื่อเลือกรูปภาพใหม่
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    // เมื่อกด submit ฟอร์ม
    try {
      const updatedUser = {
        ...user,
        ...data,
        profileImage: selectedImage || user?.profileImage,
      };
      setUser(updatedUser);
      console.log(updatedUser); // อัปเดต user ใน context

      // ส่งข้อมูลไปยัง backend เพื่ออัปเดต (ถ้าจำเป็น)
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        // แทนที่ด้วย endpoint ของ backend
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user data');
      }

      // อัปเดต context ด้วยข้อมูลที่อัพเดทจาก backend (ถ้าจำเป็น)
      // const updatedUserFromBackend = await response.json();
      // setUser(updatedUserFromBackend);
    } catch (error) {
      console.error('Error updating user data:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 md:h-screen">
      <div className="md:mr-6">
        {/* ส่วนแสดงรูปภาพและชื่อผู้ใช้ */}
        <div className="bg-white rounded-lg p-4 shadow">
          <img
            src={selectedImage || user?.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <div className="flex justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered file-input-xs w-full max-w-xs"
            />
          </div>
          <h2 className="text-xl font-semibold text-center pt-4">
            {user?.firstname} {user?.lastname}
          </h2>
        </div>
      </div>
      <div className="pt-4 md:w-3/4 md:pt-0">
        {/* ส่วนของฟอร์ม */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          {user ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium"
                  >
                    First name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register('firstName', {
                      required: 'First name is required',
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.firstName && (
                    <span className="text-red-500">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium"
                  >
                    Last name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register('lastName', {
                      required: 'Last name is required',
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.lastName && (
                    <span className="text-red-500">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium"
                  >
                    E-mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    {...register('gender')}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">-Select-</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-2 text-sm font-medium"
                  >
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    {...register('dateOfBirth')}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium"
                  >
                    Country*
                  </label>
                  <input
                    type="text"
                    id="country"
                    {...register('country', {
                      required: 'Country is required',
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  {errors.country && (
                    <span className="text-red-500">
                      {errors.country.message}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium"
                  >
                    Phone number*
                  </label>
                  <div className="flex">
                    <select className="w-20 px-3 py-2 border rounded-l-md">
                      <option>+66</option>
                    </select>
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register('phoneNumber', {
                        required: 'Phone number is required',
                      })}
                      className="flex-grow px-3 py-2 border border-l-0 rounded-r-md"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-red-500">
                      {errors.phoneNumber.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
