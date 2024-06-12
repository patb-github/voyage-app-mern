import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Payment = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <section className="PaymentSuccess">
        <div className="h-[370px] md:h-[93vh] bg-center bg-cover md:bg-auto md:bg-no-repeat   bg-[url('/bg-desktop.png')]">
          <div className="px-8 py-8 drop-shadow-xl md:hidden font-bold text-3xl text-white mb-8 "></div>

          <div className="min-h-[75vh] flex flex-col items-center justify-end md:justify-center">
            <div className="bg-white min-h-[500px] px-16 py-10  rounded-t-3xl md:rounded-3xl shadow-md w-full  md:w-96">
              <div className="text-3xl text-center font-bold text-blue-500 md:mb-8">
                <p className="drop-shadow-xl hidden md:block">Thank You!</p>
              </div>
              <span className="text-xl text-center text-gray-800 font-bold">
                <p>Payment done Successfully</p>
              </span>
              <p className="mt-2 text-gray-500 text-center">
                You will be redirected to the home page shortly or click here to
                return to homepage
              </p>

              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2">
                Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
