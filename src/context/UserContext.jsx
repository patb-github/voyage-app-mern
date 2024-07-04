import React, { createContext } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {},
  token: null, // เพิ่ม token ใน context
  setToken: () => {}, // เพิ่ม setToken ใน context
  login: () => {},
  logout: () => {},
});

export default UserContext;
