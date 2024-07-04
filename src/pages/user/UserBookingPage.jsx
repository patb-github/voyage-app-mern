import { useState } from 'react';
import classnames from 'classnames';

// Mock data
const mockTrips = [
  {
    id: '1234',
    status: 'Pending',
    bookingDate: new Date('2024-07-01T10:00:00'),
    imageSrc: '/trip-image-1.jpg',
    title: 'Amazing Space Adventure',
    departure: 'Earth',
    departureDate: '2024-08-15',
    destination: 'Mars',
    arrivalDate: '2024-08-20',
    duration: '5 days',
    voyagerCount: 2,
    totalAmount: 500000,
  },
  {
    id: '5678',
    status: 'Completed',
    bookingDate: new Date('2024-06-15T14:30:00'),
    imageSrc: '/trip-image-2.jpg',
    title: 'Lunar Expedition',
    departure: 'Earth',
    departureDate: '2024-07-01',
    destination: 'Moon',
    arrivalDate: '2024-07-03',
    duration: '2 days',
    voyagerCount: 1,
    totalAmount: 300000,
  },
  {
    id: '9012',
    status: 'Cancelled',
    bookingDate: new Date('2024-05-20T09:15:00'),
    imageSrc: '/trip-image-3.jpg',
    title: 'Venus Orbit Tour',
    departure: 'Earth',
    departureDate: '2024-09-10',
    destination: 'Venus Orbit',
    arrivalDate: '2024-09-15',
    duration: '5 days',
    voyagerCount: 3,
    totalAmount: 750000,
  },
];

const tabs = [
  { name: 'Pending', label: 'Pending' },
  { name: 'Completed', label: 'Completed' },
  { name: 'Cancelled', label: 'Cancelled' },
];

function TripStatus({ trip }) {
  let statusText = '';
  let statusStyle = '';

  switch (trip.status) {
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

function UserBookingPage() {
  const [activeTab, setActiveTab] = useState('Pending');

  const filteredTrips = mockTrips.filter(
    (trip) => trip.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <section className="md:bg-gray-100 md:pb-80">
      <div className="hidden md:flex md:justify-start">
        <p className="text-4xl font-bold py-4 pl-[10%]">My Trips</p>
      </div>
      <ul className="menu menu-horizontal bg-white font-bold shadow-lg text-xl md:w-[80%] md:rounded-xl p-0 flex m-auto">
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={classnames(
              'hover:text-[#5F97FB] flex-grow flex items-center',
              { 'text-[#5F97FB]': activeTab === tab.name }
            )}
            onClick={() => setActiveTab(tab.name)}
          >
            <a>{tab.label}</a>
          </li>
        ))}
      </ul>

      <div className="mx-4 md:mx-48 md:mt-11 md:border-t md:border-gray-300 h-[50vh]">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white mt-2 rounded-2xl shadow-md p-6 md:p-6 my-4"
            >
              <TripStatus trip={trip} />
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600 font-bold ">
                  Booking ID: {trip.id}
                </p>
                <p className="text-gray-500 text-sm">
                  จองเมื่อ{' '}
                  {trip.bookingDate.toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  {trip.bookingDate.toLocaleTimeString('th-TH', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  น.
                </p>
              </div>

              <div className="flex flex-col md:flex-row justify-between mb-4">
                <img
                  src={trip.imageSrc}
                  alt={trip.title}
                  className="h-full rounded-xl"
                />

                <div className="w-full md:mx-4">
                  <p className="text-xl font-semibold mb-2 mx-2">
                    {trip.title}
                  </p>
                  <div className="flex justify-between md:justify-center items-center py-4 px-12 md:gap-12">
                    <div className="flex-col flex items-center gap-2">
                      <p className="font-extrabold text-xl">{trip.departure}</p>
                      <p className="font-bold bg-gray-200 rounded-full p-2">
                        {trip.departureDate}
                      </p>
                    </div>
                    <div className="flex-col flex items-center gap-2">
                      <img src="/planeBlue.svg" alt="" />
                      <p className="font-semibold text-red-500">
                        {trip.duration}
                      </p>
                    </div>
                    <div className="flex-col flex items-center gap-2">
                      <p className="font-extrabold text-xl">
                        {trip.destination}
                      </p>
                      <p className="font-bold bg-gray-200 rounded-full p-2">
                        {trip.arrivalDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between mt-4 md:mt-8 px-4 md:px-8">
                    <div className="flex items-center mb-4 md:mb-0">
                      <h2 className="text-2xl text-info p">
                        Number of Voyagers
                      </h2>
                      <div className="w-7 h-7 ml-2 mr-2 rounded-full bg-blue-500 text-white font-bold text-xl flex items-center justify-center">
                        {trip.voyagerCount}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2 md:gap-6 text-2xl md:text-3xl font-bold">
                      <p>Paid amount :</p>
                      <p className="text-gray-800">
                        ฿{trip.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
