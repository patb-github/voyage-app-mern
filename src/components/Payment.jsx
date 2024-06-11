import React from 'react'

const Payment = () => {
  return (
    <div className="flex flex-col items-center">
  <div className="bg-white p-4 rounded-2xl shadow-lg min-w-[390px] max-w-[390px]">
    <p className="font-bold">
      เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำ ชุราอูมิ
      โอกินาว่าเวิลด์
    </p>
    <div className="flex-grow">
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">กรุงเทพ</p>
          <p className="badge badge-ghost p-4">พฤ 15 พ.ค.</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/planeBlue.svg" alt="" />
          <p className="text-error">(3 วัน 2 คืน)</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">สิงคโปร์</p>
          <p className="badge badge-ghost p-4">อา 17 พ.ค.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between mt-4 md:mt-8 px-4 md:px-8">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="card-title text-info">
            จำนวน Voyager
            <div className="badge badge-info text-white h-7 w-7 ml-2">1</div>
          </h2>
        </div>

        <div className="flex items-baseline gap-2 text-2xl font-bold">
          <p>ยอดรวม</p>
          <p className="text-gray-800">฿ 16,990</p>
        </div>
      </div>
    </div>
  </div>
  <div className="flex items-center py-4">
    <input
      type="checkbox"
      checked="checked"
      className="checkbox checkbox-primary mx-2"
    />
    <div className="bg-white p-4 w-full rounded-2xl shadow-lg min-w-[350px] max-w-[350px]">
      <p className="font-extrabold text-2xl">บัตรเครดิต / บัตรเดบิต</p>
      <div className="flex gap-5">
        <img src="/visa_logo.svg" alt="" />
        <img src="/mastercard_logo.svg" alt="" />
        <img src="/assets/jcb_logo.svg" alt="" />
        <img src="/assets/unionpay_logo.svg" alt="" />
      </div>
    </div>
  </div>
</div>

  )
}

export default Payment