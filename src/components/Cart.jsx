import { useState } from 'react';
import CartItemUi from './CartItemUi';
import { Link, useNavigate } from 'react-router-dom';
function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title:
        'แพ็คเกจเที่ยว สิงคโปร์ พร้อมที่พัก 3 วัน 2 คืน + Universal Studio Singapore',
      imageSrc: '/destination/universal.jpg',
      departure: 'กรุงเทพ',
      departureDate: 'พฤ 15 พ.ค.',
      destination: 'สิงคโปร์',
      arrivalDate: 'อา 17 พ.ค.',
      duration: '(3 วัน 2 คืน)',
      voyagerCount: 1,
      total: 16990,
      isChecked: false,
    },
    {
      id: 2,
      title:
        'แพ็คเกจเที่ยว ญี่ปุ่น โตเกียว พร้อมที่พัก 5 วัน 4 คืน  ภูเขาไฟฟูจิ วัดอาซากุสะ Tokyo Disney land ',
      imageSrc: '/destination/japan.jpg',
      departure: 'กรุงเทพ',
      departureDate: 'ศ 12 มิ.ย.',
      destination: 'โตเกียว',
      arrivalDate: 'พฤ 18 มิ.ย.',
      duration: '(5 วัน 4 คืน)',
      voyagerCount: 2,
      total: 35800,
      isChecked: false,
    },
  ]);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleCheckboxChange = (itemId) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      );
      const newTotalAmount = updatedCartItems.reduce((sum, item) => {
        return item.isChecked ? sum + item.total : sum;
      }, 0);
      setTotalAmount(newTotalAmount);
      return updatedCartItems;
    });
  };

  const handleDelete = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handlePayment = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
    if (selectedItems.length === 0) {
      const modal = document.getElementById('none_item_selection_modal');
      if (modal) {
        modal.showModal();
      }
    } else {
      console.log('สินค้าที่เลือก:', selectedItems);
      navigate('/payment');
    }
  };
  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[#FAFAFC] md:bg-[url('/bg-desktop.png')] min-h-screen flex justify-center ">
      <section className="bg-[#FAFAFC]  md:rounded-2xl my-6">
        <p className="text-2xl font-semibold mb-4 text-center pt-4">
          แพ็คเก็จที่ใส่ตะกร้าไว้
        </p>
        <div className=" mx-4 lg:mx-6  bg md:flex">
          <div>
            {cartItems.map((item) => (
              <CartItemUi
                key={item.id}
                {...item}
                onDelete={handleDelete}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </div>
          {/* Promotion and Total Price Section */}

          <div className="bg-white  shadow-xl p-6 md:w-80 card rounded-2xl md:ml-4 my-4 h-fit">
            <div className="mb-4">
              <label
                htmlFor="promo-code"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Enter Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="promo-code"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Promo Code"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
                  Submit
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Promotions</h3>

            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Subtotal</p>
              <p className="text-gray-900 font-semibold">฿ {totalAmount}</p>
            </div>
            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm ">Discount</p>
              <p className=" font-semibold text-red-500">฿ 0</p>
            </div>

            <div className="border-t border-gray-200 pt-2 mb-4">
              <p className="text-gray-700 text-sm">Estimated Total</p>
              <p className="text-gray-900 font-semibold"> ฿ {totalAmount}</p>
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
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </section>
    </div>
  );
}

export default Cart;
