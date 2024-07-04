import { createContext } from 'react';

const UserContext = createContext({
  user: {
    first_name: '',
    last_name: '',
    email: '',
    image: '',
    user_coupons: [],
    isAdmin: false,
  },
  setUser: (user) => {},
});

export default UserContext;
