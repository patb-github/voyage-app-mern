import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosUser from '../../utils/axiosUser';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faLock,
  faShieldAlt,
  faPlane,
  faUsers,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

function UserPaymentPage() {
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
          card_no: formData.cardNumber.replace(/\s/g, ''),
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

  const formFields = [
    {
      name: 'cardholderName',
      label: 'Cardholder Name',
      type: 'text',
      placeholder: 'John Doe',
      validation: { required: 'Cardholder name is required' },
    },
    {
      name: 'cardNumber',
      label: 'Card Number',
      type: 'text',
      placeholder: '1234 5678 9012 3456',
      validation: {
        required: 'Card number is required',
        pattern: {
          value: /^(\d{4}\s?){4}$/,
          message: 'Invalid card number format',
        },
      },
      maxLength: 19,
    },
    {
      name: 'expirationDate',
      label: 'Expiration Date',
      type: 'text',
      placeholder: 'MM/YY',
      validation: {
        required: 'Expiration date is required',
        pattern: {
          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
          message: 'Invalid expiration date format (MM/YY)',
        },
      },
      maxLength: 5,
    },
    {
      name: 'cvv',
      label: 'CVV',
      type: 'text',
      placeholder: '123',
      validation: {
        required: 'CVV is required',
        pattern: {
          value: /^\d{3,4}$/,
          message: 'Invalid CVV',
        },
      },
      maxLength: 3,
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/bg-desktop.webp')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
            Secure Payment Gateway
          </h1>
          <div className="flex justify-center space-x-4 mt-4">
            <FontAwesomeIcon
              icon={faLock}
              className="text-2xl text-green-500"
            />
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-2xl text-blue-500"
            />
          </div>
        </div>
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-indigo-800">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Payment Details
              </h2>
              <form onSubmit={handleSubmit(handlePayment)}>
                {formFields.map((field) => (
                  <div key={field.name} className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text text-lg font-semibold text-indigo-800">
                        {field.label}*
                      </span>
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="input input-bordered w-full bg-white"
                      {...register(field.name, field.validation)}
                      maxLength={field.maxLength}
                      onChange={(e) => {
                        if (field.name === 'cardNumber') {
                          e.target.value = e.target.value
                            .replace(/\s/g, '')
                            .replace(/(\d{4})/g, '$1 ')
                            .trim();
                        } else if (field.name === 'expirationDate') {
                          e.target.value = e.target.value
                            .replace(/\D/g, '')
                            .replace(/(\d{2})(\d)/, '$1/$2');
                        }
                      }}
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors[field.name].message}
                      </span>
                    )}
                  </div>
                ))}
              </form>
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-indigo-50 rounded-xl p-6 shadow-lg h-full flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-indigo-800">
                  Booking Summary
                </h2>
                {booking.booked_trips.map((trip, index) => (
                  <div
                    key={index}
                    className="mb-4 bg-white p-4 rounded-lg shadow"
                  >
                    <h3 className="text-xl font-semibold text-indigo-700">
                      {trip.trip.name}
                    </h3>
                    <p className="flex items-center mt-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="mr-2 text-indigo-500"
                      />
                      Departure:{' '}
                      {new Date(trip.departure_date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center mt-2">
                      <FontAwesomeIcon
                        icon={faUsers}
                        className="mr-2 text-indigo-500"
                      />
                      Travelers: {trip.travelers.length}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <div className="border-t border-indigo-200 my-4"></div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg">Total Amount:</span>
                  <span className="text-lg font-semibold">
                    ${booking.total_amount}
                  </span>
                </div>
                {booking.coupon.discount_amount > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg">Discount:</span>
                    <span className="text-lg font-semibold text-red-500">
                      -${booking.coupon.discount_amount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-indigo-800">
                    Final Amount:
                  </span>
                  <span className="text-xl font-bold text-indigo-800">
                    ${booking.final_amount}
                  </span>
                </div>
                <button
                  onClick={handleSubmit(handlePayment)}
                  className="btn bg-blue-500 text-white w-full text-lg font-semibold"
                >
                  Pay now ${booking.final_amount}
                </button>
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
