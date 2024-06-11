import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div>
      <section className="Login">
        <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')]">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <div className="text-3xl font-bold text-blue-500 mb-8">
                <p className="drop-shadow-xl">Enjoy the trip with Voyage</p>
              </div>
              <h1 className="text-2xl text-center text-gray-800 font-semibold mb-6">
                Welcome
              </h1>
              <div className="relative">
                <input
                  className="w-full p-2 rounded mt-2 outline-none"
                  type="text"
                  placeholder="Username"
                />
                <hr className="absolute bottom-0 z-50 w-full bg-red-500" />
              </div>
              <div className="relative">
                <input
                  className="w-full p-2 rounded mt-2 outline-none"
                  type="password"
                  placeholder="Password"
                />
                <hr className="absolute bottom-0 z-50 w-full bg-red-500" />
              </div>
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-700 float-right mb-8 pt-4"
              >
                Forgot Password?
              </a>
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign In
              </button>
              <p className="mt-8 text-sm text-center text-gray-600">
                Don’t have an account?
                <Link to="/register">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Create one
                  </a>
                </Link>
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <a href="#" className="text-blue-800">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-red-500">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="text-gray-800">
                  <i className="fab fa-apple"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
