import axiosVisitor from "./axiosVisitor";

export const fetchCoupons = async () => {
  try {
    const response = await axiosVisitor.get('/coupons/');
    return response.data;
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error;
  }
};

export const getCouponByCode = async (code) => {
  try {
    const response = await axiosVisitor.get(`/coupons/code/${code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coupon by code:', error);
    throw error; // Allow components to handle the error (e.g., no coupon found)
  }
};

export const calculateDiscount = (amount, type, discount) => {
  switch (type) {
    case 'fixed':
      return discount;
    case 'percent':
      return (amount * discount) / 100;
    default:
      return 0; // Or handle an invalid type with an error
  }
};
