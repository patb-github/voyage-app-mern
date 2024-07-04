import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CartItem from '../../components/CartItem';
import { useNavigate } from 'react-router-dom';

function UserCartPage() {
  const [user, setUser] = useState({
    id: 1,
    cart: [
      {
        id: 1,
        name: 'Product A',
        price: 100,
        quantity: 2,
        total: 200,
        isChecked: false,
      },
    ],
    orders: [],
  });
  const currentUserCartItems = user.cart;
  const promoCode = [{ code: 'testcode', discount: 10 }];
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

  const generateOrderId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `VO${year}<span class="math-inline">\{month\}</span>{randomNumber}`;
  };

  const {
    register: registerPromo,
    handleSubmit: handleSubmitPromo,
    formState: { errors: promoErrors },
  } = useForm();

  useEffect(() => {
    const newTotalAmount = currentUserCartItems.reduce((sum, item) => {
      return item.isChecked ? sum + item.total : sum;
    }, 0);
    setTotalAmount(newTotalAmount);
    console.log('User cart:', user.cart); // Log the user's cart data
  }, [currentUserCartItems]);

  const handleCheckboxChange = (itemId) => {
    setUser((prevUser) => ({
      ...prevUser,
      cart: prevUser.cart.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      ),
    }));
  };

  const handleDelete = (itemId) => {
    setUser((prevUser) => ({
      ...prevUser,
      cart: prevUser.cart.filter((item) => item.id !== itemId),
    }));
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

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[#FAFAFC] md:bg-[url('/bg-desktop.png')] min-h-screen flex justify-center ">
      <section className="bg-[#FAFAFC] md:rounded-2xl my-6 ">
        <p className="text-2xl font-semibold mb-4 text-center pt-4">
          แพ็คเก็จที่ใส่ตะกร้าไว้
        </p>
        <div className=" mx-4 lg:mx-6  bg md:flex">
          <div>
            {user &&
              currentUserCartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onDelete={handleDelete}
                  onCheckboxChange={handleCheckboxChange}
                />
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
              <p className="text-gray-900 font-semibold">฿ {totalAmount}</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm ">Discount</p>
              <p className=" font-semibold text-red-500">฿ {discount}</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Estimated Total</p>
              <p className="text-gray-900 font-semibold">
                ฿ {totalAmount - discount}
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
                ไม่มีสินค้าที่ถูกเลือก กรุณาเลือกสินค้าก่อนทำการชำระเงิน
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
