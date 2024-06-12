import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react'; // นำเข้า useContext
import UserContext from './UserContext';
const Header = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const showProfileAndMenu =
    location.pathname !== '/' && location.pathname !== '/register';
  const showProfileAndMenu2 =
    location.pathname == '/' || location.pathname == '/register';
  return (
    <nav className="navbar  top-0 z-50  bg-base-100 max-w-screen  pr-4 ">
      <div>
        <Link to="/">
          <img
            src="/vovageLogo.png"
            className="btn btn-ghost normal-case hidden md:block text-xl hover:bg-white"
            alt="VoVage Logo"
          />
        </Link>
      </div>
      <div>
        {showProfileAndMenu2 && (
          <Link to="/landingpage">
            <img
              src="/vovageLogo.png"
              className="btn btn-ghost normal-case md:hidden text-xl hover:bg-white"
              alt="VoVage Logo"
            />
          </Link>
        )}
      </div>
      {showProfileAndMenu && (
        <div className="flex justify-between md:justify-end md:gap-2 md:w-[90%] w-full  ">
          <div className="flex ">
            <img
              src={user.profileImage}
              alt="User Profile"
              className="w-11 h-10  mask mask-squircle mx-2"
            />
            <div>
              <p className="text-xl font-bold">สวัสดี, {user.firstName}</p>
              <p className="text-sm font-semibold text-amber-800">
                เรามีโปรแกรมมากมายสำหรับคุณ
              </p>
            </div>
          </div>

          <div className="dropdown dropdown-hover dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-white hover:bg-white rounded-full"
            >
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
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/userData">บัญชี</Link>
              </li>
              <li>
                <Link to="/cart">ตะกร้าสินค้า</Link>
              </li>
              <li>
                <Link to="/">ทริปของฉัน</Link>
              </li>
              <li className="bg-red-500 text-white rounded-full">
                <Link to="/">ออกจากระบบ</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
