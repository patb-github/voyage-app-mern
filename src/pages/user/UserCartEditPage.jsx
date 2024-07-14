import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faTimes,
  faCalendar,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import UserContext from '../../context/UserContext';
import axiosUser from '../../utils/axiosUser';
import axiosVisitor from '../../utils/axiosVisitor';
import { useForm } from 'react-hook-form';
import { useAtom } from 'jotai';
import { cartLengthAtom } from '../../atoms/cartAtom';
import { fetchCart } from '../../utils/cartUtils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCouponByCode, calculateDiscount } from '../../utils/couponUtils';

function UserCartEditPage() {
  const { user, isLoading: userLoading, token } = useContext(UserContext);
  const [localUser, setLocalUser] = useState(null);
  const [, setCartLength] = useAtom(cartLengthAtom);
  const [trip, setTrip] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVoyager, setCurrentVoyager] = useState('');
  const [voyagers, setVoyagers] = useState({});
  const [departureDate, setDepartureDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { cartItemId } = useParams();
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [couponId, setCouponId] = useState(null);
  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm();
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [couponType, setCouponType] = useState(null);
  const [couponValue, setCouponValue] = useState(null);

  useEffect(() => {
    console.log('User in UserCartEditPage:', user);
    if (user) {
      setLocalUser(user);
      setVoyagers({
        1: { firstName: user.firstname, lastName: user.lastname },
      });
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      axiosUser.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosUser.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchCartItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const cartResponse = await axiosUser.get(`/cart/${cartItemId}`);
      if (cartResponse.status !== 200) {
        throw new Error('Failed to fetch cart item');
      }

      const cartItemData = cartResponse.data.cartItem;

      setVoyagers(
        cartItemData.travelers.reduce((acc, traveler, index) => {
          acc[index + 1] = {
            firstName: traveler.firstName || '',
            lastName: traveler.lastName || '',
          };
          return acc;
        }, {})
      );
      setDepartureDate(new Date(cartItemData.departure_date));

      const tripResponse = await axiosVisitor.get(
        `/trips/${cartItemData.trip_id}`
      );
      if (tripResponse.status !== 200) {
        throw new Error('Failed to fetch trip details');
      }
      setTrip(tripResponse.data.trip);
      setTotalAmount(tripResponse.data.trip.price || 0);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching cart details.');
      navigate('/cart');
    } finally {
      setIsLoading(false);
    }
  }, [cartItemId, navigate]);

  useEffect(() => {
    if (cartItemId && localUser) {
      fetchCartItem();
    }
  }, [cartItemId, fetchCartItem, localUser]);

  useEffect(() => {
    if (trip) {
      const totalAmount = trip.price * Object.keys(voyagers).length;
      setTotalAmount(totalAmount);
      setDiscount(calculateDiscount(totalAmount, couponType, couponValue));
    }
  }, [trip, voyagers, couponType, couponValue]);

  const openModal = (voyager) => {
    setCurrentVoyager(voyager);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (
      voyagers[currentVoyager]?.firstName === '' &&
      voyagers[currentVoyager]?.lastName === ''
    ) {
      setVoyagers((prev) => {
        const newVoyagers = { ...prev };
        delete newVoyagers[currentVoyager];
        return newVoyagers;
      });
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVoyagers((prev) => ({
      ...prev,
      [currentVoyager]: {
        ...prev[currentVoyager],
        [name]: value,
      },
    }));
  };

  const saveVoyagerInfo = () => {
    if (
      voyagers[currentVoyager]?.firstName &&
      voyagers[currentVoyager]?.lastName
    ) {
      closeModal();
      console.log(voyagers);
    } else {
      toast.error('Please fill in both first name and last name');
    }
  };

  const deleteVoyager = () => {
    if (Object.keys(voyagers).length === 1) {
      toast.error('At least one voyager must be specified');
      return;
    }
    setVoyagers((prev) => {
      const newVoyagers = { ...prev };
      delete newVoyagers[currentVoyager];

      const reorderedVoyagers = {};
      Object.values(newVoyagers).forEach((voyager, index) => {
        reorderedVoyagers[index + 1] = voyager;
      });

      return reorderedVoyagers;
    });
    closeModal();
  };

  const addNewVoyager = () => {
    const newVoyagerNumber = Object.keys(voyagers).length + 1;
    setVoyagers((prev) => ({
      ...prev,
      [newVoyagerNumber]: { firstName: '', lastName: '' },
    }));
    setCurrentVoyager(newVoyagerNumber.toString());
    setIsModalOpen(true);
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (selectedDate >= new Date()) {
      setDepartureDate(selectedDate);
    } else {
      toast.error('Please select a future date');
    }
  };

  const updateCart = async () => {
    const cartItem = {
      departure_date: departureDate,
      travelers: Object.values(voyagers),
    };

    try {
      const response = await axiosUser.put(`/cart/${cartItemId}`, cartItem);
      const { cartLength } = await fetchCart();
      setCartLength(cartLength);
      toast.success('Trip details successfully saved');
    } catch (error) {
      console.error('Error saving trip details:', error);
      toast.error('Error saving trip details');
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setPromoCode('');
    setIsPromoApplied(false);
    setCouponType(null);
    setCouponValue(null);
    toast.info('Promo code has been removed');
  };

  const handleApplyPromo = async () => {
    try {
      const couponData = await getCouponByCode(promoCode);
      if (totalAmount < couponData.coupon.minimumPurchaseAmount) {
        toast.error('Minimum purchase amount not reached');
        return;
      }

      const calculatedDiscount = calculateDiscount(
        totalAmount,
        couponData.coupon.type,
        couponData.coupon.discount
      );

      setDiscount(calculatedDiscount);
      setCouponId(couponData.coupon._id);
      setCouponType(couponData.coupon.type);
      setCouponValue(couponData.coupon.discount);
      toast.success('Promo code applied successfully!');
      setIsPromoApplied(true);
    } catch (error) {
      toast.error('Invalid promo code');
      console.error(error);
    }
  };

  const handlePayment = async () => {
    const bookingData = {
      booked_trips: [
        {
          trip_id: trip._id,
          departure_date: departureDate.toISOString(),
          travelers: Object.values(voyagers),
        },
      ],
      coupon_id: isPromoApplied ? couponId : null,
      cart_item_ids: [cartItemId],
      payment_method: null, // or actual payment method data if available
    };

    try {
      const response = await axiosUser.post('/bookings', bookingData);

      if (response.status === 200 || response.status === 201) {
        toast.success('Booking successful!');
        setCartLength((prev) => prev - 1);
        const bookingId = response.data.bookingId;
        navigate(`/payment/${bookingId}`, {
          state: { bookingDetails: response.data, orderSummary: bookingData },
        });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('Error during booking:', error);
      toast.error('Booking failed. Please try again.');
    }
  };

  if (userLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!localUser) {
    navigate('/login');
    return null;
  }

  if (!trip || Object.keys(voyagers).length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold pt-8 pb-10 text-indigo-700">
            Edit Booking Details
          </h1>
        </div>
        <div className="md:flex md:pb-6">
          <div className="hidden md:block px-16 md:w-1/2 border-r border-gray-200">
            <img
              src={trip.images[0]}
              alt="Okinawa Aquarium"
              className="rounded-3xl shadow-lg transform hover:scale-105 transition duration-300"
            />
            <p className="text-lg font-normal py-4 text-gray-700">
              {trip.description}
            </p>
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 ">
              <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                {trip.name}
              </h2>
              <div className="mb-4 relative">
                <label
                  htmlFor="departure-date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Select Departure Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="departure-date"
                    name="departure-date"
                    value={format(departureDate, 'yyyy-MM-dd')}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    onChange={handleDateChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
                  />
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-md">
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-indigo-700">
                    {trip.destination_from}
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
                    ({trip.duration_days} days {trip.duration_days - 1} nights)
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-indigo-700">
                    {trip.destination_to}
                  </p>
                  <p className="font-bold bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 mt-2">
                    {format(
                      addDays(departureDate, trip.duration_days - 1),
                      'EEE d MMM'
                    )}
                  </p>
                </div>
              </div>

              {/* <button className="flex mt-2 text-lg text-indigo-600 items-center hover:underline">
                <span>Policy | Things to know before traveling</span>
                <span className="text-2xl ml-2">&#8227;</span>
              </button> */}
            </div>
          </div>
          <div className="md:w-1/2 md:px-10">
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
              <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                Voyagers
              </h2>
              {Object.keys(voyagers).length === 0 ? (
                <p className="text-gray-500 italic">No voyagers yet</p>
              ) : (
                Object.entries(voyagers).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center border-b border-gray-200 py-3"
                  >
                    <p className="text-lg">
                      Voyager {key}: {value.firstName} {value.lastName}
                    </p>
                    <button
                      onClick={() => openModal(key)}
                      className="text-indigo-500 hover:text-indigo-700"
                    >
                      <img src="/pencil.svg" alt="Edit" className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
              <button
                className="btn btn-outline text-blue-500 w-full mt-4 hover:bg-indigo-500 hover:text-white transition duration-300"
                onClick={addNewVoyager}
              >
                + Add Voyager
              </button>
            </div>
            <div className="bg-white shadow-xl p-6 md:w-full card rounded-2xl  my-4 h-fit">
              <form
                onSubmit={handleSubmitPromo(
                  isPromoApplied ? handleRemovePromo : handleApplyPromo
                )}
              >
                <h3 className="text-lg font-semibold mb-2">Promotions</h3>
                <div className="mb-4">
                  <label
                    htmlFor="promo-code"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Enter Promo Code
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      id="promo-code"
                      {...registerPromo('promoCode', { required: true })} // <-- ผูกค่า promoCode กับ React Hook Form
                      value={promoCode} // <-- เพิ่ม value เพื่อผูกกับ state
                      onChange={(e) => setPromoCode(e.target.value)} // <-- ผูก onChange กับ state
                      placeholder="promo code"
                      className="flex-grow focus:outline-none focus:ring focus:ring-blue-500 rounded-l border border-gray-300 py-2 px-4"
                    />
                    <button
                      type="submit"
                      className={`bg-${
                        isPromoApplied ? 'red' : 'blue'
                      }-500 hover:bg-${
                        isPromoApplied ? 'red' : 'blue'
                      }-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline`}
                    >
                      {isPromoApplied ? 'Remove' : 'Apply'}
                    </button>
                  </div>
                  {promoErrors.promoCode && (
                    <span className="text-red-500">
                      Please enter a promo code
                    </span>
                  )}
                </div>

                <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
                  <h2 className="text-2xl font-extrabold py-4 text-indigo-800">
                    Payment Information
                  </h2>
                  <div className="flex justify-between items-center font-semibold text-gray-700">
                    <p className="text-lg py-2">
                      Package {trip.name} x {Object.keys(voyagers).length}
                    </p>
                    <p>
                      $
                      {(
                        trip.price * Object.keys(voyagers).length
                      ).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-gray-700">
                    <p className="text-lg py-2">Discount</p>
                    <p>${discount}</p>
                  </div>
                </div>
                <p className="text-red-500 text-sm">
                  To prevent duplicate use, the discount code will be removed
                  once you add a trip to your cart. Please re-enter the code at
                  checkout to apply the discount to your purchase.
                </p>
              </form>
              <div className="flex justify-between px-6 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl mt-4 text-white">
                <div className="flex flex-col">
                  <p className="text-sm font-bold">Total Payment</p>
                  <p className="text-3xl font-bold">
                    $ {totalAmount - discount}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="btn bg-white text-indigo-700 hover:bg-indigo-100 rounded-full px-4 transition duration-300 flex items-center"
                    onClick={updateCart}
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save
                  </button>
                  <button
                    onClick={handlePayment}
                    className="btn bg-white text-indigo-700 hover:bg-indigo-100 rounded-full px-4 transition duration-300 flex items-center"
                  >
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="bottom-center" />

      {/* DaisyUI Modal */}
      <dialog
        id="passenger_modal"
        className={`modal ${isModalOpen ? 'modal-open' : ''}`}
      >
        <form method="dialog" className="modal-box bg-white rounded-2xl">
          <h3 className="font-bold text-2xl mb-4 text-indigo-800">
            Enter Voyager {currentVoyager} Information
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={voyagers[currentVoyager]?.firstName || ''}
              onChange={handleInputChange}
              className="input input-bordered focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text text-gray-700">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={voyagers[currentVoyager]?.lastName || ''}
              onChange={handleInputChange}
              className="input input-bordered focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="modal-action flex justify-end space-x-2 mt-6">
            <button
              className="p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
              onClick={saveVoyagerInfo}
              title="Save"
            >
              <FontAwesomeIcon
                icon={faSave}
                className="text-indigo-500 text-xl"
              />
            </button>
            <button
              className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
              onClick={deleteVoyager}
              title="Delete"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-400 text-xl"
              />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={closeModal}
              title="Cancel"
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-gray-400 text-xl"
              />
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default UserCartEditPage;
