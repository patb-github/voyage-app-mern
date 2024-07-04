import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ตรวจสอบ user ใน context เมื่อ component mount หรือ user เปลี่ยนแปลง
    setIsLogin(user !== null);
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // ลบข้อมูล user จาก localStorage
    navigate('/');
    console.log(localStorage);
  };

  return (
    <nav className="navbar sticky shadow-xl top-0 z-50 bg-base-100 max-w-screen pr-4">
      <div>
        <Link to="/">
          <button>
            <img
              src="/vovageLogo.png"
              className="btn btn-ghost normal-case text-xl hover:bg-white"
              alt="VoVage Logo"
            />
          </button>
        </Link>
      </div>

      {/* Navbar content based on login status */}
      {isLogin ? (
        // Navbar for logged in users
        <div className="flex justify-end md:justify-end md:gap-2 md:w-[90%] w-full">
          <div className="flex">
            {user?.profileImage ? ( // แสดงรูปโปรไฟล์ถ้ามี
              <img
                src={user.profileImage} // ใช้ URL รูปโปรไฟล์จาก user object
                alt="User Profile"
                className="w-11 h-10 mask mask-squircle mx-2"
              />
            ) : (
              <img
                src="/profile.jpg" // รูปโปรไฟล์ default ถ้าไม่มี
                alt="User Profile"
                className="w-11 h-10 mask mask-squircle mx-2"
              />
            )}
            <div>
              <p className="text-xl font-bold">
                สวัสดี, {user?.firstname || 'ผู้ใช้งาน'}
              </p>
              <p className="text-sm font-semibold text-amber-800">
                เรามีโปรแกรมมากมายสำหรับคุณ
              </p>
            </div>
          </div>

          <details className="dropdown dropdown-end">
            <summary className="btn bg-white hover:bg-white rounded-full">
              {/* Dropdown icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <Link to="/member">Member</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/booking">Booking</Link>
              </li>
              <li className="bg-red-500 text-white rounded-full">
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </ul>
          </details>
        </div>
      ) : (
        // Navbar for not logged in users (or on specific pages)
        <div className="flex justify-end md:justify-end md:gap-2 md:w-[90%] w-full">
          <Link to="/register" className="btn">
            Sign up
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
