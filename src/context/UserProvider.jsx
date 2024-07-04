import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ดึงข้อมูล JSON ที่ได้จากการ login (สมมติว่าคุณเก็บไว้ใน localStorage)
    const storedUserJSON = localStorage.getItem('user');

    if (storedUserJSON) {
      const storedUser = JSON.parse(storedUserJSON);
      setUser(storedUser);
    }
  }, []); // ทำงานครั้งเดียวเมื่อ component เริ่มต้น

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
