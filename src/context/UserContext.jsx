import React, { createContext, useState } from 'react';

const UserContext = createContext({
  user: null,
  setUser: () => {}, // Placeholder function
});

export default UserContext;
