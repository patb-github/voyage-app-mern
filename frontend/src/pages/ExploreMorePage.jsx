import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosVisitor from '../utils/axiosVisitor';
import DestinationCard from '../components/DestinationCard';

const ExploreMorePage = () => {
  const [trips, setTrips] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const tripsPerPage = 15;

  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage]);

  const fetchTrips = async (page) => {
    setIsLoading(true);
    try {
      const response = await axiosVisitor.get('/trips', {
        params: {
          page: page,
          limit: tripsPerPage,
        },
      });
      setTrips(response.data.trips);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore More Destinations</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <DestinationCard
                key={trip._id}
                _id={trip._id}
                name={trip.name}
                destination_from={trip.destination_from}
                destination_to={trip.destination_to}
                rating={trip.rating}
                price={trip.price}
                images={trip.images}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`mx-1 px-4 py-2 rounded-full ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </motion.button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExploreMorePage;
