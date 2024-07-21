import axiosUser from './axiosUser'; // Use your configured axios instance

export const fetchBookings = async (status) => {
  try {
    const response = await axiosUser.get(`/bookings/${status}`);
    if (response.data && response.data.bookings) {
      return response.data.bookings;
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (error) {
    handleError(error);
    throw error; // Re-throw the error to allow the caller to handle it if needed
  }
};

// Error handling function
function handleError(error) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      if (error.response.status === 401) {
        console.error(
          'Authentication failed. Token may be invalid or expired.'
        );
        // Trigger token refresh or logout
        refreshToken();
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}

// Token refresh function (Improved)
export async function refreshToken() {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await axiosUser.post('/auth/refresh', {
      refreshToken,
    });

    if (response.data && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    } else {
      console.error('Error refreshing token: Unexpected response format');
      // Handle logout or redirect to login as needed
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Handle logout or redirect to login as needed
  }
}
