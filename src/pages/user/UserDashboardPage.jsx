import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const UserDashboardPage = () => {
  const [user, setUser] = useState({
    firstName: 'Nattakit',
    lastName: 'Rattanakeha',
    gender: '',
    dateOfBirth: '',
    country: 'Thailand',
    phoneNumber: '0635262566',
    email: 'Inlattakit.smile@gmail.com',
    profileImage: './user/john.jpg',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setUser({ ...data, profileImage: selectedImage || user.profileImage });
    console.log('Updated user data:', {
      ...data,
      profileImage: selectedImage || user.profileImage,
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 md:h-screen">
      <div className=" md: mr-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <img
            src={selectedImage || user.profileImage}
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
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>
      <div className="pt-4 md:w-3/4 md:pt-0">
        <div className="bg-white rounded-lg p-6 shadow">
          <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  First name*
                </label>
                <input
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
                <label className="block mb-2 text-sm font-medium">
                  Last name*
                </label>
                <input
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
                <label className="block mb-2 text-sm font-medium">Gender</label>
                <select
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
                <label className="block mb-2 text-sm font-medium">
                  Date of birth
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Phone number*
                </label>
                <div className="flex">
                  <select className="w-20 px-3 py-2 border rounded-l-md">
                    <option>+66</option>
                  </select>
                  <input
                    type="tel"
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
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  E-mail*
                </label>
                <input
                  type="email"
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
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
