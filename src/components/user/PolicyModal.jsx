const PolicyModal = ({ show, onClose }) => {
  return (
    <div className={`modal ${show ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Travel Policy</h3>
        <br />
        <p>Welcome to Voyage! We are delighted to have you join us in exploring the world. By using our platform to make travel bookings, you agree to the following terms and conditions.</p>
        <br />
        <p>All bookings are subject to availability, and you are responsible for complying with the terms and conditions of airlines, hotels, car rental companies, and other service providers. It is your responsibility to ensure you have all necessary travel documents such as valid passports, visas, and health certificates.</p>
        <br />
        <p>We recommend purchasing travel insurance to safeguard against unforeseen circumstances like trip cancellations, medical emergencies, or lost luggage. Prices displayed on our platform are subject to change based on availability and currency fluctuations, and full payment is required at the time of reservation unless stated otherwise.</p>
        <br />
        <p>Cancellation and change policies vary by service provider, and fees may apply. Please check for travel advisories or warnings issued by government authorities for your destination, as we are not liable for consequences resulting from travel to destinations with active advisories.</p>
        <br />
        <p>Users must conduct themselves in accordance with local laws during their travels, and any misconduct may result in cancellation of bookings. We value your feedback and encourage honest reviews of your travel experiences booked through us.</p>
        <br />
        <p>Our Privacy Policy governs the use of your personal information, and by using our services, you consent to its terms. Voyage reserves the right to modify these terms at any time, and it is recommended to review them periodically.</p>
        <br />
        <p>If you have any questions or concerns about our Travel Policy or Terms of Service, please contact us at customersupport@voyage.com.</p>
        <div className="modal-action">
          <button
            onClick={onClose}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded"
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
