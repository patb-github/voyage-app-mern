import React, { useState, useEffect, useCallback } from 'react';
import UserContext from './UserContext';
import axiosUser from '../utils/axiosUser';
import { jwtDecode } from 'jwt-decode';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
  });
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    console.log('Logged out, user and token cleared');
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axiosUser.post('/users/refresh-token');
      const newToken = res.data.token;
      setToken(newToken);
      localStorage.setItem('authToken', newToken);
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  const fetchUser = useCallback(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userData = {
          id: decodedToken.id,
          firstname: decodedToken.firstname,
          lastname: decodedToken.lastname,
          email: decodedToken.email,
          dateOfBirth: decodedToken.dateOfBirth,
          country: decodedToken.country,
          phone: decodedToken.phone,
          gender: decodedToken.gender,
          profilePicture: decodedToken.profilePicture,
          isAdmin: decodedToken.isAdmin,
        };
        setUser(userData);
      } catch (error) {
        console.error('Error decoding token:', error);
        logout();
      }
    } else {
      setUser(null);
      console.log('No token, user set to null');
    }
    setIsLoading(false);
  }, [token, logout]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token expired, logging out');
          logout();
        } else {
          fetchUser();
          // ตั้งเวลารีเฟรช token ก่อนหมดอายุ
          const timeUntilRefresh = decodedToken.exp * 1000 - Date.now() - 60000; // รีเฟรชก่อน 1 นาที
          console.log(
            'Setting refresh timeout for:',
            new Date(Date.now() + timeUntilRefresh)
          );
          setTimeout(refreshToken, timeUntilRefresh);
        }
      } catch (error) {
        console.error('Error processing token:', error);
        logout();
      }
    } else {
      setIsLoading(false);
      console.log('No token found, user set to null');
    }
  }, [token, logout, fetchUser]);

  const login = async (data) => {
    try {
      const res = await axiosUser.post('/users/login', data);
      const { token } = res.data;
      if (token) {
        setToken(token);
        localStorage.setItem('authToken', token);
        const decodedToken = jwtDecode(token);
        const user = {
          id: decodedToken.id,
          firstname: decodedToken.firstname,
          lastname: decodedToken.lastname,
          email: decodedToken.email,
          dateOfBirth: decodedToken.dateOfBirth,
          country: decodedToken.country,
          phone: decodedToken.phone,
          gender: decodedToken.gender,
          profilePicture: decodedToken.profilePicture,
          isAdmin: decodedToken.isAdmin,
        };
        setUser(user);
        setLoginError(false);

        return { success: true, isAdmin: user.isAdmin };
      } else {
        setLoginError(true);
        console.log('Login failed: No token received');
        return { success: false };
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(true);
      return { success: false };
    }
  };

  useEffect(() => {}, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        loginError,
        setLoginError,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
