import { useState } from 'react';

// ปรับปรุง Mock data ให้มีการจองหลายทริปในครั้งเดียว
const mockBookings = [
  {
    bookingId: 'B001',
    status: 'Pending',
    bookingDate: new Date('2024-07-01T10:00:00'),
    totalAmount: 5200, // ปรับราคาเป็น USD ที่สมเหตุสมผล
    trips: [
      {
        id: '1234',
        imageSrc: '/trip-image-1.jpg',
        title: 'Exotic Bali Getaway',
        departure: 'Bangkok (BKK)',
        departureDate: '2024-08-15',
        destination: 'Bali (DPS)',
        arrivalDate: '2024-08-20',
        duration: '5 days',
        voyagerCount: 2,
        amount: 2000,
      },
      {
        id: '5678',
        imageSrc: '/trip-image-2.jpg',
        title: 'Enchanting Kyoto Exploration',
        departure: 'Bangkok (BKK)',
        departureDate: '2024-07-01',
        destination: 'Kyoto (KIX)',
        arrivalDate: '2024-07-03',
        duration: '2 days',
        voyagerCount: 1,
        amount: 1200,
      },
      {
        id: '9012',
        imageSrc: '/trip-image-3.jpg',
        title: 'Romantic Paris Escape',
        departure: 'Bangkok (BKK)',
        departureDate: '2024-09-10',
        destination: 'Paris (CDG)',
        arrivalDate: '2024-09-15',
        duration: '5 days',
        voyagerCount: 2,
        amount: 2000,
      },
    ],
  },
];

const tabs = [
  { name: 'Pending', label: 'Pending' },
  { name: 'Completed', label: 'Completed' },
  { name: 'Cancelled', label: 'Cancelled' },
];

function BookingStatus({ status }) {
  let statusText = '';
  let statusStyle = '';

  switch (status) {
    case 'Pending':
      statusText = 'Awaiting for payment';
      statusStyle = 'badge badge-warning';
      break;
    case 'Completed':
      statusText = 'Payment completed';
      statusStyle = 'badge badge-info';
      break;
    case 'Cancelled':
      statusText = 'Canceled';
      statusStyle = 'badge badge-error';
      break;
    default:
      statusText = 'Unknown';
      break;
  }

  return <p className={`py-1 px-2 rounded ${statusStyle}`}>{statusText}</p>;
}

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
              <div className="flex justify-between items-center mb-2">
                <p>
                  <span className="font-semibold">From:</span> {trip.departure}
                </p>
                <p>
                  <span className="font-semibold">To:</span> {trip.destination}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>
                  <span className="font-semibold">Departure:</span>{' '}
                  {trip.departureDate}
                </p>
                <p>
                  <span className="font-semibold">Arrival:</span>{' '}
                  {trip.arrivalDate}
                </p>
              </div>
              <p>
                <span className="font-semibold">Duration:</span> {trip.duration}
              </p>
              <p>
                <span className="font-semibold">Voyagers:</span>{' '}
                {trip.voyagerCount}
              </p>
              <p className="text-right mt-2 font-semibold">
                Amount: ${trip.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function UserBookingPage() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [expandedTrips, setExpandedTrips] = useState({});

  const filteredBookings = mockBookings.filter(
    (booking) => booking.status.toLowerCase() === activeTab.toLowerCase()
  );

  const toggleTripExpansion = (bookingId, tripId) => {
    setExpandedTrips((prev) => ({
      ...prev,
      [`${bookingId}-${tripId}`]: !prev[`${bookingId}-${tripId}`],
    }));
  };

  return (
    <section className="md:bg-gray-100 md:pb-80">
      <div className="hidden md:flex md:justify-start">
        <p className="text-4xl font-bold py-4 pl-[10%]">My Bookings</p>
      </div>
      <ul className="menu menu-horizontal bg-white font-bold shadow-lg text-xl md:w-[80%] md:rounded-xl p-0 flex m-auto">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={`hover:text-[#5F97FB] flex-grow flex items-center ${
              activeTab === tab.name ? 'text-[#5F97FB]' : ''
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <a>{tab.label}</a>
          </li>
        ))}
      </ul>

      <div className="mx-4 md:mx-48 md:mt-11 md:border-t md:border-gray-300">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white mt-2 rounded-2xl shadow-md p-6 md:p-6 my-4"
            >
              <BookingStatus status={booking.status} />
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600 font-bold">
                  Booking ID: {booking.bookingId}
                </p>
                <p className="text-gray-500 text-sm">
                  จองเมื่อ{' '}
                  {booking.bookingDate.toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  {booking.bookingDate.toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  น.
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xl font-semibold">
                  Total Amount: ${booking.totalAmount.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  Number of Trips: {booking.trips.length}
                </p>
              </div>
              {booking.trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isExpanded={expandedTrips[`${booking.bookingId}-${trip.id}`]}
                  onToggle={() =>
                    toggleTripExpansion(booking.bookingId, trip.id)
                  }
                />
              ))}
              <p className="text-gray-500 text-sm mt-4">
                We recommend you arrive at the airport at least 2 hours before
                departure to allow ample time for check-in.
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img src="/female-guide.webp" alt="" className="w-1/2" />
            <p className="items-center text-center just text-xl font-semibold ">
              No adventures in this status yet! Let's find you a new one to get
              excited about.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default UserBookingPage;
