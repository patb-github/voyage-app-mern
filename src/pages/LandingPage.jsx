import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DestinationCard from '../components/DestinationCard';
import axios from 'axios';

const Offer = ({ imageSrc, altText, title }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Link
      to={`/offer/${title}`}
      className="block relative overflow-hidden rounded-lg shadow-lg"
    >
      <img src={imageSrc} alt={altText} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-lg sm:text-xl font-bold">{title}</h3>
      </div>
    </Link>
  </motion.div>
);

const recommended = [
  {
    id: 1,
    imageSrc: '/destination/discount.jpg',
    altText: 'Discount Offer',
    title: 'Special Discounts',
  },
  {
    id: 2,
    imageSrc: '/destination/fuji.jpg',
    altText: 'Fuji Offer',
    title: 'Mount Fuji Tour',
  },
  {
    id: 3,
    imageSrc: '/destination/thai.jpg',
    altText: 'Thai Offer',
    title: 'Thai Paradise',
  },
  {
    id: 4,
    imageSrc: '/destination/europe.jpg',
    altText: 'Europe Offer',
    title: 'European Adventure',
  },
];

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendedItems = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/trips/');
        const allTrips = response.data.trips || [];

        const shuffledTrips = allTrips.sort(() => 0.5 - Math.random());
        const selectedTrips = shuffledTrips.slice(0, 8);

        setRecommendedItems(selectedTrips);
      } catch (error) {
        console.error('Error fetching recommended items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedItems();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-results?name=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-[url('./slide/santorini.webp')] bg-cover bg-center text-white py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Your World of Adventures Awaits
          </h1>
          <p className="text-xl mb-8">Discover • Book • Voyage</p>
          <form className="relative max-w-2xl mx-auto" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search destinations or activities..."
              className="w-full py-3 px-4 pr-12 rounded-full text-gray-800 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">
            Latest Travel Promotions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {recommended.map((offer) => (
              <Offer key={offer.id} {...offer} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Recommended for You</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : recommendedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {recommendedItems.map((item) => (
                <DestinationCard
                  key={item._id}
                  _id={item._id}
                  name={item.name}
                  destination_from={item.destination_from}
                  destination_to={item.destination_to}
                  rating={item.rating}
                  price={item.price}
                  images={item.images}
                />
              ))}
            </div>
          ) : (
            <p>No recommended items available.</p>
          )}
        </section>

        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-wide rounded-full bg-blue-500 text-white font-bold text-xl px-8 shadow-lg"
          >
            Explore More
          </motion.button>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
