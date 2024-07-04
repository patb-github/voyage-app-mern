import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { format, addDays } from 'date-fns';

const UserEditBookingPage = () => {
  const departureDate = new Date(2024, 4, 9); // May 9, 2024

  return (
    <div className="min-h-screen  bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold pt-8 pb-10 text-indigo-700">
            Booking Details
          </h1>
        </div>
        <div className="md:flex md:pb-6">
          <div className="hidden md:block px-16 md:w-1/2 border-r border-gray-200">
            <img
              src="/destination/aquarium.jpg"
              alt="Okinawa Aquarium"
              className="rounded-3xl shadow-lg"
            />
            <p className="text-lg font-normal py-4 text-gray-700">
              Okinawa 4 Days 3 Nights Package including flights, accommodation,
              restaurants, and Churaumi Aquarium tickets. 24/7 personal
              assistant service from start to finish. Package for 1 person.{' '}
              <strong className="text-indigo-600">
                Click to read more terms and conditions
              </strong>
            </p>
          </div>
          <div className="md:w-1/2 md:px-10">
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-gradient-to-r from-indigo-50 to-blue-50">
              <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                Japan Trip: Okinawa, Shuri Castle, Churaumi Aquarium, Okinawa
                World
              </h2>
              <div className="mb-4 relative"></div>
              <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md">
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-indigo-700">
                    Bangkok
                  </p>
                  <p className="font-bold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 mt-2">
                    {format(departureDate, 'EEE d MMM')}
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <img
                    src="/planeBlue.svg"
                    alt="Plane icon"
                    className="w-10 h-10"
                  />
                  <p className="font-semibold text-red-500 mt-2">
                    (4 Days 3 Nights)
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-indigo-700">
                    Okinawa
                  </p>
                  <p className="font-bold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 mt-2">
                    {format(addDays(departureDate, 3), 'EEE d MMM')}
                  </p>
                </div>
              </div>
              <button className="flex mt-4 text-lg text-indigo-600 items-center">
                <span>Read full program details</span>
                <span className="text-2xl ml-2">&#8227;</span>
              </button>
              <button className="flex mt-2 text-lg text-indigo-600 items-center">
                <span>Policy | Things to know before traveling</span>
                <span className="text-2xl ml-2">&#8227;</span>
              </button>
            </div>
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
              <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                Voyagers
              </h2>
              <div className="border-b border-gray-200 py-3">
                <p className="text-lg">Voyager 1: John Doe</p>
              </div>
              <div className="border-b border-gray-200 py-3">
                <p className="text-lg">Voyager 2: Jane Smith</p>
              </div>
            </div>
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
              <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                Payment Information
              </h2>
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <p className="text-lg py-2">Package Okinawa A x 2</p>
                <p>฿ 59,900</p>
              </div>
              <div className="flex justify-between items-center text-red-600 font-semibold">
                <p className="text-lg py-2">Room Discount</p>
                <p>฿ -7,500</p>
              </div>
            </div>

            <div className="flex justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl mt-4 text-white">
              <div className="flex flex-col">
                <p className="text-sm font-bold">Total Payment</p>
                <p className="text-3xl font-bold">฿ 52,400</p>
              </div>
              <button className="btn bg-red-500 hover:bg-red-600 text-white rounded-full text-xl px-8 transition duration-300">
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserEditBookingPage;
