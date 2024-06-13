import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from './UserContext';

const Login = () => {
  const { userData, setCurrentUser, setUser } = useContext(UserContext);
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const user = userData.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      setLoginError(false);
      setCurrentUser(user.id);
      setUser(user);
      navigate('/landingPage');
    } else {
      setLoginError(true);
    }
  };
  return (
    <div>
      <section className="Login">
        <div className="h-[370px] md:h-[93vh] bg-center bg-cover md:bg-no-repeat bg-[url('/bg-desktop.png')]">
          <div className="min-h-[93vh] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white min-h-[500px] p-8 rounded-t-3xl md:rounded-3xl shadow-md w-full md:w-96">
              <div className="text-3xl font-bold text-blue-500 mb-8">
                <p className="drop-shadow-xl">Enjoy the trip</p>
                <p className="drop-shadow-xl">with Voyage</p>
              </div>
              <h1 className="text-2xl text-center text-gray-800 font-semibold mb-6">
                Welcome
              </h1>
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Username"
                    {...register('username')}
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow"
                    placeholder="Password"
                    {...register('password')}
                  />
                </label>
                <span
                  className={`text-red-500 text-sm ${
                    loginError ? '' : 'hidden'
                  }`}
                >
                  Username หรือ password ไม่ถูกต้อง
                </span>
                {/* <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-700 mb-8"
                >
                  Forgot Password?
                </a> */}

                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-4 px-4 rounded-full"
                >
                  Sign In
                </button>
              </form>
              <div className="mt-2 text-sm  flex">
                <p> Don't have an account?</p>{' '}
                <Link to="/register">
                  <p className="text-blue-500 hover:text-blue-700">
                    Create one
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
