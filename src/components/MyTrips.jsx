import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';

function MyTrips() {
  return (
    <section
      className="md:bg-gray-100 md:pb-80"
    >
    {/* md:my-12 md:mx-12 md:rounded-3xl h-[93vh] md:h-[80vh] */}
      <div className="hidden md:flex md:justify-start">
        <p className="text-4xl font-extrabold py-4 pl-[5%]">การจองของฉัน</p>
      </div>
      <ul
        className="menu menu-horizontal bg-white font-bold shadow-lg text-xl 
                   md:w-[90%] md:rounded-xl
                   p-0 [&_li>*]:rounded-none flex m-auto"
        // className="menu menu-horizontal w-full justify-between font-bold shadow-lg text-xl"
      >
        <li className="hover:text-[#5F97FB] flex-grow flex items-center ">
          <a>Upcoming</a>
        </li>
        <li className="hover:text-[#5F97FB] flex-grow flex items-center">
          <a >Completed</a>
        </li>
        <li className="hover:text-[#5F97FB] flex-grow flex items-center">
          <a>Cancelled</a>
        </li>
      </ul>

      {/* Card Section */}
      <div
        className="flex justify-center flex-wrap 
                   md:gap-10 md:justify-start md:mx-[8%] md:mt-11
                   md:border-t md:border-gray-300"
      >
        {/* Card 1 */}
        <a href="#" className="card w-96 h-80 mt-10 shadow-xl relative bg-white">
          <figure>
            <img src="/destination/singapore.jpg" alt="singapore" />
            <div
              className="absolute top-2 left-2 text-white bg-black bg-opacity-30 p-2 rounded-full flex"
            >
              <p>Bangkok</p>
              <img src="/plane.png" className="w-6 mx-4" alt="" />
              <p>Singapore</p>
            </div>
          </figure>
          <div className="card-body flex-row h-24 px-4 py-4">
            <div className="mr-8 w-64">
              <h2 className="card-title text-[#5F97FB]">
                จำนวน Voyager
                <div
                  className="badge badge-secondary rounded-full w-6 h-6 font-bold bg-[#5F97FB] text-xl border-0"
                >
                  2
                </div>
              </h2>
              <h2 className="text-l font-bold">Booking ID : 123456</h2>
            </div>
            <div
              className="rounded-full w-16 h-16 border-solid border-[#5F97FB] border-2 font-bold flex flex-col items-center justify-center text-[#5F97FB]"
            >
              <p className="text-2xl">12</p>
              <p>AUG</p>
            </div>
          </div>
        </a>
        {/* Card 2 */}
        <a href="#" className="card w-96 h-80 mt-10 shadow-xl relative bg-white">
          <figure>
            <img src="/destination/aquarium.jpg" alt="singapore" />
            <div
              className="absolute top-2 left-2 text-white bg-black bg-opacity-30 p-2 rounded-full flex"
            >
              <p>Bangkok</p>
              <img src="/plane.png" className="w-6 mx-4" alt="" />
              <p>Japan</p>
            </div>
          </figure>
          <div className="card-body flex-row h-24 px-4 py-4">
            <div className="mr-8 w-64">
              <h2 className="card-title text-[#5F97FB]">
                จำนวน Voyager
                <div
                  className="badge badge-secondary rounded-full w-6 h-6 font-bold bg-[#5F97FB] text-xl border-0"
                >
                  4
                </div>
              </h2>
              <h2 className="text-l font-bold">Booking ID : 843217</h2>
            </div>
            <div
              className="rounded-full w-16 h-16 border-solid border-[#5F97FB] border-2 font-bold flex flex-col items-center justify-center text-[#5F97FB]"
            >
              <p className="text-2xl">26</p>
              <p>AUG</p>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}

export default MyTrips;