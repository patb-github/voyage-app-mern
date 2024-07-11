import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import CartItem from '../../components/user/CartItem';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { format, addDays } from 'date-fns';
import { getCouponByCode, calculateDiscount } from '../../utils/couponUtils';

function UserCartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        console.log(res.data.cart);
        const newCart = await Promise.all(
          res.data.cart.map(async (item) => ({
            ...item,
            trip: await toCartItem(item.trip_id, item),
            isChecked: false,
          }))
        );
        setCart(newCart);
        console.log('Updated cart:', newCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const newTotalAmount = cart.reduce((sum, item) => {
      return item.isChecked ? sum + (item.trip?.total || 0) : sum;
    }, 0);
    setTotalAmount(newTotalAmount);
    console.log('New total amount:', newTotalAmount);
  }, [cart]);

  const handleCheckboxChange = useCallback((itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }, []);

  const handleDelete = useCallback((itemId) => {
    const deleteFromCart = async (itemId) => {
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/cart/${itemId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        console.log(res);
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
      } catch (error) {
        console.log(error);
      }
    };

    deleteFromCart(itemId);
  }, []);

  const handleApplyPromo = async (data) => {
    const enteredCode = data.promoCode;
    setIsLoading(true);
    try {
      const fetchedCoupon = await getCouponByCode(enteredCode);
      setCoupon(fetchedCoupon);

      const selectedItemsTotal = cart.reduce((sum, item) => {
        return item.isChecked ? sum + (item.trip?.total || 0) : sum;
      }, 0);

      const newDiscount = calculateDiscount(
        selectedItemsTotal,
        fetchedCoupon.type,
        fetchedCoupon.discount
      );
      setDiscount(newDiscount);
    } catch (error) {
      const modalPromo = document.getElementById('invalid_promo_code_modal');
      if (modalPromo) {
        modalPromo.showModal();
      }
      console.error('Error fetching coupon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    const selectedItems = cart.filter((item) => item.isChecked);
    if (selectedItems.length === 0) {
      const modal = document.getElementById('none_item_selection_modal');
      if (modal) {
        modal.showModal();
      }
    } else {
      const orderId = generateOrderId(); // Implement this function
      const orderStatus = 'Pending';
      const order = {
        orderId,
        OrderOriginalPrice: totalAmount,
        OrderDiscount: discount,
        OrderTotal: totalAmount - discount,
        OrderItems: selectedItems,
        orderStatus,
        OrderDate: new Date(),
      };
      // Implement setUser or use appropriate state management
      const modal3 = document.getElementById('wait_for_payment_modal');
      modal3.showModal();
      setTimeout(function () {
        navigate('/Payment', { state: { order } });
      }, 2000);
    }
  };

  async function toCartItem(trip_id, item) {
    const res = await axios.get(`http://localhost:3000/api/trips/${trip_id}`);
    const trip = res.data.trip;
    const departureDate = format(new Date(item.departure_date), 'EEE d MMM');
    const arrivalDate = format(
      addDays(new Date(item.departure_date), trip.duration_days - 1),
      'EEE d MMM'
    );
    console.log(trip);
    return {
      id: trip._id,
      title: trip.name,
      imageSrc: trip.images[0],
      departure: trip.destination_from,
      destination: trip.destination_to,
      duration: trip.duration_days,
      price: trip.price,
      departureDate: departureDate,
      arrivalDate: arrivalDate,
      total: trip.price * item.travelers.length,
    };
  }

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[#FAFAFC] md:bg-[url('/bg-desktop.png')] min-h-screen flex justify-center ">
      <section className="bg-[#FAFAFC] md:rounded-2xl my-6 ">
        <p className="text-2xl font-semibold mb-4 text-center pt-4">
          Packages in Your Cart
        </p>
        <div className=" mx-4 lg:mx-6  bg md:flex">
          <div>
            {cart.map((item) => (
              <Link to={`/cart/edit/${item._id}`} key={item._id}>
                <CartItem
                  key={item._id}
                  cartItemId={item._id}
                  {...item.trip}
                  voyagerCount={item.travelers?.length || 0}
                  isChecked={item.isChecked}
                  onDelete={handleDelete}
                  onCheckboxChange={handleCheckboxChange}
                  total={item.trip?.total || 0}
                />
              </Link>
            ))}
          </div>
          <div className="bg-white shadow-xl p-6 md:w-80 card rounded-2xl md:mx-2 my-4 h-fit">
            <form onSubmit={handleSubmitPromo(handleApplyPromo)}>
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Promo Code"
                    {...registerPromo('promoCode', { required: true })}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  >
                    Apply
                  </button>
                </div>
                {promoErrors.promoCode && (
                  <span className="text-red-500">กรุณากรอกโปรโมโค้ด</span>
                )}
              </div>
            </form>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Original price</p>
              <p className="text-gray-900 font-semibold">
                $ {totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Discount</p>
              <p className="font-semibold text-red-500">
                $ {discount.toFixed(2)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Estimated Total</p>
              <p className="text-gray-900 font-semibold">
                $ {(totalAmount - discount).toFixed(2)}
              </p>
            </div>
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Applying...' : 'CHECKOUT'}
            </button>
          </div>
          <dialog id="none_item_selection_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Vovage</h3>
              <p className="py-4">
                Please select at least one item to proceed to checkout.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="invalid_promo_code_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Vovage</h3>
              <p className="py-4">
                ไม่พบรหัสโปรโมชั่นที่คุณกรอก กรุณากรอกรหัสโปรโมชั่นให้ถูกต้อง
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="wait_for_payment_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-semibold flex">
                Please wait while we are redirecting you to the payment page.
              </h3>
              <p className="py-4 flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </p>
              <div className="modal-action">
                <form method="dialog"></form>
              </div>
            </div>
          </dialog>
        </div>
      </section>
    </div>
  );
}

export default UserCartPage;
