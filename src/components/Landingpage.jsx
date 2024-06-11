import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// คอมโพเนนต์ Slide
const Slide = ({
  imageSrc,
  altText,
  slideId,
  prevSlide,
  nextSlide,
  onSlideChange,
}) => (
  <div id={slideId} className="carousel-item relative w-full">
    <img src={imageSrc} className="w-full" alt={altText} />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a
        href={`#${prevSlide}`}
        className="btn btn-circle"
        onClick={() => onSlideChange(prevSlide)}
      >
        ❮
      </a>
      <a
        href={`#${nextSlide}`}
        className="btn btn-circle"
        onClick={() => onSlideChange(nextSlide)}
      >
        ❯
      </a>
    </div>
  </div>
);

// คอมโพเนนต์ Offer
const Offer = ({ imageSrc, altText }) => (
  <a href="">
    <img src={imageSrc} alt={altText} className="rounded-lg" />
  </a>
);

// คอมโพเนนต์ LikedItem
const LikedItem = ({ imageSrc, title, location, rating, tags, price }) => (
  <a href="">
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={imageSrc} alt={title} />
      </figure>
      <div className="card-body px-2 md:px-3 py-2">
        <h2 className="card-title text-sm md:text-lg">{title}</h2>
        <div className="flex gap-2 justify-between">
          <div className="flex items-center my-2">
            <img
              src="location.png"
              className="w-4 h-4 mr-1"
              alt="Location Icon"
            />
            <p>{location}</p>
          </div>
          <div className="flex items-center my-2">
            <span className="text-yellow-500">&#9733;</span>
            <p className="ml-1 text-sm">{rating}</p>
          </div>
        </div>
        <div className="flex gap-4">
          {tags.map((tag) => (
            <p
              key={tag}
              className="badge badge-info max-w-28 text-white font-semibold"
            >
              {tag}
            </p>
          ))}
        </div>
        <div className="flex items-center">
          <p className="text-lg font-bold">฿ {price}</p>
        </div>
      </div>
    </div>
  </a>
);

// ข้อมูลสำหรับ Offers
const offers = [
  { id: 1, imageSrc: '/destination/discount.jpg', altText: 'Discount Offer' },
  { id: 2, imageSrc: '/destination/fuji.jpg', altText: 'Fuji Offer' },
  { id: 3, imageSrc: '/destination/thai.jpg', altText: 'Thai Offer' },
  { id: 4, imageSrc: '/destination/europe.jpg', altText: 'Europe Offer' },
];

// ข้อมูลสำหรับ LikedItems
const likedItems = [
  {
    id: 1,
    imageSrc: '/destination/universal.jpg',
    title:
      'แพ็คเกจเที่ยว สิงคโปร์ Universal Studio Singapore รวม อาหาร และ ที่พัก',
    location: 'สิงคโปร์',
    rating: 4.7,
    tags: ['ขายดีที่สุด', '3 วัน 2 คืน'],
    price: 16990,
  },
  {
    id: 2,
    imageSrc: '/destination/okinawaAquarium.jpg',
    title:
      'แพ็คเกจเที่ยวญี่ปุ่น โอกินาว่า พิพิธภัณฑ์สัตว์น้ำชุราอูมิ โอกินาว่าเวิลด์',
    location: 'ญี่ปุ่น',
    rating: 4.8,
    tags: ['ขายดีที่สุด', '4 วัน 3 คืน'],
    price: 29950,
  },
  // ... เพิ่มข้อมูล LikedItems อื่นๆ ...
];

const Landingpage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [count, setCount] = useState(0);
  const carouselRef = useRef(null);

  const handleSlideChange = (newIndex) => {
    setCurrentSlide(newIndex);
  };

  useEffect(() => {
    let interval;

    const startSlide = () => {
      interval = setInterval(() => {
        handleSlideChange((currentSlide + 1) % 3);
      }, 3000);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    startSlide();

    const carousel = carouselRef.current;
    carousel.addEventListener('mouseenter', stopSlide);
    carousel.addEventListener('mouseleave', startSlide);

    return () => {
      carousel.removeEventListener('mouseenter', stopSlide);
      carousel.removeEventListener('mouseleave', startSlide);
      clearInterval(interval);
    };
  }, [currentSlide]);

  return (
    <div>
      <section className="bg-white md:px-12 md:mx-12">
        {/* Carousel */}
        <div className="relative w-full" ref={carouselRef}>
          <div className="carousel w-full">
            <Slide
              imageSrc="/slide/santorini.jpg"
              altText="Travel Fest"
              slideId="slide1"
              prevSlide="slide3"
              nextSlide="slide2"
              onSlideChange={handleSlideChange}
            />
            <Slide
              imageSrc="/slide/Neuschwanstein.jpg"
              altText="Discount Code"
              slideId="slide2"
              prevSlide="slide1"
              nextSlide="slide3"
              onSlideChange={handleSlideChange}
            />
            <Slide
              imageSrc="/slide/Shirakawako.jpg"
              altText="Summer Sales"
              slideId="slide3"
              prevSlide="slide2"
              nextSlide="slide1"
              onSlideChange={handleSlideChange}
            />
          </div>

          {/* Search Box */}
          <div className="z-0 search-box absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-50">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="เลือกสถานที่ที่อยากไปเลย.."
                className="input input-bordered max-w-xs md:w-[80vw]"
                style={{ paddingLeft: '2.5rem' }}
              />
              <img
                src="/search.png"
                alt="Search Icon"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0.5rem',
                  transform: 'translateY(-50%)',
                  width: '1.25rem',
                  height: '1.25rem',
                }}
              />
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="md:mx-[5%] my-14 mx-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">ข้อเสนอสำหรับคุณ</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {offers.map((offer) => (
                <Offer
                  key={offer.id}
                  imageSrc={offer.imageSrc}
                  altText={offer.altText}
                />
              ))}
            </div>
          </div>

          {/* Liked Items */}
          <h2 className="text-2xl font-semibold mb-4">ที่คุณกดถูกใจไว้</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {likedItems.map((item) => (
              <LikedItem key={item.id} {...item} />
            ))}
          </div>

          {/* ดูเพิ่มเติม Button */}
          <div className="flex justify-center pt-4">
            <button className="btn btn-wide rounded-full bg-[#5F97FB] text-white text-base">
              ดูเพิ่มเติม
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;
