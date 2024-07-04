// src/components/DestinationCard.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

const DestinationCard = ({ imageSrc, title, location, rating, price }) => (
  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
    <Link to={`/package/${title}`} className="block">
      <div className="card bg-white shadow-xl rounded-lg overflow-hidden">
        <img className="w-full h-48 object-cover" src={imageSrc} alt={title} />
        <div className="p-2 sm:p-4">
          <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="w-4 h-4 mr-1 text-gray-600"
              />
              <p className="text-sm text-gray-600">{location}</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faStar}
                className="w-4 h-4 text-yellow-500"
              />
              <p className="ml-1 text-sm">{rating}</p>
            </div>
          </div>
          <p className="text-lg font-bold text-blue-600">
            ${price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default DestinationCard;
