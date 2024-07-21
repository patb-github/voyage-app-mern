import React, { useState, useEffect } from 'react';
import axiosUser from '../../utils/axiosUser';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function DashboardOverview() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      calculateStats();
      setLatestOrders(getLatestOrders());
    }
  }, [bookings, selectedMonth, selectedYear]);

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

  const calculateStats = () => {
    const filteredBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.booked_at);
      return (
        bookingDate.getMonth() === selectedMonth &&
        bookingDate.getFullYear() === selectedYear
      );
    });

    const totalSales = filteredBookings.reduce(
      (sum, booking) => sum + booking.final_amount,
      0
    );
    const avgOrderValue = totalSales / filteredBookings.length || 0;
    const activeUsers = new Set(
      filteredBookings.map((booking) => booking.user_id)
    ).size;
    const conversionRate = (filteredBookings.length / activeUsers) * 100 || 0;

    // Calculate changes from last month
    const lastMonthBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.booked_at);
      return (
        bookingDate.getMonth() === (selectedMonth - 1 + 12) % 12 &&
        (selectedMonth === 0
          ? bookingDate.getFullYear() === selectedYear - 1
          : bookingDate.getFullYear() === selectedYear)
      );
    });
    const lastMonthSales = lastMonthBookings.reduce(
      (sum, booking) => sum + booking.final_amount,
      0
    );
    const lastMonthAvgOrderValue =
      lastMonthSales / lastMonthBookings.length || 0;
    const lastMonthActiveUsers = new Set(
      lastMonthBookings.map((booking) => booking.user_id)
    ).size;
    const lastMonthConversionRate =
      (lastMonthBookings.length / lastMonthActiveUsers) * 100 || 0;

    const calculateChange = (current, previous) => {
      if (previous === 0) return current > 0 ? '100%' : '0%';
      const change = ((current - previous) / previous) * 100;
      return `${change.toFixed(1)}%`;
    };

    setStats([
      {
        name: 'Total Sales',
        value: `$${totalSales.toFixed(2)}`,
        change: calculateChange(totalSales, lastMonthSales),
        changeType: totalSales >= lastMonthSales ? 'increase' : 'decrease',
      },
      {
        name: 'Active Users',
        value: activeUsers,
        change: calculateChange(activeUsers, lastMonthActiveUsers),
        changeType:
          activeUsers >= lastMonthActiveUsers ? 'increase' : 'decrease',
      },
      {
        name: 'Conversion Rate',
        value: `${conversionRate.toFixed(1)}%`,
        change: calculateChange(conversionRate, lastMonthConversionRate),
        changeType:
          conversionRate >= lastMonthConversionRate ? 'increase' : 'decrease',
      },
      {
        name: 'Avg. Order Value',
        value: `$${avgOrderValue.toFixed(2)}`,
        change: calculateChange(avgOrderValue, lastMonthAvgOrderValue),
        changeType:
          avgOrderValue >= lastMonthAvgOrderValue ? 'increase' : 'decrease',
      },
    ]);
  };

  const getLatestOrders = () => {
    return bookings
      .sort((a, b) => new Date(b.booked_at) - new Date(a.booked_at))
      .slice(0, 10);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCurrentMonth = () => new Date().getMonth();
  const getCurrentYear = () => new Date().getFullYear();

  const getAvailableMonths = (year) => {
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMonth();

    if (year < currentYear) {
      return [...Array(12)].map((_, i) => i);
    } else if (year === currentYear) {
      return [...Array(currentMonth + 1)].map((_, i) => i);
    }
    return [];
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    setSelectedYear(newYear);

    // Adjust selected month if necessary
    const availableMonths = getAvailableMonths(newYear);
    if (!availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[availableMonths.length - 1]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  const availableMonths = getAvailableMonths(selectedYear);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Month and Year Selector */}
      <div className="mb-6 flex space-x-4">
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className="border rounded-md p-2"
        >
          {[...Array(5)].map((_, i) => {
            const year = getCurrentYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="border rounded-md p-2"
        >
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {new Date(0, month).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div key={item.name} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-600">{item.name}</h3>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
            <p
              className={`text-sm mt-2 flex items-center ${
                item.changeType === 'increase'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {item.changeType === 'increase' ? (
                <FaArrowUp className="mr-1" />
              ) : (
                <FaArrowDown className="mr-1" />
              )}
              {item.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Latest Orders */}
      <h2 className="text-2xl font-bold mb-4">Latest Orders</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {latestOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.booked_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.booked_trips[0]?.travelers[0]?.firstName}{' '}
                  {order.booked_trips[0]?.travelers[0]?.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.final_amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.booking_status === 'completed'
                        ? 'bg-green-400 text-white'
                        : order.booking_status === 'cancelled'
                        ? 'bg-red-400 text-white'
                        : 'bg-yellow-400 text-yellow-800'
                    }`}
                  >
                    {order.booking_status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardOverview;
