const Header = () => {
  return (
    <nav className="navbar bg-base-100 max-w-screen flex justify-between pr-4 shadow-lg">
      <div>
        <a href="#">
          <img
            src="/vovageLogo.png"
            className="btn btn-ghost normal-case text-xl hover:bg-white"
            alt="VoVage Logo"
          />
        </a>
      </div>

      <div className="flex-none">
        <a href="#" className="items-center mr-4 hidden md:flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="User Profile"
            className="w-11 h-10 mx-4"
          />
          <div>
            <p className="text-xl font-bold">สวัสดี, {name}</p>
            <p className="text-sm font-semibold text-amber-800">
              เรามีโปรแกรมมากมายสำหรับคุณ
            </p>
          </div>
        </a>

        <details className="dropdown dropdown-end">
          <summary className="btn bg-white hover:bg-white rounded-full">
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
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[150px]">
            <li>
              <a href="#">ตะกร้าสินค้า</a>
            </li>
            <li>
              <a href="#">บัญชี</a>
            </li>
            <li>
              <a href="#">ทริปของฉัน</a>
            </li>
            <li>
              <a href="#">ออกจากระบบ</a>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
};

export default Header;
