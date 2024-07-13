import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosUser from '../../utils/axiosUser';
import { toast } from 'react-toastify';

function UserPaymentPage() {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setIsLoading(false);
        toast.error('Booking ID not found');
        return;
      }

      try {
        setIsLoading(true);
        const response = await axiosUser.get(`/bookings/details/${bookingId}`);
        setBooking(response.data.booking);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to load booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePayment = async (formData) => {
    try {
      const paymentData = {
        payment_method: {
          method: formData.paymentMethod,
          card_no: formData.cardNumber,
        },
      };

      const modal = document.getElementById('payment_process');
      if (modal) modal.showModal();

      const response = await axiosUser.patch(
        `/bookings/pay/${bookingId}`,
        paymentData
      );

      if (response.status === 200) {
        toast.success('Payment successful!');
        navigate('/payment-success', {
          state: { paymentDetails: response.data },
        });
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      const modal = document.getElementById('payment_process');
      if (modal) modal.close();
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!booking || !booking.booked_trips) {
    return <div>No booking details available</div>;
  }

  return (
    <div className="min-h-screen bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold pb-10 text-indigo-700">
            Complete Your Payment
          </h1>
        </div>
        <div className="md:flex md:space-x-8">
          <form className="md:w-1/2" onSubmit={handleSubmit(handlePayment)}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-indigo-800">
                  Cardholder Name*
                </span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full bg-indigo-50"
                {...register('cardholderName', {
                  required: 'Cardholder name is required',
                })}
              />
              {errors.cardholderName && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cardholderName.message}
                </span>
              )}
            </div>

            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text text-lg font-semibold text-indigo-800">
                  Card Number*
                </span>
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="input input-bordered w-full bg-indigo-50"
                {...register('cardNumber', {
                  required: 'Card number is required',
                  pattern: {
                    value: /^(\d{4}\s?){4}$/,
                    message: 'Invalid card number format',
                  },
                })}
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.cardNumber.message}
                </span>
              )}
            </div>

            <div className="flex space-x-4 mb-4">
              {/* <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-indigo-800">
                    Expiration Date*
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="input input-bordered w-full bg-indigo-50"
                  {...register('expirationDate', {
                    required: 'Expiration date is required',
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                      message: 'Invalid expiration date format (MM/YY)',
                    },
                  })}
                />
                {errors.expirationDate && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.expirationDate.message}
                  </span>
                )}
              </div> */}

              <div className="form-control w-1/2">
                <label className="label">
                  <span className="label-text text-lg font-semibold text-indigo-800">
                    CVV*
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="input input-bordered w-full bg-indigo-50"
                  {...register('cvv', {
                    required: 'CVV is required',
                    pattern: {
                      value: /^\d{3,4}$/,
                      message: 'Invalid CVV',
                    },
                  })}
                />
                {errors.cvv && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.cvv.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-control w-full mb-4">
              {/* <label className="label">
                <span className="label-text text-lg font-semibold text-indigo-800">
                  Payment Method*
                </span>
              </label> */}
              <select
                className="select select-bordered w-full bg-indigo-50"
                {...register('paymentMethod', {
                  required: 'Payment method is required',
                })}
              >
                <option value="">Select payment method</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              {errors.paymentMethod && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-8 text-lg font-semibold"
            >
              Pay now
            </button>
          </form>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-indigo-50 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-extrabold mb-4 text-indigo-800">
                Booking Summary
              </h2>
              {booking.booked_trips.map((trip, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-semibold">{trip.trip.name}</h3>
                  <p>
                    Departure:{' '}
                    {new Date(trip.departure_date).toLocaleDateString()}
                  </p>
                  <p>Travelers: {trip.travelers.length}</p>
                </div>
              ))}
              <div className="border-t border-indigo-200 my-4"></div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg">Total Amount:</span>
                <span className="text-lg font-semibold">
                  ฿{booking.total_amount.toLocaleString()}
                </span>
              </div>
              {booking.coupon.discount_amount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Discount:</span>
                  <span className="text-lg font-semibold text-red-500">
                    -฿{booking.coupon.discount_amount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-indigo-800">
                  Final Amount:
                </span>
                <span className="text-xl font-bold text-indigo-800">
                  ฿{booking.final_amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <dialog id="payment_process" className="modal">
        <div className="modal-box bg-white p-6 rounded-xl shadow-xl">
          <h3 className="font-bold text-2xl text-indigo-700 mb-4">
            Processing your payment
          </h3>
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default UserPaymentPage;
