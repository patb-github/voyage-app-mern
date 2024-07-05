import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

function UserPaymentPage() {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้
  const [orderFromCart, setOrderFromCart] = useState(null); // เก็บข้อมูลออเดอร์
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePayment = (creditCardDetail) => {
    const modal = document.getElementById('payment_process');
    if (creditCardDetail && modal) {
      modal.showModal();
      setTimeout(() => {
        // อัปเดตสถานะออเดอร์ใน state
        setUser((prevUser) => ({
          ...prevUser,
          orders: prevUser.orders.map((order) =>
            order.orderId === orderFromCart.orderId
              ? { ...order, orderStatus: 'Completed' }
              : order
          ),
        }));
        navigate('/payment-success');
      }, 3000);
    }
  };

  useEffect(() => {
    if (user && user.orders && orderFromCart) {
      console.log('Order from Cart:', orderFromCart);
    }
  }, [user, orderFromCart]);

  const handleExpirationChange = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    value = value.slice(0, 4);
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    event.target.value = value;
  };

  const handleCvvChange = (event) => {
    let value = event.target.value.replace(/\D/g, ''); // ลบอักขระที่ไม่ใช่ตัวเลข
    event.target.value = value.slice(0, 3); // จำกัดความยาวเหลือ 3 ตัว
  };

  return (
    <div className="flex items-center h-screen bg-cover md:bg-no-repeat bg-[url('/bg-desktop.png')]">
      <div className="flex flex-col md:flex-row bg-white mx-28 w-screen p-28">
        <form className="w-1/2" onSubmit={handleSubmit(handlePayment)}>
          <div className="form-control w-full">
            <p className="text-3xl font-bold">Payment</p>
            <label className="label">
              <span className="label-text">
                Full name (as displayed on card)*
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-[#FAFAFC]"
              {...register('fullName', { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm pt-1">
                กรุณากรอกชื่อและนามสกุลให้ถูกต้อง
              </span>
            )}
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Card number*</span>
            </label>
            <input
              type="text"
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="input input-bordered w-full bg-[#FAFAFC]"
              {...register('cardNumber', {
                required: true,
                onChange: (e) => {
                  const { value } = e.target;
                  const numericValue = value.replace(/\D/g, '');
                  const formattedValue = numericValue
                    .replace(/(\d{4})/g, '$1-')
                    .slice(0, 19);
                  e.target.value = formattedValue;
                },
              })}
            />
            {errors.cardNumber && (
              <span className="text-red-500 text-sm pt-1">
                กรุณากรอกหมายเลขบัตรให้ถูกต้อง
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Card expiration*</span>
              </label>
              <input
                type="text"
                placeholder="12/24"
                className="input input-bordered w-full bg-[#FAFAFC]"
                {...register('expiration', {
                  required: true,
                  onChange: handleExpirationChange,
                  pattern: /^\d{2}\/\d{2}$/,
                })}
              />
              {errors.expiration && (
                <span className="text-red-500 text-sm pt-1">
                  กรุณากรอกวันหมดอายุให้ถูกต้อง (MM/YY)
                </span>
              )}
            </div>

            <div className="form-control w-1/2 ml-2">
              <label className="label">
                <span className="label-text">CVV*</span>
              </label>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full bg-[#FAFAFC]"
                {...register('cvv', {
                  required: true,
                  maxLength: 3,
                  pattern: /^\d{3}$/,
                  onChange: handleCvvChange,
                })}
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm pt-1">
                  กรุณากรอก CVV ให้ถูกต้อง (3 หลัก)
                </span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn bg-blue-500 text-white w-full mt-4"
          >
            Pay now
          </button>
        </form>

        {user && user.orders && orderFromCart && (
          <div className="w-1/2 ml-4 mt-14 bg-[#F9FAFB] card shadow-lg rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span>Original price:</span>
              <span>฿{orderFromCart.OrderOriginalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Discount:</span>
              <span className="text-red-500">
                -฿{orderFromCart.OrderDiscount.toLocaleString()}
              </span>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                ฿{orderFromCart.OrderTotal.toLocaleString()}
              </span>
            </div>
            <div className="flex gap-4 mt-4 justify-center">
              <img src="/paypal.svg" alt="PayPal" className="mr-2 w-20" />
              <img src="/visa.svg" alt="Visa" className="mr-2 w-20" />
              <img src="/mastercard.svg" className="w-20" alt="Mastercard " />
            </div>
            <dialog id="payment_process" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg flex">
                  Processing your payment
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
        )}
      </div>
    </div>
  );
}

export default UserPaymentPage;
