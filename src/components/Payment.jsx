import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Payment() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlePayment = (creditCardDetail) => {
    const modal = document.getElementById('payment_process');
    if (creditCardDetail) {
      if (modal) {
        modal.showModal();
        setTimeout(function () {
          navigate('/PaymentSuccess');
        }, 3000);
        console.log(creditCardDetail);
      }
    }
  };
  return (
    <div className="flex items-center h-screen bg-cover md:bg-no-repeat bg-[url('/bg-desktop.png')]">
      <div className="flex flex-col md:flex-row bg-white mx-28 w-screen p-28">
        <form className="w-1/2" onSubmit={handleSubmit(handlePayment)}>
          <div className="form-control w-full">
            <p>Payment</p>
            <label className="label">
              <span className="label-text">
                Full name (as displayed on card)*
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              {...register('fullName', { required: true })}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm pt-1">
                กรุณากรอกชื่อเต็ม
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
              className="input input-bordered w-full"
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
                className="input input-bordered w-full"
                {...register('expiration', {
                  required: true,
                })}
              />
              {errors.expiration && (
                <span className="text-red-500 text-sm pt-1">
                  กรุณากรอกหมายเลขบัตรให้ถูกต้อง
                </span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">CVV*</span>
              </label>
              <input
                type="text"
                placeholder="..."
                className="input input-bordered w-full"
                {...register('cvv', {
                  required: true,
                  pattern: /^\d{3}$/,
                })}
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm pt-1">
                  กรุณากรอกหมายเลขบัตรให้ถูกต้อง
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
        <div className="w-1/2 ml-4 mt-14 bg-[#F9FAFB] card shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span>Original price</span>
            <span>฿ 16,990.00</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span>Savings</span>
            <span className="text-red-500">฿ 0.00</span>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Total</span>
            <span className="font-bold">฿ 16,990.00</span>
          </div>
          <div className="flex  gap-4  mt-4 justify-center">
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
      </div>
    </div>
  );
}

export default Payment;
