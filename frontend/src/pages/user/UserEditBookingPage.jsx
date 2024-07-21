import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faChevronDown,
  faChevronUp,
  faPlane,
  faUser,
  faDollarSign,
  faPercent,
} from '@fortawesome/free-solid-svg-icons';
import { format, addDays } from 'date-fns';
import axiosUser from '../../utils/axiosUser';
import { toast } from 'react-toastify';

const TripAccordion = ({ trip, isOpen, toggleAccordion }) => {
  return (
    <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
      <div
        className="flex justify-between items-center bg-indigo-100 p-4 cursor-pointer"
        onClick={toggleAccordion}
      >
        <h2 className="text-xl font-bold text-indigo-800">{trip.trip.name}</h2>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow-inner mb-4">
            <div className="flex-col flex items-center">
              <p className="font-extrabold text-xl text-indigo-700">
                {trip.trip.destination_from}
              </p>
              <p className="font-bold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 mt-2">
                {format(new Date(trip.departure_date), 'EEE d MMM')}
              </p>
            </div>
            <div className="flex-col flex items-center">
              <FontAwesomeIcon
                icon={faPlane}
                className="text-indigo-500 text-2xl"
              />
              <p className="font-semibold text-red-500 mt-2">
                ({trip.trip.duration_days} days)
              </p>
            </div>
            <div className="flex-col flex items-center">
              <p className="font-extrabold text-xl text-indigo-700">
                {trip.trip.destination_to}
              </p>
              <p className="font-bold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 mt-2">
                {format(
                  addDays(
                    new Date(trip.departure_date),
                    trip.trip.duration_days
                  ),
                  'EEE d MMM'
                )}
              </p>
            </div>
          </div>
          <p className="text-lg font-normal py-4 text-gray-700">
            {trip.trip.description}
          </p>
          <h3 className="text-xl font-bold text-indigo-800 mt-4 mb-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Voyagers
          </h3>
          {trip.travelers.map((traveler, index) => (
            <div key={index} className="border-b border-gray-200 py-2">
              <p className="text-lg">
                Voyager {index + 1}: {traveler.firstName} {traveler.lastName}
              </p>
            </div>
          ))}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-indigo-800 mb-2">
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Trip Cost
            </h3>
            <div className="flex justify-between items-center font-semibold text-gray-700">
              <p className="text-lg">
                {trip.trip.name} x {trip.travelers.length}
              </p>
              <p>$ {trip.trip.price * trip.travelers.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const UserEditBookingPage = () => {
  const [booking, setBooking] = useState(null);
  const [openAccordions, setOpenAccordions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);
  const isCancelled = booking && booking.booking_status === 'cancelled';

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axiosUser.get(`/bookings/details/${bookingId}`);
        setBooking(response.data.booking);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to load booking details');
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const toggleAccordion = (index) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCancelBooking = async () => {
    if (isCancelled) {
      toast.info('This booking has already been cancelled.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setIsCancelling(true);
      try {
        await axiosUser.patch(`/bookings/cancel/${bookingId}`);
        toast.success('Booking cancelled successfully');
        // อัพเดทสถานะการจองในหน้าปัจจุบัน
        setBooking((prev) => ({ ...prev, booking_status: 'cancelled' }));
        // ไม่ต้อง navigate ออกจากหน้านี้ เพื่อให้ผู้ใช้เห็นการเปลี่ยนแปลง
      } catch (error) {
        console.error('Error cancelling booking:', error);
        toast.error('Failed to cancel booking. Please try again.');
      } finally {
        setIsCancelling(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Booking not found
      </div>
    );
  }

  const totalCost = booking.booked_trips.reduce(
    (sum, trip) => sum + trip.trip.price * trip.travelers.length,
    0
  );
  const totalDiscount = booking.coupon ? booking.coupon.discount_amount : 0;
  const finalTotal = totalCost - totalDiscount;

  return (
    <div className="min-h-screen bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-8 lg:px-16">
      <section className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
            Booking Details
          </h1>
        </div>
        <div className="mb-6 bg-indigo-50 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            Booking Summary
          </h2>
          <p className="text-lg">
            <strong>Booking ID:</strong> {booking._id}
          </p>
          <p className="text-lg">
            <strong>Total Trips:</strong> {booking.booked_trips.length}
          </p>
          <p className="text-lg">
            <strong>Booking Date:</strong>{' '}
            {format(new Date(booking.booked_at), 'PPP')}
          </p>
          <p className="text-lg">
            <strong>Status:</strong>{' '}
            <span
              className={`font-bold ${
                isCancelled ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {booking.booking_status.charAt(0).toUpperCase() +
                booking.booking_status.slice(1)}
            </span>
          </p>
        </div>
        {booking.booked_trips.map((trip, index) => (
          <TripAccordion
            key={trip._id}
            trip={trip}
            isOpen={openAccordions.includes(index)}
            toggleAccordion={() => toggleAccordion(index)}
          />
        ))}
        <div className="rounded-xl shadow-lg px-8 py-6 mb-6 bg-white">
          <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Total Payment Information
          </h2>
          <div className="flex justify-between items-center font-semibold text-gray-700">
            <p className="text-lg py-2">Total Package Cost</p>
            <p>$ {totalCost}</p>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between items-center text-green-600 font-semibold">
              <p className="text-lg py-2">
                <FontAwesomeIcon icon={faPercent} className="mr-2" />
                Discount (Coupon: {booking.coupon.code})
              </p>
              <p>$ -{totalDiscount}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl mt-4 text-white">
          <div className="flex flex-col mb-4 sm:mb-0">
            <p className="text-sm font-bold">Total Payment</p>
            <p className="text-3xl font-bold">$ {finalTotal}</p>
          </div>
          {!isCancelled && (
            <button
              onClick={handleCancelBooking}
              disabled={isCancelling}
              className={`btn ${
                isCancelling
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white rounded-full text-xl px-8 py-2 transition duration-300`}
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          )}
          {isCancelled && (
            <p className="text-lg font-bold text-red-300">Booking Cancelled</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UserEditBookingPage;
