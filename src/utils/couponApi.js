import axios from 'axios';

// Base API URL (Adjust if your backend runs on a different port)
const API_BASE_URL = 'http://localhost:3000/api';

// Function to fetch coupon details
export const getCouponByCode = async (code) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coupons/code/${code}`);
    return response.data; // Assuming your API returns the coupon data
  } catch (error) {
    // Handle errors based on their nature
    if (error.response) {
      // Server responded with an error status (e.g., 404, 500)
      console.error('Coupon API Error:', error.response.status);
      // Optionally, return a specific error message to your component
      throw new Error('Coupon not found or invalid code');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from Coupon API');
      throw new Error('Network error. Please try again later.');
    } else {
      // Something else happened while setting up the request
      console.error('Error setting up Coupon API request:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
};
