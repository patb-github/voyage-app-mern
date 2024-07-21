import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { bookingsAtom, activeTabAtom } from '../../atoms/bookingAtoms';
import { fetchBookings } from '../../utils/bookingUtils';
import { useNavigate } from 'react-router-dom';

function TripCard({ trip, isExpanded, onToggle }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold">{trip.title}</h3>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row">
            <img
              src={trip.imageSrc}
              alt={trip.title}
              className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-4"
            />
            <div className="flex-1">
              <p>
                <span className="font-semibold">From:</span> {trip.departure}
              </p>
              <p>
                <span className="font-semibold">To:</span> {trip.destination}
              </p>
              <p>
                <span className="font-semibold">Duration:</span> {trip.duration}
              </p>
              <p>
                <span className="font-semibold">Voyagers:</span>{' '}
                {trip.voyagerCount}
              </p>
              <p className="text-right mt-2 font-semibold">
                Amount: ${trip.amount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingStatus({ status }) {
  let statusText = '';
  let statusStyle = '';

  switch (status) {
    case 'pending':
      statusText = 'Awaiting for payment';
      statusStyle = 'bg-yellow-400 text-yellow-800';
      break;
    case 'completed':
      statusText = 'Payment completed';
      statusStyle = 'bg-green-400 text-white';
      break;
    case 'cancelled':
      statusText = 'Canceled';
      statusStyle = 'bg-red-400 text-white';
      break;
    default:
      statusText = 'Unknown';
      statusStyle = 'bg-gray-200 text-gray-800';
      break;
  }

  return (
    <span
      className={`py-1 px-2 rounded-full text-sm font-semibold ${statusStyle}`}
    >
      {statusText}
    </span>
  );
}

function UserBookingPage() {
  const [bookings, setBookings] = useAtom(bookingsAtom);
  const [activeTab, setActiveTab] = useAtom(activeTabAtom);
  const [expandedTrips, setExpandedTrips] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedBookings = await fetchBookings(activeTab);
        const sortedBookings = fetchedBookings.sort(
          (a, b) => new Date(b.booked_at) - new Date(a.booked_at)
        );
        setBookings(sortedBookings);
      } catch (err) {
        setError('Failed to fetch bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getBookings();
  }, [activeTab, setBookings]);

  const toggleTripExpansion = (bookingId, tripId) => {
    setExpandedTrips((prev) => ({
      ...prev,
      [`${bookingId}-${tripId}`]: !prev[`${bookingId}-${tripId}`],
    }));
  };

  const calculateTotalAmount = (booking) => {
    const tripTotal = booking.booked_trips.reduce(
      (total, trip) => total + trip.trip.price * trip.travelers.length,
      0
    );
    const discountAmount = booking.coupon ? booking.coupon.discount_amount : 0;
    return tripTotal - discountAmount;
  };

  const tabs = [
    { name: 'pending', label: 'Pending' },
    { name: 'completed', label: 'Completed' },
    { name: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <section className="bg-gray-100 min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Bookings</h1>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <ul className="flex">
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`flex-1 text-center ${
                  activeTab === tab.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                <button
                  className="w-full py-4 px-6 text-lg font-semibold focus:outline-none transition duration-300 ease-in-out"
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading bookings...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <BookingStatus status={booking.booking_status} />
                  <p className="text-sm text-gray-500">
                    Booking time{' '}
                    {new Date(booking.booked_at).toLocaleDateString('en-EN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    {new Date(booking.booked_at).toLocaleTimeString('en-EN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                  </p>
                </div>
                <p className="text-gray-600 font-semibold mb-4">
                  Booking ID: {booking._id}
                </p>
                <div className="mb-6">
                  <p className="text-2xl font-bold text-gray-800">
                    Total Amount: ${calculateTotalAmount(booking)}
                  </p>
                  <p className="text-gray-600">
                    Number of Trips: {booking.booked_trips.length}
                  </p>
                </div>
                {booking.booked_trips.map((trip) => (
                  <TripCard
                    key={trip._id}
                    trip={{
                      id: trip._id,
                      imageSrc: trip.trip.image,
                      title: trip.trip.name,
                      departure: trip.trip.destination_from,
                      destination: trip.trip.destination_to,
                      duration: `${trip.trip.duration_days} days`,
                      voyagerCount: trip.travelers.length,
                      amount: trip.trip.price * trip.travelers.length,
                    }}
                    isExpanded={expandedTrips[`${booking._id}-${trip._id}`]}
                    onToggle={() => toggleTripExpansion(booking._id, trip._id)}
                  />
                ))}
                {booking.coupon && (
                  <p className="text-green-600 mt-2">
                    Coupon applied: {booking.coupon.code} ($
                    {booking.coupon.discount_amount} discount)
                  </p>
                )}
                <p className="text-gray-500 text-sm mt-4 mb-6">
                  We recommend you arrive at the airport at least 2 hours before
                  departure to allow ample time for check-in.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    onClick={() => navigate(`/booking-edit/${booking._id}`)}
                  >
                    Booking Detail
                  </button>
                  {booking.booking_status !== 'completed' &&
                    booking.booking_status !== 'cancelled' && (
                      <button
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                        onClick={() => navigate(`/payment/${booking._id}`)}
                      >
                        Pay Now
                      </button>
                    )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <img
                src="/female-guide.webp"
                alt=""
                className="w-1/2 mx-auto mb-6"
              />
              <p className="text-xl font-semibold text-gray-600">
                No adventures in this status yet! Let's find you a new one to
                get excited about.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default UserBookingPage;
