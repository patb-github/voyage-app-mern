function UserCheckout() {
  return (
    <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')] md:py-16 md:px-48">
      <section className="bg-white md:rounded-3xl">
        <div className="flex justify-center">
          <p className="text-xl md:text-4xl font-extrabold pt-8 pb-10 block">
            รายละเอียดการจอง
          </p>
        </div>
        <div className="md:flex md:pb-6">
          <div className="hidden md:block px-16 md:w-[50%] border-r border-black">
            <img
              src="/destination/aquarium.jpg"
              alt=""
              className="rounded-3xl"
            />
            <p className="text-xl font-normal py-4">
              แพ็คเกจเที่ยว โอกินาว่า 4 วัน 3 คืน รวมตั๋วเครื่องบิน ที่พัก
              ร้านอาหาร และ ตั๋วเข้าชมพิพิธภัณฑ์สัตว์น้ำชุราอูมิ
              พร้อมบริการผู้ช่วยส่วนตัวตลอด 24 ชั่วโมง ตั้งแต่เริ่มจนจบ ทริป
              สำหรับ 1 ท่าน <strong>อ่านเงื่อนไขเพิ่มเติมคลิก</strong>
            </p>
          </div>
          <div className="md:w-[50%] md:px-10">
            <div className="rounded-3xl shadow-xl px-8 py-6 mx-6">
              <p className="text-xl font-extrabold py-4">
                เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำชุราอูมิ
                โอกินาว่าเวิลด์
              </p>
              <div className="flex justify-between items-center">
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl">กรุงเทพ</p>
                  <p className="font-bold bg-gray-200 rounded-full p-2">
                    พฤ 9 พ.ค.
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <img src="../../assets/planeBlue.svg" alt="" />
                  <p className="font-semibold text-red-500">(4 วัน 3 คืน)</p>
                </div>
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl">โอกินาว่า</p>
                  <p className="font-bold bg-gray-200 rounded-full p-2">
                    อา 12 พ.ค.
                  </p>
                </div>
              </div>
              <button className="flex mt-2 text-xl bg-white items-center">
                <p>อ่านรายละเอียดโปรแกรมแบบเต็มๆ</p>
                <p className="text-4xl">&#8227;</p>
              </button>
              <button className="flex mt-2 text-xl bg-white items-center">
                <p>นโยบาย | ข้อควรรู้ก่อนออกเดินทาง</p>
                <p className="text-4xl">&#8227;</p>
              </button>
            </div>
            <div className="rounded-3xl shadow-xl px-8 py-6 mx-6">
              <p className="text-xl font-extrabold py-4">ผู้โดยสาร</p>
              <div className="flex justify-between items-center">
                <p className="text-l py-2">ผู้โดยสาร A</p>
                <a href="#">
                  <img src="/pencil.svg" alt="" />
                </a>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="text-l py-2">ผู้โดยสาร B</p>
                <a href="#">
                  <img src="/pencil.svg" alt="" />
                </a>
              </div>

              <div>
                <button className="btn border-cyan-300 items-center w-full mt-2 bg-white hover:bg-white">
                  +เพิ่มผู้โดยสาร
                </button>
              </div>
            </div>
            <div className="rounded-3xl shadow-xl px-8 py-6 mx-6">
              <p className="text-xl font-extrabold py-4">ข้อมูลการชำระเงิน</p>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-l py-2">Package Okinawa A x 2</p>
                <p>฿ 59900</p>
              </div>
              <div className="flex justify-between items-center text-red-600 font-semibold">
                <p className="text-l py-2">ส่วนลดห้องพัก</p>
                <p>฿ - 7500</p>
              </div>
            </div>

            <div className="flex justify-between px-6 py-4 bg-transparent mt-4 text-base-content">
              <div className="flex flex-col content-center">
                <p className="text-xs font-bold">ยอดชำระเงินทั้งหมด</p>
                <p className="text-2xl font-bold">฿ 52,400</p>
              </div>
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

export default UserCheckout;
