import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../context/UserContext';
import axios from 'axios';

const UserDashboardPage = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGender, setSelectedGender] = useState(''); // State สำหรับ gender

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      });
      setSelectedGender(user.gender || ''); // ตั้งค่าเริ่มต้นให้กับ selectedGender
    }
  }, [user, reset]);

  useEffect(() => {
    register('gender', { value: selectedGender });
  }, [register, selectedGender]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result);
      reader.readAsDataURL(file);
    }
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

    // เพิ่มเฉพาะฟิลด์ที่มีการเปลี่ยนแปลง
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key] === user[key]) {
        delete updatedFields[key];
      }
    });

    if (selectedImage) {
      updatedFields.profileImage = selectedImage;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/profile/${user.id}`,
        updatedFields
      );
      setUser(response.data);
      console.log('Updated user data:', response.data);
      // สามารถเพิ่มการแจ้งเตือนด้วยวิธีอื่นๆ ได้ตามต้องการ เช่น alert หรือ component แสดงข้อความ
    } catch (error) {
      console.error('Error updating user data:', error);
      // สามารถเพิ่มการแจ้งเตือนด้วยวิธีอื่นๆ ได้ตามต้องการ
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-100 md:h-screen">
      <div className="md:mr-6">
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
                  value={selectedGender} // ใช้ selectedGender ใน value
                  onChange={(e) => setSelectedGender(e.target.value)} // อัพเดต selectedGender เมื่อมีการเปลี่ยนแปลง
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
                      required: 'กรุณากรอกเบอร์โทรศัพท์',
                      pattern: {
                        value: /^\d{9}$/,
                        message: 'เบอร์โทรศัพท์ต้องมี 9 ตัวเลข',
                      },
                    })}
                    className="flex-grow px-3 py-2 border border-l-0 rounded-r-md"
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
                  <span className="text-red-500">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium">E-mail</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled
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
