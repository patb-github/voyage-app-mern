import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CouponManage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/coupons/');
        if (!response.ok) {
          throw new Error('Failed to fetch coupons');
        }
        const data = await response.json();
        const couponsData = data.coupons.map((coupon) => ({
          _id: coupon._id,
          name: coupon.name,
          type: coupon.type,
          discount: coupon.discount,
        }));
        setCoupons(couponsData);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const CouponItem = ({ coupon }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center"
    >
      <div>
        <h3 className="font-semibold text-lg">{coupon.name}</h3>
        <p className="text-sm text-gray-600">{"ID: " + coupon._id}</p>
        <p className="text-sm text-gray-600">{"Type: " + coupon.type}</p>
        <p className="text-sm text-blue-600 font-bold">
          {`${coupon.discount} ${coupon.type === 'fixed' ? 'USD' : '%'}`}
        </p>
      </div>
      <div>
        <Link to={`/admin/edit-coupon/${coupon._id}`} className="btn btn-sm btn-outline btn-primary mr-2">
          <FontAwesomeIcon icon={faEdit} />
        </Link>
        <button
          className="btn btn-sm btn-outline btn-error"
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:3000/api/coupons/${coupon._id}`);
              setCoupons(coupons.filter((c) => c._id !== coupon._id));
            } catch (error) {
              console.error('Error deleting coupon:', error);
            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Coupons</h1>
        
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search coupons..."
            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <Link to="/admin/create-coupon" className="btn btn-primary mb-6">
          Create New Coupon
        </Link>

        {isLoading ? (
          <p>Loading coupons...</p>
        ) : coupons.length > 0 ? (
          coupons.map((coupon) => <CouponItem key={coupon._id} coupon={coupon} />)
        ) : (
          <p>No coupons available.</p>
        )}
      </div>
    </div>
  );
};

export default CouponManage;

