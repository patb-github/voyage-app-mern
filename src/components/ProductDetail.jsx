import { faCartShopping, faHeart, faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

function ProductDetail() {
  return (
    <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')] md:py-16 md:px-32">
      <section className="bg-white md:rounded-3xl md:px-16 md:pb-16 h-full">
      {/* md:mx-[2%] md:my-12 md:min-w-[90%]*/}
      <div className="content-center justify-center hidden md:flex">
        <p className="text-xl md:text-4xl font-extrabold pt-8 pb-10">รายละเอียดแพ็คเกจ</p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-[50%] md:pr-16 md:border-r md:border-black">
          <figure className="p-8 md:p-0 md:w-full md:h-[45%]">
            <img src="/destination/aquarium.jpg"
            alt=""
            className="rounded-3xl w-full h-full " />
          </figure>
          <div className="hidden md:block">
            <p className="text-2xl font-extrabold py-4">
              เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำชุราอูมิ โอกินาว่าเวิลด์
            </p>  
            <div className="flex flex-row place-content-between">
              <div className="flex gap-2 content-center">
                <FontAwesomeIcon icon={faLocationDot} className="fa-xl" style={{ color: "#fd003a" }} />
                {/* <i className="fa-solid fa-location-dot fa-xl flex flex-col justify-center" style="color: #fd003a;"></i> */}
                <p>โอะกินะวะ, ญี่ปุ่น</p>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon icon={faStar} className="fa-xl" style={{ color: "#ffc107" }} />
                {/* <i className="fa-solid fa-star fa-xl flex flex-col justify-center" style="color: #ffc107;"></i> */}
                <p>4.8 (857 รีวิว)</p>
              </div>
            </div>
            <div className="flex justify-center items-center py-4 px-12 gap-12">
              <div className="flex-col flex items-center">
                <p className="font-extrabold text-xl">กรุงเทพ</p>
                <p className="font-bold bg-gray-200 rounded-full p-2">พฤ 9 พ.ค.</p>
              </div>
              <div className="flex-col flex items-center">
                <img src="/planeBlue.svg" alt="" />
                <p className="font-semibold text-red-500">(4 วัน 3 คืน)</p>
              </div>
              <div className="flex-col flex items-center">
                <p className="font-extrabold text-xl">โอกินาว่า</p>
                <p className="font-bold bg-gray-200 rounded-full p-2">อา 12 พ.ค.</p>
              </div>
            </div>
          </div>
          <p className="text-xl font-normal px-8 md:px-0">
            แพ็คเกจเที่ยว โอกินาว่า 4 วัน 3 คืน รวมตั๋วเครื่องบิน ที่พัก ร้านอาหาร และ 
            ตั๋วเข้าชมพิพิธภัณฑ์สัตว์น้ำชุราอูมิ  พร้อมบริการผู้ช่วยส่วนตัวตลอด
            24 ชั่วโมง ตั้งแต่เริ่มจนจบ ทริป สำหรับ 1 ท่าน <strong>อ่านเงื่อนไขเพิ่มเติมคลิก</strong>
          </p>
        </div>

        <div className="md:w-[50%] md:pl-16 md:flex md:flex-col">
          <div className="flex flex-col content-center px-8
                      md:rounded-3xl md:shadow-xl md:grow 
                      md:outline md:outline-1 md:outline-gray-200">
            <h2 className="font-semibold text-3xl text-center py-8">สิ่งที่รวมในแพ็คเกจ</h2>
            <ul>
              <li className="flex justify-between">
                <p className="text-xl font-normal">ตั๋วเครื่องบิน ไป-กลับ</p>
                <p className="text-xl font-normal">฿16,500</p>
              </li>
              <li className="flex justify-between">
                <p className="text-xl font-normal">Hilton Okinawa 3 คืน รวม อาหารเช้า</p>
                <p className="text-xl font-normal">฿7,500</p>
              </li>
              <li className="flex justify-between">
                <p className="text-xl font-normal">บัตรทานอาหาร</p>
                <p className="text-xl font-normal">฿4,500</p>
              </li>
              <li className="flex justify-between">
                <p className="text-xl font-normal">Okinawa Churaumi Aquarium</p>
                <p className="text-xl font-normal">฿700</p>
              </li>
              <li className="flex justify-between">
                <p className="text-xl font-normal">บริการรถรับส่งจากสนามบิน และ บริการผู้ช่วย</p>
                <p className="text-xl font-normal">฿750</p>
              </li>
            </ul>
            <br /><br />
            <div className="mt-auto flex justify-between py-4 border-t border-black">
              <p className="text-xl font-normal align-middle">ยอดรวม</p>
              <p className="text-2xl font-semibold align-middle">฿29,950</p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="shadow-md h-2 md:shadow-none"></div>
            <div className="flex justify-between md:justify-start p-4 text-base-content px-8 md:px-0">
              <div className="flex flex-col justify-center md:hidden">
                <p className="text-xs font-bold">ยอดชำระเงินทั้งหมด</p>
                <p className="text-2xl font-bold">฿ 29,950</p>
              </div>
              <div className="flex content-center gap-3 md:w-full md:justify-between">
                <div className="flex gap-3">
                  <button className="btn btn-circle btn-outline">
                    <FontAwesomeIcon icon={faHeart} className="fa-2x" style={{ color: "#d7443e" }} />
                    {/* <i className="fa-solid fa-heart fa-2x" style="color: #d7443e;"></i> */}
                  </button>
                  <button className="btn btn-circle btn-outline">
                    <FontAwesomeIcon icon={faCartShopping} className="fa-2x" style={{ color: "#000000" }} />
                    {/* <i className="fa-solid fa-cart-shopping fa-2x" style="color: #000000;"></i> */}
                  </button>
                </div>
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
  )
}

export default ProductDetail;