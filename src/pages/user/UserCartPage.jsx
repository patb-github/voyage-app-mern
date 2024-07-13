import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosUser from '../../utils/axiosUser';
import { format, addDays } from 'date-fns';
import { getCouponByCode, calculateDiscount } from '../../utils/couponUtils';
import CartItem from '../../components/user/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartLengthAtom } from '../../atoms/cartAtom';
import { fetchCart } from '../../utils/cartUtils';
import { useAtom } from 'jotai';
function UserCartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [, setCartLength] = useAtom(cartLengthAtom);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axiosUser.get('/cart');
        const newCart = await Promise.all(
          res.data.cart.map(async (item) => ({
            ...item,
            trip: await toCartItem(item.trip_id, item),
            isChecked: false,
          }))
        );
        setCart(newCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartData(); // เรียกใช้ฟังก์ชัน fetchCartData
  }, []); // ทำงานเมื่อ component เริ่มต้น

  useEffect(() => {
    const newTotalAmount = cart.reduce((sum, item) => {
      return item.isChecked ? sum + (item.trip?.total || 0) : sum;
    }, 0);
    setTotalAmount(newTotalAmount);
  }, [cart]); // ทำงานเมื่อ cart เปลี่ยนแปลง

  const handleCheckboxChange = useCallback((itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  }, []);

  const handleDelete = useCallback(async (itemId) => {
    try {
      const res = await axiosUser.delete(`/cart/${itemId}`);

      if (res.status === 200) {
        setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
        toast.success('Item removed from cart successfully');
        const { cartLength } = await fetchCart();
        setCartLength(cartLength);
      } else {
        throw new Error('Failed to delete item from cart');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('An error occurred while removing the item');
    }
  }, []);
  const handleApplyPromo = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const couponData = await getCouponByCode(promoCode);

      if (totalAmount < couponData.coupon.minimumPurchaseAmount) {
        toast.error('Minimum purchase amount not reached');
        setDiscount(0);
      } else {
        const newDiscount = calculateDiscount(
          totalAmount,
          couponData.coupon.type,
          couponData.coupon.discount
        );
        setDiscount(newDiscount);
        toast.success('Promo code applied successfully!');
        setIsPromoApplied(true); // Set the promo as applied
      }
    } catch (error) {
      toast.error('Invalid promo code');
      setDiscount(0);
      console.error('Error fetching coupon:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setPromoCode('');
    setIsPromoApplied(false);
    toast.success('Promo code removed');
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
    try {
      const res = await axiosUser.get(`/trips/${trip_id}`); // ใช้ axiosUser แทน axios
      const trip = res.data.trip;
      const departureDate = format(item.departure_date, 'EEE d MMM');
      const arrivalDate = format(
        addDays(item.departure_date, trip.duration_days - 1),
        'EEE d MMM'
      );
      return {
        id: trip._id,
        title: trip.name || 'N/A',
        imageSrc: trip.images[0] || 'N/A',
        departure: trip.destination_from || null,
        destination: trip.destination_to || 'N/A',
        duration: trip.duration_days || 'N/A',
        price: trip.price || 0,
        departureDate: departureDate || null,
        arrivalDate: arrivalDate || null,
        total: trip.price * item.travelers.length || 0,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return {
          id: trip_id,
          title: 'N/A',
          imageSrc: 'N/A',
          departure: null,
          destination: 'N/A',
          duration: 'N/A',
          price: 0,
          departureDate: null,
          arrivalDate: null,
          total: 0,
        };
      } else {
        console.log(error);
      }
    }
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
              <CartItem
                key={item._id}
                cartItemId={item._id}
                {...item.trip}
                voyagerCount={item.travelers?.length || 0}
                isChecked={item.isChecked}
                onDelete={handleDelete}
                onCheckboxChange={handleCheckboxChange}
                onEdit={() => navigate(`/cart/edit/${item._id}`)}
                total={item.trip?.total || 0}
              />
            ))}
          </div>
          <div className="bg-white shadow-xl p-6 md:w-80 card rounded-2xl md:mx-2 my-4 h-fit">
            <form
              onSubmit={isPromoApplied ? handleRemovePromo : handleApplyPromo}
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className={`bg-${
                      isPromoApplied ? 'red' : 'blue'
                    }-500 hover:bg-${
                      isPromoApplied ? 'red' : 'blue'
                    }-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2`}
                    disabled={isLoading}
                    onClick={
                      isPromoApplied ? handleRemovePromo : handleApplyPromo
                    } // <-- เพิ่ม onClick
                  >
                    {isLoading
                      ? 'Processing...'
                      : isPromoApplied
                      ? 'Remove'
                      : 'Apply'}
                  </button>
                </div>
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
              CHECKOUT
            </button>
          </div>
          <dialog id="none_item_selection_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Voyage</h3>
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

      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default UserCartPage;
