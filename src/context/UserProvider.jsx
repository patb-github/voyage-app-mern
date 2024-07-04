import { useState, useEffect } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);

  const [userData, setUserData] = useState([
    {
      id: 1,
      username: 'user',
      password: 'user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.doe@gmail.com',
      profileImage: '/user/john.jpg',
      cart: [
        {
          id: 1,
          title:
            'แพ็คเกจเที่ยว สิงคโปร์ พร้อมที่พัก 3 วัน 2 คืน + Universal Studio Singapore',
          imageSrc: '/destination/universal.jpg',
          departure: 'กรุงเทพ',
          departureDate: 'พฤ 15 พ.ค.',
          destination: 'สิงคโปร์',
          arrivalDate: 'อา 17 พ.ค.',
          duration: '(3 วัน 2 คืน)',
          voyagerCount: 1,
          total: 16990,
          isChecked: false,
        },
      ],
      orders: [
        {
          orderId: 'VO24044442',
          OrderOriginalPrice: 16990,
          OrderDiscount: 0,
          OrderTotal: 16990,
          OrderItems: [
            {
              id: 1,
              title:
                'แพ็คเกจเที่ยว สิงคโปร์ พร้อมที่พัก 3 วัน 2 คืน + Universal Studio Singapore',
              imageSrc: '/destination/universal.jpg',
              departure: 'กรุงเทพ',
              departureDate: 'พฤ 15 พ.ค.',
              destination: 'สิงคโปร์',
              arrivalDate: 'อา 17 พ.ค.',
              duration: '(3 วัน 2 คืน)',
              voyagerCount: 1,
              total: 16990,
              isChecked: true,
            },
          ],
          orderStatus: 'Cancelled',
          OrderDate: '2024-06-13T15:15:45.001Z',
        },
      ],
    },
    {
      id: 2,
      username: 'user2',
      password: 'user2',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'Jane.doe@gmail.com',
      profileImage: '/user/jane.png',
      cart: [],
    },
  ]);

  useEffect(() => {
    if (currentUser) {
      const user = userData.find((u) => u.id === currentUser);
      setUser(user);
    } else {
      setUser(null);
    }
  }, [currentUser, userData]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [currentUser, userData]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentUser,
        setCurrentUser,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
