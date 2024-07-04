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
      if (token) {
        localStorage.setItem('token', token);
      }
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const setUserAndStorage = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  const login = (userData, tokenData) => {
    setUserAndStorage(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUserAndStorage(null);
    setToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: setUserAndStorage,
        token,
        setToken,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
