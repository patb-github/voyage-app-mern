import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CartItem from '../../components/user/CartItem';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { format, addDays } from 'date-fns';

function UserCartPage() {
  const [cart, setCart] = useState([]);
  const promoCode = [{ code: 'testcode', discount: 10 }];
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm();

  useEffect(() => {
    //=========== API CALL ==============
    const fetchCart = async () => {
      const res = await axios.get('http://localhost:3000/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      console.log(res.data.cart);
      setCart(res.data.cart);
      const newCart = await Promise.all(
        res.data.cart.map(async (item) => ({
          ...item,
          trip: await toCartItem(item.trip_id, item),
        }))
      );
      setCart(newCart.map((item) => ({ ...item, isChecked: false })));
    };
    fetchCart();
    //==================================
  }, []);

  useEffect(() => {
    // console.log('Cart:', cart);
    const newTotalAmount = cart.reduce((sum, item) => {
      return item.isChecked ? sum + item.total : sum;
    }, 0);
    setTotalAmount(newTotalAmount);
    // console.log('User cart:', cart); // Log the user's cart data
  }, [cart]);

  const handleCheckboxChange = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDelete = (itemId) => {
    //=========== API CALL ==============
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
        setCart(cart.filter((item) => item._id !== itemId));
      } catch (error) {
        console.log(error);
      }
    };

    deleteFromCart(itemId);
    //==================================
  };

  const handleApplyPromo = (data) => {
    const enteredCode = data.promoCode;
    const validPromo = promoCode.find((promo) => promo.code === enteredCode);
    if (validPromo) {
      const newDiscount = (totalAmount * validPromo.discount) / 100;
      setDiscount(newDiscount);
    } else {
      const modalPromo = document.getElementById('invalid_promo_code_modal');
      if (modalPromo) {
        modalPromo.showModal();
      }
    }
  };

  const handlePayment = () => {
    const selectedItems = currentUserCartItems.filter((item) => item.isChecked);
    if (selectedItems.length === 0) {
      const modal = document.getElementById('none_item_selection_modal');
      if (modal) {
        modal.showModal();
      }
    } else {
      const orderId = generateOrderId();
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
      setUser((prevUserData) =>
        prevUserData.map((u) =>
          u.id === user.id
            ? {
                ...u,
                orders: [...(u.orders || []), order],
                cart: u.cart.filter((item) => !item.isChecked),
              }
            : u
        )
      );
      const modal3 = document.getElementById('wait_for_payment_modal');
      modal3.showModal();
      setTimeout(function () {
        navigate('/Payment', { state: { order } });
      }, 2000);
    }
  };

  async function toCartItem(trip_id, item) {
    try {
      const res = await axios.get(`http://localhost:3000/api/trips/${trip_id}`);
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
        departure: trip.destination_from || 'N/A',
        destination: trip.destination_to || 'N/A',
        duration: trip.duration_days || 'N/A',
        price: trip.price || 'N/A',
        departureDate: departureDate || 'N/A',
        arrivalDate: arrivalDate || 'N/A',
        total: trip.price * item.travelers.length || 'N/A',
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return {
          id: trip_id,
          title: 'N/A',
          imageSrc: 'N/A',
          departure: 'N/A',
          destination: 'N/A',
          duration: 'N/A',
          price: 'N/A',
          departureDate: 'N/A',
          arrivalDate: 'N/A',
          total: 'N/A',
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
              <Link to={`/cart/edit/${item._id}`} key={item._id}>
                <CartItem
                  key={item._id}
                  cartItemId={item._id}
                  {...item.trip}
                  voyagerCount={item.travelers.length}
                  isChecked={item.isChecked}
                  onDelete={handleDelete}
                  onCheckboxChange={handleCheckboxChange}
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
              <p className="text-gray-900 font-semibold">$ {totalAmount}</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm ">Discount</p>
              <p className=" font-semibold text-red-500">$ {discount}</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Estimated Total</p>
              <p className="text-gray-900 font-semibold">
                $ {totalAmount - discount}
              </p>
            </div>
            <button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              CHECKOUT
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
