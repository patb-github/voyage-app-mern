import { useState, useContext } from 'react';
import {
  faCartShopping,
  faLocationDot,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams, Navigate } from 'react-router-dom';
import { allTrips, getTripByName } from '../../assets/allTrips';
import UserContext from '../../context/UserContext';

const ContentHead = ({ trip }) => {
  return (
    <div>
      <p className="text-2xl font-extrabold py-4 px-8 md:px-0">{trip.title}</p>
      <div className="flex flex-row place-content-between px-8 md:px-0">
        <div className="flex gap-2 content-center">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="fa-xl"
            style={{ color: '#fd003a' }}
          />
          <p>{`${trip.destination_to}, ${trip.country}`}</p>
        </div>
        <div className="flex gap-2">
          <FontAwesomeIcon
            icon={faStar}
            className="fa-xl"
            style={{ color: '#ffc107' }}
          />
          <p>{`${trip.rating} (${trip.num_reviews} รีวิว)`}</p>
        </div>
      </div>
      <div className="flex justify-between md:justify-center items-center py-4 px-12 md:gap-12">
        <div className="flex-col flex items-center gap-2">
          <p className="font-extrabold text-xl">{trip.destination_from}</p>
          <p className="font-bold bg-gray-200 rounded-full p-2">
            {trip.start_date}
          </p>
        </div>
        <div className="flex-col flex items-center gap-2">
          <img src="/planeBlue.svg" alt="" />
          <p className="font-semibold text-red-500">(4 วัน 3 คืน)</p>
        </div>
        <div className="flex-col flex items-center gap-2">
          <p className="font-extrabold text-xl">{trip.destination_to}</p>
          <p className="font-bold bg-gray-200 rounded-full p-2">
            {trip.end_date}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({ showDetail, setShowDetail, trip }) => {
  return (
    <div
      className={`${
        showDetail ? '' : 'hidden'
      } md:flex md:flex-col md:pb-2 md:h-full pb-[88px]`}
    >
      <p className="text-xl font-normal px-8 pt-4 text-center md:hidden">
        {trip.description}
      </p>
      <div
        className="flex flex-col content-center px-8
                    md:rounded-3xl md:shadow-xl md:grow
                    md:outline md:outline-1 md:outline-gray-200"
      >
        <h2 className="font-semibold text-3xl text-center py-8">
          สิ่งที่รวมในแพ็คเกจ
        </h2>
        <ul>
          {trip.subexpenses.map((item, i) => (
            <li key={i} className="flex justify-between">
              <p className="text-xl font-normal">{item[0]}</p>
              <p className="text-xl font-normal">{`฿${item[1]}`}</p>
            </li>
          ))}
        </ul>
        <br />
        <br />
        <div className="mt-auto flex justify-between py-4 border-t border-black">
          <p className="text-xl font-normal align-middle">ยอดรวม</p>
          <p className="text-2xl font-semibold align-middle">฿{trip.price}</p>
        </div>
        <p
          className="font-semibold underline text-center md:hidden"
          onClick={() => setShowDetail(false)}
        >
          ดูรายละเอียดแบบย่อ
        </p>
      </div>
    </div>
  );
};

const ProductCarousel = ({ classes, trip }) => {
  return (
    <div className={`carousel w-full ${classes}`}>
      <div id="slide1" className="carousel-item relative w-full">
        <img src={trip.imageSrc} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

const UserProductPage = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [showMedal, setShowMedal] = useState(false); // State for medal
  const { user, setUserData } = useContext(UserContext); // Access user context
  const { tripname } = useParams();
  const trip = getTripByName(allTrips, tripname);
  if (trip === null) {
    return <Navigate to="/error" />;
  }

  const handleAddToCart = () => {
    if (user) {
      const updatedCart = [
        ...user.cart,
        { ...trip, isChecked: false, total: trip.price },
      ];
      setUserData((prevUserData) =>
        prevUserData.map((u) =>
          u.id === user.id
            ? {
                ...u,
                cart: updatedCart,
              }
            : u
        )
      );
    }
    setShowMedal(true);
    setTimeout(() => setShowMedal(false), 3000); // Hide medal after 3 seconds
  };

  return (
    <div className="h-full bg-cover bg-center bg-no-repeat bg-[url('/bg-desktop.webp')] md:py-16 md:px-48">
      <section className="bg-white md:rounded-3xl h-full">
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
          <div className="md:flex md:flex-col md:h-auto md:w-[50%] md:px-16 md:border-r md:border-r-black">
            <ProductCarousel
              classes={
                'md:rounded-3xl fixed bottom-[50%] h-[50%] w-full object-cover md:relative md:h-[60%] md:bottom-auto'
              }
              trip={trip}
            />
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or ✕ or click outside to close
                </p>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <ProductCarousel trip={trip} />
                </form>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <div className="hidden md:block">
              <ContentHead trip={trip} />
            </div>
            <p className="text-xl font-normal px-8 md:px-0 text-center">
              {trip.description}
            </p>
          </div>

          {/* ส่วนรายละเอียดการจอง */}
          <div
            className="fixed top-[45%] h-[55%] w-full bg-white rounded-t-[2rem] flex flex-col justify-between overflow-y-auto
                          md:relative md:w-[50%] md:h-auto md:px-16 md:overflow-y-visible md:pb-0"
          >
            <div className="md:hidden">
              <ContentHead trip={trip} />
              <div
                className={`bg-[#B9FFFB] rounded-3xl px-6 py-3 mx-12 ${
                  showDetail ? 'hidden' : ''
                }`}
              >
                <p>
                  โปรแกรมท่องเที่ยว โอกินาว่า แบบ All in one ไม่ต้อง
                  ปวดหัวกับการจอง ตั๋วเครื่องบิน โรงแรม ร้านอาหาร เพราะ Vovage
                  จัดการให้หมดแล้ว
                </p>
                <p
                  className="font-semibold underline"
                  onClick={() => setShowDetail(true)}
                >
                  ดูรายละเอียดแบบเต็มๆ
                </p>
              </div>
            </div>
            <ProductDetails
              showDetail={showDetail}
              setShowDetail={setShowDetail}
              trip={trip}
            />
            <div className="fixed bottom-0 w-full bg-white md:bg-transparent md:relative md:mt-auto">
              <div className="shadow-md h-2 md:shadow-none"></div>
              <div className="flex justify-between md:justify-start p-4 text-base-content px-8 md:px-0">
                <div className="flex flex-col justify-center md:hidden">
                  <p className="text-xs font-bold">ยอดชำระเงินทั้งหมด</p>
                  <p className="text-2xl font-bold">{`฿${trip.price}`}</p>
                </div>
                <div className="flex content-center gap-3 md:w-full md:justify-end">
                  <div className="flex gap-3">
                    <button
                      className="btn btn-circle outline outline-1 outline-gray-300 bg-white"
                      onClick={handleAddToCart}
                    >
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="fa-2x"
                        style={{ color: '#000000' }}
                      />
                    </button>
                    {showMedal && (
                      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
                        สินค้าเพิ่มใส่ในตะกร้าแล้ว
                      </div>
                    )}
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
  );
};

export default UserProductPage;
