import React, { useState, useEffect } from 'react';
import CartItemUi from './CartItemUi';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'แพ็คเกจเที่ยว สิงคโปร์ Universal Studio Singapore',
      imageSrc: '/destination/universal.jpg',
      departure: 'กรุงเทพ',
      departureDate: 'พฤ 15 พ.ค.',
      destination: 'สิงคโปร์',
      arrivalDate: 'อา 17 พ.ค.',
      duration: '(3 วัน 2 คืน)',
      voyagerCount: 1,
      total: 16990,
    },
    {
      id: 2,
      title: 'แพ็คเกจเที่ยว ญี่ปุ่น โตเกียว',
      imageSrc: '/destination/japan.jpg',
      departure: 'กรุงเทพ',
      departureDate: 'ศ 12 มิ.ย.',
      destination: 'โตเกียว',
      arrivalDate: 'พฤ 18 มิ.ย.',
      duration: '(5 วัน 4 คืน)',
      voyagerCount: 2,
      total: 35800,
    },
  ]);

  const [totalAmount, setTotalAmount] = useState(0);
  const handleDelete = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    const newTotalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  return (
    <div className="bg-cover bg-center bg-no-repeat bg-[url('/bg-desktop.png')] min-h-screen flex justify-center items-center">
      <section className="bg-[#FAFAFC] md:mx-[2%]   md:rounded-2xl md:min-w-[90%]">
        <div className=" mx-4 lg:mx-6 py-10">
          <p className="text-2xl font-semibold mb-4 text-center ">
            แพ็คเก็จที่ใส่ตะกร้าไว้
          </p>
          <div>
            {cartItems.map((item) => (
              <CartItemUi key={item.id} {...item} onDelete={handleDelete} />
            ))}
          </div>

          {/* ส่วนแสดงยอดรวมทั้งหมด */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">ยอดชำระเงินทั้งหมด</p>
            </div>
            <div className="flex justify-end items-center mt-2">
              <p className="text-2xl font-bold text-gray-800 mr-3">
                ฿ {totalAmount}
              </p>
              <button className="btn rounded-full bg-[#5F97FB] text-white text-xl">
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
