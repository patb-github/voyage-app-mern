import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faStar,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, Navigate } from 'react-router-dom';
import { allTrips, getTripByName } from '../../assets/allTrips';
import UserContext from '../../context/UserContext';

const ContentHead = ({ trip }) => {
  return (
    <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-gradient-to-r from-indigo-50 to-blue-50">
      <h2 className="text-2xl font-extrabold py-4 text-indigo-800">New York Adventure: Statue of Liberty, Broadway, The Peninsula New York</h2>
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md">
        <div className="flex-col flex items-center">
          <p className="font-extrabold text-xl text-indigo-700">Your City</p>
        </div>
        <div className="flex-col flex items-center">
          <img src="/planeBlue.svg" alt="Plane icon" className="w-10 h-10" />
          <p className="font-semibold text-red-500 mt-2">(5 Days 4 Nights)</p>
        </div>
        <div className="flex-col flex items-center">
          <p className="font-extrabold text-xl text-indigo-700">New York</p>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLocationDot} className="text-red-500 mr-2" />
          <p>New York, USA</p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
          <p>4.8 (1,234 reviews)</p>
        </div>
      </div>
      <button className="flex mt-4 text-lg text-indigo-600 items-center hover:underline">
        <span>Read full program details</span>
        <span className="text-2xl ml-2">&#8227;</span>
      </button>
      <button className="flex mt-2 text-lg text-indigo-600 items-center hover:underline">
        <span>Policy | Things to know before traveling</span>
        <span className="text-2xl ml-2">&#8227;</span>
      </button>
    </div>
  );
};

const ProductDetails = ({ trip }) => {
  return (
    <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
      <h2 className="text-2xl font-extrabold py-4 text-indigo-800">Package Details</h2>
      <p className="text-lg font-normal py-4 text-gray-700">
        New York, USA 5 Days 4 Nights package including flights, accommodation, restaurants, and Statue of Liberty tickets. Watch a world-class Broadway show. 24/7 personal assistant service from start to finish. Package for 1 person.
      </p>
      <ul>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <p className="text-lg font-normal">Round-trip flight tickets</p>
          <p className="text-lg font-normal">$35,000</p>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <p className="text-lg font-normal">The Peninsula New York 5 Days 4 Nights with breakfast</p>
          <p className="text-lg font-normal">$40,700</p>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <p className="text-lg font-normal">Statue of Liberty tickets</p>
          <p className="text-lg font-normal">$1,700</p>
        </li>
        <li className="flex justify-between py-2 border-b border-gray-200">
          <p className="text-lg font-normal">Airport transfer and 24/7 personal assistant service</p>
          <p className="text-lg font-normal">Included</p>
        </li>
      </ul>
    </div>
  );
};

const UserProductPage = () => {
  const [showMedal, setShowMedal] = useState(false);
  const { user, setUserData } = useContext(UserContext);
  const { tripname } = useParams();
  const trip = getTripByName(allTrips, tripname);
  if (trip === null) {
    return <Navigate to="/error" />;
  }

  const handleBooking = () => {
    // Add booking logic here
    setShowMedal(true);
    setTimeout(() => setShowMedal(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold pt-8 pb-10 text-indigo-700">
            Booking Details
          </h1>
        </div>
        <div className="md:flex md:pb-6">
          {/* Full-screen image for mobile */}
          <div className="md:hidden">
            <img
              src={trip.imageSrc}
              alt={trip.title}
              className="w-full h-screen object-cover"
            />
          </div>
          
          {/* Desktop layout */}
          <div className="hidden md:block md:w-1/2 px-16 border-r border-gray-200">
            <img
              src={trip.imageSrc}
              alt={trip.title}
              className="rounded-3xl shadow-lg transform hover:scale-105 transition duration-300"
            />
            <p className="text-lg font-normal py-4 text-gray-700">
              {trip.description}
            </p>
          </div>
          <div className="md:w-1/2 md:px-10">
            <ContentHead trip={trip} />
            <ProductDetails trip={trip} />
            <div className="flex justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl mt-4 text-white">
              <div className="flex flex-col">
                <p className="text-sm font-bold">Total Payment</p>
                <p className="text-3xl font-bold">$77,400</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="btn bg-white text-indigo-700 hover:bg-indigo-100 rounded-full px-4 transition duration-300 flex items-center"
                  onClick={handleBooking}
                >
                  <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showMedal && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
          Booking initiated
        </div>
      )}
    </div>
  );
};

export default UserProductPage;