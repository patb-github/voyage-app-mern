import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    beforeChange: () => {
      if (sliderRef) {
        sliderRef.slickPause();
      }
    },
    afterChange: () => {
      if (sliderRef) {
        sliderRef.slickPlay();
      }
    },
  };

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  useEffect(() => {
    const allImagesLoaded = Object.values(loadedImages).every(
      (loaded) => loaded
    );
    if (allImagesLoaded && sliderRef) {
      sliderRef.slickPlay();
    }
  }, [loadedImages, sliderRef]);

  return (
    <div>
      <div>
        <Slider ref={setSliderRef} {...settings}>
          <div>
            <img
              src="/slide/Shirakawako.webp"
              alt="Slide 1"
              onLoad={() => handleImageLoad(1)}
              onError={() => console.error('Failed to load image Slide 1')}
            />
          </div>
          <div>
            <img
              src="/slide/Neuschwanstein.webp"
              alt="Slide 2"
              onLoad={() => handleImageLoad(2)}
              onError={() => console.error('Failed to load image Slide 2')}
            />
          </div>
          <div>
            <img
              src="/slide/santorini.webp"
              alt="Slide 3"
              onLoad={() => handleImageLoad(3)}
              onError={() => console.error('Failed to load image Slide 3')}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
