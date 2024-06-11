import React from 'react'

const UserDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row md:p-16 bg-gray-100">
  <div className="flex flex-col shadow-xl bg-white md:rounded-2xl md:py-10 md:px-8 md:w-[25%] md:mt-14 md:mb-64 md:mr-8">
    <div className="flex content-center justify-center">
      <p className="text-xl md:hidden font-extrabold py-4">ตั้งค่าบัญชี</p>
    </div>
    <p className="text-xl border-gray-400 border md:border-0 py-2 pl-8">บัญชีของคุณ</p>
    <p className="text-xl border-gray-400 border-x md:border-0 py-2 pl-8">ประวัติการจอง</p>
    <p className="text-xl border-gray-400 border md:border-0 py-2 pl-8">ข้อมูลผู้เดินทาง</p>
    <p className="text-xl border-gray-400 border-x md:border-0 py-2 pl-8">ทริปที่คุณกดถูกใจ</p>
    <p className="text-xl border-gray-400 border md:border-0 py-2 pl-8">เปลี่ยนแปลง รหัสผ่าน</p>
  </div>

  <form>
    <div className="flex content-center justify-center md:justify-start md:px-12">
      <p className="text-xl md:text-4xl font-extrabold py-4">แก้ไขโปรไฟล์</p>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-3 pb-2 md:px-12 md:py-6">
      <figure className="w-[20%] md:w-[12%] block">
        <img src="/avatar-profile.svg" alt="" />
      </figure>
      <button className="btn-sm rounded-xl bg-[#5F97FB] text-white text-md md:px-6 md:ml-12 md:mr-6">
        อัพโหลดรูปภาพ
      </button>
      <p className="text-md text-red-500 font-bold">ลบรูปภาพ</p>
    </div>

    <div className="pl-12 pr-8 pb-6 md:pb-12 flex flex-col gap-2 md:gap-4">
      <div className="flex content-center justify-center md:justify-start">
        <p className="text-lg md:text-2xl font-extrabold">ข้อมูลผู้ใช้งาน</p>
      </div>

      <div className="flex flex-col md:flex-row gap-1">
        <p className="text-xl md:w-[15%] md:self-center">ชื่อผู้ใช้</p>
        <div className="flex justify-between md:w-[85%]">
          <input type="text" className="border-2 border-gray-300 rounded-md text-xl p-1 inline-block w-[90%]" />
          <a href="#" className="inline invisible">
            <img src="/pencil.svg" alt="" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <p className="text-xl md:w-[15%] md:self-center">ชื่อ</p>
        <div className="flex justify-between md:w-[85%]">
          <input type="text" className="border-2 border-gray-300 rounded-md text-xl p-1 inline-block w-[90%]" />
          <a href="#" className="inline">
            <img src="/pencil.svg" alt="" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <p className="text-xl md:w-[15%] md:self-center">นามสกุล</p>
        <div className="flex justify-between md:w-[85%]">
          <input type="text" className="border-2 border-gray-300 rounded-md text-xl p-1 inline-block w-[90%]" />
          <a href="#" className="inline">
            <img src="/pencil.svg" alt="" />
          </a>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <p className="text-xl md:w-[15%] md:self-center">อีเมล</p>
        <div className="flex justify-between md:w-[85%]">
          <input type="text" className="border-2 border-gray-300 rounded-md text-xl p-1 inline-block w-[90%]" />
          <a href="#" className="inline">
            <img src="/pencil.svg" alt="" />
          </a>
        </div>
      </div>
    </div>

    <div className="px-8 md:px-12">
      <div className="flex content-center justify-center md:justify-start md:py-6 md:border-dotted md:border-t-2">
        <p className="text-lg md:text-2xl font-extrabold">การติดตาม</p>
      </div>
      <div className="flex gap-4 py-4 md:p-0">
        <input type="checkbox" className="w-6 drop-shadow-md" />
        <p className="text-xl">
          ไม่พลาดทุกดีลเด็ด! ลงทะเบียนรับข่าวสาร และส่วนลดสุดพิเศษทางอีเมล
        </p>
      </div>
    </div>

    <div className="mt-auto">
      <div className="shadow-md h-2 md:shadow-none z-10 relative"></div>
      <div className="flex content-center gap-3 bg-white md:bg-transparent md:w-full justify-center py-3 md:pt-12">
        <button className="btn rounded-full bg-[#5F97FB] text-white text-xl">
          อัพเดตการเปลี่ยนแปลง
        </button>
      </div>
    </div>
  </form>
</div>

  )
}

export default UserDashboard