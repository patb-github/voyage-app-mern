import React from 'react'

const Landingpage = () => {
  return (
    <div>
        <section className="bg-white md:px-12md:mx-12">

  <div className="relative w-full">
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="../../assets/slide/santorini.jpg"
          className="w-full"
          alt="Travel Fest"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">❮</a>
          <a href="#slide2" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="../../assets/slide/Neuschwanstein.jpg"
          className="w-full"
          alt="Discount Code"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">❮</a>
          <a href="#slide3" className="btn btn-circle">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="../../assets/slide/Shirakawako.jpg"
          className="w-full"
          alt="Summer Sales"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">❮</a>
          <a href="#slide1" className="btn btn-circle">❯</a>
        </div>
      </div>
    </div>

    <div className="search-box absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-50">
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="เลือกสถานที่ที่อยากไปเลย.."
          className="input input-bordered max-w-xs md:w-[80vw]"
          style={{ paddingLeft: "2.5rem" }}
        />
        <img
          src="../../assets/search.png"
          alt="Search Icon"
          style={{
            position: "absolute",
            top: "50%",
            left: "0.5rem",
            transform: "translateY(-50%)",
            width: "1.25rem",
            height: "1.25rem"
          }}
        />
      </div>
    </div>
  </div>

 
  <div className="md:mx-[5%] my-14 mx-4">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">ข้อเสนอสำหรับคุณ</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <a href="">
          <img
            src="../../assets/destination/discount.jpg"
            alt=""
            className="rounded-lg"
          />
        </a>
        <a href="">
          <img
            src="../../assets/destination/fuji.jpg"
            alt=""
            className="rounded-lg"
          />
        </a>
        <a href="">
          <img
            src="../../assets/destination/thai.jpg"
            alt=""
            className="rounded-lg"
          />
        </a>
        <a href="">
          <img
            src="../../assets/destination/europe.jpg"
            alt=""
            className="rounded-lg"
          />
        </a>
      </div>
    </div>

 
    <h2 className="text-2xl font-semibold mb-4">ที่คุณกดถูกใจไว้</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <a href="">
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="../../assets/destination/universal.jpg"
              alt="Universal Studio Singapore"
            />
          </figure>
          <div className="card-body px-2 md:px-3 py-2">
            <h2 className="card-title text-sm md:text-lg">
              แพ็คเกจเที่ยว สิงคโปร์ Universal Studio Singapore รวม อาหาร
              และ ที่พัก
            </h2>

            <div className="flex gap-2 justify-between">
              <div className="flex items-center my-2">
                <img
                  src="../../assets/location.png"
                  className="w-4 h-4 mr-1"
                  alt="Location Icon"
                />
                <p>สิงคโปร์</p>
              </div>
              <div className="flex items-center my-2">
                <span className="text-yellow-500">&#9733;</span>
                <p className="ml-1 text-sm">4.7 (348 รีวิว)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className="badge badge-info max-w-28 text-white font-semibold">
                ขายดีที่สุด
              </p>
              <p className="badge badge-info max-w-28 text-white font-semibold">
                3 วัน 2 คืน
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold">฿ 16,990</p>
            </div>
          </div>
        </div>
      </a>
      <a href="">
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="../../assets/destination/okinawaAquarium.jpg"
              alt="Universal Studio Singapore"
            />
          </figure>
          <div className="card-body px-2 md:px-3 py-2">
            <h2 className="card-title text-sm md:text-lg">
              แพ็คเกจเที่ยวญี่ปุ่น โอกินาว่า พิพิธภัณฑ์สัตว์น้ำชุราอูมิ
              โอกินาว่าเวิลด์
            </h2>

            <div className="flex gap-2 justify-between">
              <div className="flex items-center my-2">
                <img
                  src="../../assets/location.png"
                  className="w-4 h-4 mr-1"
                  alt="Location Icon"
                />
                <p>ญี่ปุ่น</p>
              </div>
              <div className="flex items-center my-2">
                <span className="text-yellow-500">&#9733;</span>
                <p className="ml-1 text-sm">4.8 (263 รีวิว)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className="badge badge-info max-w-28 text-white font-semibold">
                ขายดีที่สุด
              </p>
              <p className="badge badge-info max-w-28 text-white font-semibold">
                4 วัน 3 คืน
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold">฿ 29,950</p>
            </div>
          </div>
        </div>
      </a>
      <a href="">
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="../../assets/destination/russia.jpg"
              alt="Universal Studio Singapore"
            />
          </figure>
          <div className="card-body px-2 md:px-3 py-2">
            <h2 className="card-title text-sm md:text-lg">
              แพ็คเกจเที่ยวรัสเซีย มอสโคว์ เซนต์ปีเตอร์สเบิร์ก
              พระราชวังเครมลิน
            </h2>

            <div className="flex gap-2 justify-between">
              <div className="flex items-center my-2">
                <img
                  src="../../assets/location.png"
                  className="w-4 h-4 mr-1"
                  alt="Location Icon"
                />
                <p>รัซเซีย</p>
              </div>
              <div className="flex items-center my-2">
                <span className="text-yellow-500">&#9733;</span>
                <p className="ml-1 text-sm">4.3 (89 รีวิว)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className="badge badge-info max-w-28 text-white font-semibold">
                7 วัน 5 คืน
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold">฿ 56,990</p>
            </div>
          </div>
        </div>
      </a>
      <a href="">
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="../../assets/destination/paris.jpg"
              alt="Universal Studio Singapore"
            />
          </figure>
          <div className="card-body px-2 md:px-3 py-2">
            <h2 className="card-title text-sm md:text-lg">
              แพ็คเกจเที่ยว ฝรั่งเศส อาวิญง คานส์ นีซ ปารีส รวมอาหาร และ
              ที่พัก
            </h2>

            <div className="flex gap-2 justify-between">
              <div className="flex items-center my-2">
                <img
                  src="../../assets/location.png"
                  className="w-4 h-4 mr-1"
                  alt="Location Icon"
                />
                <p>ฝรั่งเศษ</p>
              </div>
              <div className="flex items-center my-2">
                <span className="text-yellow-500">&#9733;</span>
                <p className="ml-1 text-sm">4.6 (132 รีวิว)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <p className="badge badge-info max-w-28 text-white font-semibold">
                10 วัน 8 คืน
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg font-bold">฿ 149,900</p>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div className="flex justify-center pt-4">
      <button className="btn btn-wide rounded-full bg-[#5F97FB] text-white text-base">
        ดูเพิ่มเติม
      </button>
    </div>
  </div>
  <button className="btn rounded-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </button>
</section>

    </div>
  )
}

export default Landingpage