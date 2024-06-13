import { useState, useEffect } from 'react';
import UserContext from './UserContext';

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // เพิ่ม isLoading state

  const userData = [
    {
      id: 1,
      username: 'user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.doe@gmail.com',
      profileImage: '/user/john.jpg',
    },
    {
      id: 2,
      username: 'user2',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'Jane.doe@gmail.com',
      profileImage: '/user/jane.jpg',
    },
  ];

  console.log(user);
  const fetchUser = (userId) => {
    setIsLoading(true); // เริ่มการโหลด
    const user = userData.find((u) => u.id === userId);
    if (user) {
      setUser(user);
      setCurrentUser(userId); // อัปเดต currentUser ด้วย
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    setIsLoading(false); // สิ้นสุดการโหลด
  };
  useEffect(() => {
    // เมื่อ component เริ่มทำงาน ให้ลองดึงข้อมูล user จาก Session Storage
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
    } else {
      setUser(userData[currentUser - 1]);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // เมื่อ user เปลี่ยนแปลง ให้บันทึก user ลง Session Storage
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        currentUser,
        setCurrentUser,
        isLoading,
        fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
