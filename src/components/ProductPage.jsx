import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCartShopping,
  faHeart,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const ProductPage = () => {
  return (
    <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')] md:py-16 md:px-32">
      <section className="bg-white md:rounded-3xl h-full ">
        {/* ส่วนของปุ่มกลับ และหัวข้อ */}
        <div className="flex justify-center relative z-10">
          <Link to="../landingpage">
            <button className="btn rounded-full bg-white hover:bg-white w-12 fixed top-5 left-5 md:hidden">
              <img src="/back_button.svg" alt="Back Button" />
            </button>
          </Link>
          <p className="text-4xl font-extrabold pt-8 pb-10 hidden md:block">
            ตัวเลือกการจอง
          </p>
        </div>

        {/* ส่วนเนื้อหาหลัก */}
        <div className="flex flex-col md:flex-row md:pb-8">
          {/* ส่วนรูปภาพและคำอธิบายแพ็คเกจ */}
          <div className="md:flex md:flex-col md:h-auto md:w-[55%] md:px-16 md:border-r md:border-r-black">
            <img
              src="/destination/aquarium.jpg"
              alt="แพ็คเกจเที่ยว โอกินาว่า"
              className="md:rounded-3xl fixed bottom-[50%] h-[50%] w-full object-cover md:relative md:h-[60%] md:bottom-auto"
            />
            <p className="hidden md:block text-xl font-normal py-4">
              แพ็คเกจเที่ยว โอกินาว่า 4 วัน 3 คืน รวมตั๋วเครื่องบิน ที่พัก
              ร้านอาหาร และ ตั๋วเข้าชมพิพิธภัณฑ์สัตว์น้ำชุราอูมิ
              พร้อมบริการผู้ช่วยส่วนตัวตลอด 24 ชั่วโมง ตั้งแต่เริ่มจนจบ ทริป
              สำหรับ 1 ท่าน <strong>อ่านเงื่อนไขเพิ่มเติมคลิก</strong>
            </p>
          </div>

          {/* ส่วนรายละเอียดการจอง */}
          <div className="fixed top-[45%] h-[55%] w-full bg-white rounded-t-[2rem] flex flex-col md:relative md:w-[45%] md:h-auto md:px-12">
            <p className="text-2xl font-extrabold py-4 px-8">
              เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำชุราอูมิ
              โอกินาว่าเวิลด์
            </p>
            <div className="flex flex-row place-content-between px-8">
              <div className="flex gap-2 content-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="fa-xl"
                  style={{ color: '#fd003a' }}
                />
                {/* <i
                  className="fa-solid fa-location-dot fa-xl flex flex-col justify-center"
                  style={{ color: '#fd003a' }}
                ></i> */}
                <p>โอะกินะวะ, ญี่ปุ่น</p>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon
                  icon={faStar}
                  className="fa-xl"
                  style={{ color: '#ffc107' }}
                />
                {/* <i
                  className="fa-solid fa-star fa-xl flex flex-col justify-center"
                  style={{ color: '#ffc107' }}
                ></i> */}
                <p>4.8 (857 รีวิว)</p>
              </div>
            </div>

            {/* ส่วนแสดงรายละเอียดเที่ยวบิน */}
            <div className="flex justify-between items-center py-4 px-12">
              <div className="flex-col flex items-center">
                <p className="font-extrabold text-xl">กรุงเทพ</p>
                <p className="font-bold bg-gray-200 rounded-full p-2">
                  พฤ 9 พ.ค.
                </p>
              </div>
              <div className="flex-col flex items-center">
                <img src="/planeBlue.svg" alt="Plane" /> {/* แก้ไข path รูป */}
                <p className="font-semibold text-red-500">(4 วัน 3 คืน)</p>
              </div>
              <div className="flex-col flex items-center">
                <p className="font-extrabold text-xl">โอกินาว่า</p>
                <p className="font-bold bg-gray-200 rounded-full p-2">
                  อา 12 พ.ค.
                </p>
              </div>
            </div>

            {/* ส่วนโปรโมชั่น */}
            <div className="bg-[#B9FFFB] rounded-3xl px-6 py-3 mx-12">
              <p>
                โปรแกรมท่องเที่ยว โอกินาว่า แบบ All in one ไม่ต้อง
                ปวดหัวกับการจอง ตั๋วเครื่องบิน โรงแรม ร้านอาหาร เพราะ Vovage
                จัดการให้หมดแล้ว
              </p>
              <p className="font-semibold underline">
                <a href="#">ดูรายละเอียดแบบเต็มๆ</a>
              </p>
            </div>

            {/* ส่วนราคาและปุ่มต่างๆ */}
            <div className="mt-auto">
              <div className="shadow-md h-2 md:shadow-none"></div>
              <div className="flex justify-between p-4 text-base-content px-8">
                <div className="flex flex-col justify-center">
                  <p className="text-2xl font-bold">฿ 52,400</p>
                </div>
                <div className="flex content-center gap-3">
                  <button className="btn btn-circle bg-white outline outline-1 outline-gray-300">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="fa-2x"
                      style={{ color: '#d7443e' }}
                    />
                    {/* <i
                      className="fa-solid fa-heart fa-2x"
                      style={{ color: '#d7443e' }}
                    ></i> */}
                  </button>
                  <button className="btn btn-circle bg-white outline outline-1 outline-gray-300">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="fa-2x"
                      style={{ color: '#000000' }}
                    />
                    {/* <i
                      className="fa-solid fa-cart-shopping fa-2x"
                      style={{ color: '#000000' }}
                    ></i> */}
                  </button>
                  <button className="btn rounded-full bg-[#5F97FB] text-white text-xl">
                    ชำระเงิน
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
