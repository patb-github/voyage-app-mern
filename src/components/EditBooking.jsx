import React from 'react'

const EditBooking = () => {
  return (
    <section
  className="bg-white md:mx-[2%] md:my-24 md:rounded-3xl md:flex md:min-w-[90%]"
>
  <div className="hidden md:block">
    <img
      src="/destination/aquarium.jpg"
      alt=""
      className="min-w-[400px] rounded-3xl"
    />
    <p className="text-xl font-semibold py-4">
      Trip description ... Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. adipiscing
      elit, sed do eiusmod. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. adipiscing
      elit, sed do eiusmod.
    </p>
  </div>
  <div className="md:min-w-[60%]">
    <div className="rounded-3xl shadow-xl px-8 py-6 mx-6">
      <p className="text-xl font-extrabold py-4">
        เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำชุราอูมิ โอกินาว่าเวิลด์
      </p>
      <div className="flex justify-between items-center">
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
      <p className="text-l py-2">ผู้โดยสาร A</p>
      <hr />
      <p className="text-l py-2">ผู้โดยสาร B</p>
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
      <div className="flex flex-col items-end">
        <p className="text-xs font-bold">ยอดชำระเงินทั้งหมด</p>
        <p className="text-2xl font-bold">฿ 52,400</p>
      </div>
    </div>

    <div className="flex justify-center p-4 bg-white mt-4 text-base-content">
      <aside>
        <button className="btn rounded-full bg-red-500 text-white text-xl">
          ขอคืนเงิน/ยกเลิกคำสั่งซื้อ
        </button>
      </aside>
    </div>
  </div>
</section>

  )
}

export default EditBooking