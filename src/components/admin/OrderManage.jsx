import React, { useState, useEffect } from 'react';
import axiosUser from '../../utils/axiosUser';
import { useForm } from 'react-hook-form';
import { FaSearch, FaSort } from 'react-icons/fa';

function OrderManage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingUser, setBookingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterAndSortBookings();
  }, [bookings, searchTerm, sortCriteria, sortOrder]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axiosUser.get('/bookings');
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch bookings');
      setLoading(false);
      console.error('Error fetching bookings:', err);
    }
  };

  const filterAndSortBookings = () => {
    let filtered = bookings.filter(
      (booking) =>
        booking._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.booked_trips[0]?.travelers[0]?.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.booked_trips[0]?.travelers[0]?.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      if (sortCriteria === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.booked_at) - new Date(b.booked_at)
          : new Date(b.booked_at) - new Date(a.booked_at);
      } else if (sortCriteria === 'amount') {
        return sortOrder === 'asc'
          ? a.final_amount - b.final_amount
          : b.final_amount - a.final_amount;
      }
      return 0;
    });

    setFilteredBookings(filtered);
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axiosUser.get(`/users/${userId}`);
      setBookingUser(response.data);
    } catch (err) {
      console.error('Error fetching user details:', err);
      setBookingUser(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleBookingClick = async (booking) => {
    setSelectedBooking(booking);
    await fetchUserDetails(booking.user_id);
    document.getElementById('booking-modal').showModal();
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axiosUser.patch(`/bookings/cancel/${bookingId}`);
      fetchBookings();
      setShowCancelConfirm(false);
      document.getElementById('booking-modal').close();
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-3xl font-bold mb-6 text-center">Manage Orders</h3>

      {/* Search and Sort Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search by ID or Name"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2">
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
            <button
              className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition duration-300"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <FaSort
                className={`transform ${
                  sortOrder === 'asc' ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-white">
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Booked At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{booking._id}</td>
                <td className="px-4 py-2">
                  {booking.booked_trips[0]?.travelers[0]?.firstName}{' '}
                  {booking.booked_trips[0]?.travelers[0]?.lastName}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.booking_status === 'completed'
                        ? 'bg-green-300 text-green-800'
                        : booking.booking_status === 'cancelled'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-300 text-yellow-800'
                    }`}
                  >
                    {booking.booking_status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  ${booking.final_amount.toFixed(2)}
                </td>
                <td className="px-4 py-2">{formatDate(booking.booked_at)}</td>
                <td className="px-4 py-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => handleBookingClick(booking)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      <dialog id="booking-modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl bg-white rounded-lg shadow-2xl">
          <button
            onClick={() => {
              document.getElementById('booking-modal').close();
              setShowCancelConfirm(false);
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-2xl mb-6">Booking Details</h3>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="font-semibold">{selectedBooking._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      selectedBooking.booking_status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : selectedBooking.booking_status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedBooking.booking_status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold">
                    ${selectedBooking.final_amount.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked At</p>
                  <p className="font-semibold">
                    {formatDate(selectedBooking.booked_at)}
                  </p>
                </div>
              </div>

              {bookingUser && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Booking User</h4>
                  <p>
                    <strong>Name:</strong> {bookingUser.firstname}{' '}
                    {bookingUser.lastname}
                  </p>
                  <p>
                    <strong>Email:</strong> {bookingUser.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {bookingUser.phone}
                  </p>
                </div>
              )}

              <h4 className="font-semibold text-xl mt-6 mb-2">Booked Trips</h4>
              {selectedBooking.booked_trips.map((trip, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h5 className="font-semibold text-lg mb-2">
                    {trip.trip.name}
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Departure:</strong>{' '}
                      {formatDate(trip.departure_date)}
                    </p>
                    <p>
                      <strong>Price:</strong> ${trip.trip.price}
                    </p>
                  </div>
                  <p className="mt-2">
                    <strong>Travelers:</strong>
                  </p>
                  <ul className="list-disc pl-5">
                    {trip.travelers.map((traveler, idx) => (
                      <li key={idx}>
                        {traveler.firstName} {traveler.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {selectedBooking.coupon && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Coupon Applied</h4>
                  <p>
                    <strong>Code:</strong> {selectedBooking.coupon.code}
                  </p>
                  <p>
                    <strong>Discount Amount:</strong> $
                    {selectedBooking.coupon.discount_amount}
                  </p>
                </div>
              )}

              {/* ส่วนของการยืนยันการยกเลิก */}
              {showCancelConfirm ? (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Confirm Cancellation</strong>
                  <p className="block sm:inline">
                    Are you sure you want to cancel this booking? This action
                    cannot be undone.
                  </p>
                  <div className="mt-3">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleCancelBooking(selectedBooking._id)}
                    >
                      Yes, Cancel Booking
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setShowCancelConfirm(false)}
                    >
                      No, Keep Booking
                    </button>
                  </div>
                </div>
              ) : (
                <div className="modal-action mt-6">
                  {selectedBooking.booking_status !== 'cancelled' && (
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                      onClick={() => setShowCancelConfirm(true)}
                    >
                      Cancel Order
                    </button>
                  )}
                  <form method="dialog">
                    <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300">
                      Close
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default OrderManage;
