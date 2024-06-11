import React, { useState } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: 'user',
    firstName: 'อีลอน',
    lastName: 'มัสค์',
    email: 'elon.inwza555@gmail.com',
    profileImage: '/user/john.jpg',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
