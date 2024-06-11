import React, { createContext, useState } from 'react';

const UserContext = createContext({
  user: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  },
  setUser: () => {},
});

export default UserContext;
