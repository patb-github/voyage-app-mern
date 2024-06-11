import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../components/UserContext';

// InputField component
const InputField = ({ label, name, value, onChange, disabled = false }) => (
  <div className="flex flex-col md:flex-row gap-1">
    <p className="text-xl md:w-[15%] md:self-center">{label}</p>
    <div className="flex justify-between md:w-[85%]">
      <input
        type="text"
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={name}
        className="border-2 border-gray-300 rounded-md text-xl p-1 inline-block w-[90%]"
      />
      {!disabled && (
        <a href="#" className="inline">
          <img src="/pencil.svg" alt="Edit" />
        </a>
      )}
    </div>
  </div>
);

const UserData = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const [profileImage, setProfileImage] = useState(user.profileImage);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setProfileImage(user.profileImage);
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Handle file upload to server if needed
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      ...formData,
      profileImage,
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:p-16 bg-gray-100 justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex content-center justify-center md:justify-start md:px-12">
          <p className="text-xl md:text-4xl font-extrabold py-4">
            แก้ไขโปรไฟล์
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 pb-2 md:px-12 md:py-6">
          <figure className="w-40 mask mask-squircle">
            <img src={profileImage} alt="User Potrait" />
          </figure>
          <label className="form-control w-full max-w-xs ">
            <div className="label">
              <span className="label-text">อัพโหลดรูปภาพ</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered bg w-full max-w-xs"
              onChange={handleImageChange}
            />
            <div className="label"></div>
          </label>
        </div>

        <div className="pl-12 pr-8 pb-6 md:pb-12 flex flex-col gap-2 md:gap-4">
          <div className="flex content-center justify-center md:justify-start">
            <p className="text-lg md:text-2xl font-extrabold">
              ข้อมูลผู้ใช้งาน
            </p>
          </div>

          <InputField
            label="ชื่อผู้ใช้"
            name="username"
            value={user.username}
            disabled
          />
          <InputField
            label="ชื่อ"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            label="นามสกุล"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            label="อีเมล"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-auto">
          <div className="shadow-md h-2 md:shadow-none z-10 relative"></div>
          <div className="flex content-center gap-5 bg-white md:bg-transparent md:w-full justify-center py-3 md:pt-12">
            <button
              type="submit"
              className="btn rounded-full mt-4 bg-[#5F97FB] text-white text-xl"
            >
              อัพเดตการเปลี่ยนแปลง
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserData;
