import { useState } from 'react';

function UserCheckout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassenger, setCurrentPassenger] = useState('');
  const [passengers, setPassengers] = useState({
    A: { firstName: '', lastName: '' },
    B: { firstName: '', lastName: '' },
  });

  const openModal = (passenger) => {
    setCurrentPassenger(passenger);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengers((prev) => ({
      ...prev,
      [currentPassenger]: {
        ...prev[currentPassenger],
        [name]: value,
      },
    }));
  };

  const savePassengerInfo = () => {
    closeModal();
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/bg.svg')] py-8 px-4 md:py-16 md:px-48">
      <section className="bg-white rounded-3xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold pt-8 pb-10">
            รายละเอียดการจอง
          </h1>
        </div>
        <div className="md:flex md:pb-6">
          <div className="hidden md:block px-16 md:w-1/2 border-r border-gray-200">
            <img
              src="/destination/aquarium.jpg"
              alt="Okinawa Aquarium"
              className="rounded-3xl shadow-lg"
            />
            <p className="text-lg font-normal py-4 text-gray-700">
              แพ็คเกจเที่ยว โอกินาว่า 4 วัน 3 คืน รวมตั๋วเครื่องบิน ที่พัก
              ร้านอาหาร และ ตั๋วเข้าชมพิพิธภัณฑ์สัตว์น้ำชุราอูมิ
              พร้อมบริการผู้ช่วยส่วนตัวตลอด 24 ชั่วโมง ตั้งแต่เริ่มจนจบ ทริป
              สำหรับ 1 ท่าน{' '}
              <strong className="text-blue-600 cursor-pointer hover:underline">
                อ่านเงื่อนไขเพิ่มเติมคลิก
              </strong>
            </p>
          </div>
          <div className="md:w-1/2 md:px-10">
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-gray-50">
              <h2 className="text-2xl font-extrabold py-4 text-gray-800">
                เที่ยวญี่ปุ่น โอกินาว่า ปราสาทชูริ พิพิธภัณฑ์สัตว์น้ำชุราอูมิ
                โอกินาว่าเวิลด์
              </h2>
              <div className="flex justify-between items-center">
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-gray-700">
                    กรุงเทพ
                  </p>
                  <p className="font-bold bg-blue-100 text-blue-800 rounded-full px-3 py-1 mt-2">
                    พฤ 9 พ.ค.
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <img
                    src="../../assets/planeBlue.svg"
                    alt="Plane icon"
                    className="w-10 h-10"
                  />
                  <p className="font-semibold text-red-500 mt-2">
                    (4 วัน 3 คืน)
                  </p>
                </div>
                <div className="flex-col flex items-center">
                  <p className="font-extrabold text-xl text-gray-700">
                    โอกินาว่า
                  </p>
                  <p className="font-bold bg-blue-100 text-blue-800 rounded-full px-3 py-1 mt-2">
                    อา 12 พ.ค.
                  </p>
                </div>
              </div>
              <button className="flex mt-4 text-lg text-blue-600 items-center hover:underline">
                <span>อ่านรายละเอียดโปรแกรมแบบเต็มๆ</span>
                <span className="text-2xl ml-2">&#8227;</span>
              </button>
              <button className="flex mt-2 text-lg text-blue-600 items-center hover:underline">
                <span>นโยบาย | ข้อควรรู้ก่อนออกเดินทาง</span>
                <span className="text-2xl ml-2">&#8227;</span>
              </button>
            </div>
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
              <h2 className="text-2xl font-extrabold py-4 text-gray-800">
                ผู้โดยสาร
              </h2>
              {Object.entries(passengers).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center border-b border-gray-200 py-3"
                >
                  <p className="text-lg">
                    ผู้โดยสาร {key}: {value.firstName} {value.lastName}
                  </p>
                  <button
                    onClick={() => openModal(key)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <img src="/pencil.svg" alt="Edit" className="w-5 h-5" />
                  </button>
                </div>
              ))}
              <button className="btn btn-outline btn-info w-full mt-4">
                +เพิ่มผู้โดยสาร
              </button>
            </div>
            <div className="rounded-3xl shadow-lg px-8 py-6 mb-6 bg-white">
              <h2 className="text-2xl font-extrabold py-4 text-gray-800">
                ข้อมูลการชำระเงิน
              </h2>
              <div className="flex justify-between items-center font-semibold text-gray-700">
                <p className="text-lg py-2">Package Okinawa A x 2</p>
                <p>฿ 59,900</p>
              </div>
              <div className="flex justify-between items-center text-red-600 font-semibold">
                <p className="text-lg py-2">ส่วนลดห้องพัก</p>
                <p>฿ -7,500</p>
              </div>
            </div>

            <div className="flex justify-between px-6 py-4 bg-blue-50 rounded-xl mt-4 text-base-content">
              <div className="flex flex-col">
                <p className="text-sm font-bold text-gray-600">
                  ยอดชำระเงินทั้งหมด
                </p>
                <p className="text-3xl font-bold text-gray-800">฿ 52,400</p>
              </div>
              <button className="btn btn-primary rounded-full text-xl">
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DaisyUI Modal */}
      <dialog
        id="passenger_modal"
        className={`modal ${isModalOpen ? 'modal-open' : ''}`}
      >
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            กรอกข้อมูลผู้โดยสาร {currentPassenger}
          </h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ชื่อ</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={passengers[currentPassenger]?.firstName || ''}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">นามสกุล</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={passengers[currentPassenger]?.lastName || ''}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-primary" onClick={savePassengerInfo}>
              บันทึก
            </button>
            <button className="btn" onClick={closeModal}>
              ยกเลิก
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default UserCheckout;
