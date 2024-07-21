import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faGift,
  faPalette,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import axiosUser from '../../utils/axiosUser';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
        <p className="mb-4">Are you sure you want to save these changes?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const OfferManage = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({
    imageSrc: '',
    altText: '',
    title: '',
  });
  const [error, setError] = useState(null);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosUser.get('/recommended');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setError('Failed to load offers. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleEditClick = (offer) => {
    setSelectedOffer(offer);
    setFormData({
      imageSrc: offer.imageSrc,
      altText: offer.altText,
      title: offer.title,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('altText', formData.altText);
      formDataToSend.append('title', formData.title);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axiosUser.put(
        `/recommended/${selectedOffer._id}`,
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      await fetchOffers();

      setIsModalOpen(false);
      setError(null);
    } catch (error) {
      console.error('Error updating offer:', error);
      setError('Failed to update offer. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    handleSubmit();
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  const OfferItem = ({ offer }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden mb-6"
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={offer.imageSrc}
            alt={offer.altText}
          />
        </div>
        <div className="p-8 w-full">
          <div className="flex justify-between items-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              <FontAwesomeIcon icon={faGift} className="mr-2" />
              Recommended
            </div>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handleEditClick(offer)}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </button>
          </div>
          <h2 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
            {offer.title}
          </h2>
          <p className="mt-2 text-gray-600">{offer.altText}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <FontAwesomeIcon icon={faGift} className="mr-2 text-indigo-500" />
          Manage Recommended
        </h1>

        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : offers.length > 0 ? (
          offers.map((offer) => <OfferItem key={offer._id} offer={offer} />)
        ) : (
          <p className="text-center text-gray-500">No offers available.</p>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Edit Offer
              </h3>
              <form className="mt-2 text-left">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    <FontAwesomeIcon icon={faPalette} className="mr-2" />
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="altText"
                  >
                    <FontAwesomeIcon icon={faPalette} className="mr-2" />
                    Alt Text
                  </label>
                  <input
                    type="text"
                    name="altText"
                    id="altText"
                    value={formData.altText}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    <FontAwesomeIcon icon={faImage} className="mr-2" />
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    accept="image/*"
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      isUploading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isUploading}
                  >
                    {isUploading ? 'Uploading...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default OfferManage;
