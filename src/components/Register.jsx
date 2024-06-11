import React from 'react';

const Register = () => {
  return (
    <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')]">
      <section>
        <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('../../assets/bg.svg')]">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
              <div className="text-3xl font-bold text-blue-500 mb-8">
                <p className="drop-shadow-xl">Enjoy the trip with Voyage</p>
              </div>
              <h1 className="text-2xl text-left text-gray-800 font-semibold mb-6">
                New Account
              </h1>
              <div className="relative">
                <input
                  className="w-full p-2 rounded mt-2 outline-none"
                  type="email"
                  placeholder="Email"
                />
                <hr className="absolute bottom-0 z-50 w-full bg-red-500" />
              </div>
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

              <button className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
