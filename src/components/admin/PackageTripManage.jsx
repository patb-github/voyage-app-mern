import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faEdit,
  faTrash,
  faSpinner,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

const PackageTripManage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/trips/');
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        const data = await response.json();
        setTrips(data.trips || []);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleDeleteTrip = (tripId) => {
    setTripToDelete(tripId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setModalMessage('Deleting trip...');
    setIsDeleting(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/trips/${tripToDelete}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setModalMessage('Trip deleted successfully!');
        setTrips(trips.filter((trip) => trip._id !== tripToDelete));
      } else {
        setModalMessage('Error deleting trip. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting trip:', error);
      setModalMessage('Error deleting trip. Please try again.');
    } finally {
      setIsDeleting(false);
      setTimeout(() => {
        setIsModalOpen(false);
        setTripToDelete(null);
        setModalMessage('');
      }, 1500);
    }
  };

  const TripItem = ({ trip }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold text-lg">{trip.name}</h3>
        <p className="text-sm text-gray-600">{`${trip.destination_from} to ${trip.destination_to}`}</p>
        <p className="text-sm text-blue-500 font-bold">
          ${trip.price.toLocaleString()}
        </p>
      </div>
      <div>
        <Link
          to={`/admin/edit-trip/${trip._id}`}
          className="btn btn-sm btn-outline btn-primary mr-2"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <button
          className="btn btn-sm btn-outline btn-error"
          onClick={() => handleDeleteTrip(trip._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Package Trips</h1>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search trips..."
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <Link
          to="/admin/create-trip"
          className="btn bg-blue-500 text-white mb-6"
        >
          Create New Trip
        </Link>

        {isLoading ? (
          <p>Loading trips...</p>
        ) : trips.length > 0 ? (
          trips
            .filter((trip) =>
              trip.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((trip) => <TripItem key={trip._id} trip={trip} />)
        ) : (
          <p>No trips available.</p>
        )}

        {/* DaisyUI Modal */}
        <div className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
          <div className="modal-box relative">
            <h3 className="font-bold text-lg">{modalMessage}</h3>
            <p className="py-4 font-bold">
              Confirm trip deletion. This action is permanent and cannot be
              undone.
            </p>
            {isDeleting && (
              <FontAwesomeIcon
                icon={faSpinner}
                spin
                className="absolute top-4 right-4 text-2xl text-blue-500"
              />
            )}

            <div className="modal-action">
              {!isDeleting && !tripToDelete && (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsModalOpen(false)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" /> OK
                </button>
              )}
              {!isDeleting && tripToDelete && (
                <>
                  <button
                    className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
                    onClick={confirmDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      'Delete'
                    )}
                  </button>
                  <button className="btn" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageTripManage;
