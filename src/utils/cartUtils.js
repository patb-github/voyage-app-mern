import axios from 'axios';

export const fetchCart = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    const cart = res.data.cart;
    const cartLength = cart.length;
    console.log(cart.length);
    return { cart, cartLength };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};
