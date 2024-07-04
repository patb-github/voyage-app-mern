import { Link } from 'react-router-dom';

const Offer = ({ imageSrc, altText }) => (
  <a href="#">
    <img src={imageSrc} alt={altText} className="rounded-lg" />
  </a>
);

const LikedItem = ({ imageSrc, title, location, rating, price }) => (
  <Link to={`/package/${title}`}>
    <div className="card w-full bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={imageSrc} alt={title} />
      </figure>
      <div className="card-body px-2 md:px-3 py-2">
        <p className="line-clamp-2 overflow-hidden text-ellipsis card-title text-sm md:text-lg">
          {title}
        </p>
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

        <div className="flex items-center">
          <p className="text-lg font-bold">฿ {price}</p>
        </div>
      </div>
    </div>
  </Link>
);

const offers = [
  { id: 1, imageSrc: '/destination/discount.jpg', altText: 'Discount Offer' },
  { id: 2, imageSrc: '/destination/fuji.jpg', altText: 'Fuji Offer' },
  { id: 3, imageSrc: '/destination/thai.jpg', altText: 'Thai Offer' },
  { id: 4, imageSrc: '/destination/europe.jpg', altText: 'Europe Offer' },
];

const likedItems = [
  {
    id: 1,
    imageSrc: '/destination/universal.jpg',
    title: 'Singapore Sling: Thrills, Lights, and City Delights',
    location: 'Singapore',
    rating: 4.7,

    price: 16990,
  },
  {
    id: 2,
    imageSrc: '/destination/okinawaAquarium.jpg',
    title: 'Okinawa Escape: Castles, Corals, and Culinary Delights',
    location: 'Japan',
    rating: 4.8,

    price: 29950,
  },
];

const LandingPage = () => {
  return (
    <div>
      <section>
        <div className="md:mx-[10%] my-6 mx-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Latest travel promotions
            </h2>
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

          <h2 className="text-2xl font-semibold mb-4">Recommended for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {likedItems.map((item) => (
              <LikedItem key={item.id} {...item} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button className="btn btn-wide rounded-full bg-[#185df2] text-[#f5f5f5]  font-bold text-xl">
              Explore more
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
