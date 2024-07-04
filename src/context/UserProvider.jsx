import React, { useState, useEffect } from 'react';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUserJSON = localStorage.getItem('user');
    return storedUserJSON ? JSON.parse(storedUserJSON) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token); // เก็บ token ด้วย
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // ลบ token เมื่อ logout
    }
  }, [user, token]); // เพิ่ม token ใน dependency array

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, token, setToken, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
