import axiosUser from "./axiosUser";

export const fetchCart = async () => {
  try {
    const res = await axiosUser.get('/cart');

    const cart = res.data.cart;
    const cartLength = cart.length;
    console.log(cart.length);
    return { cart, cartLength };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};
