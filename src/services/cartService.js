import api from './api';

export const getCart = () => api.get('/api/cart');
export const addToCart = (productId, quantity) =>
  api.post('/api/cart', { productId, quantity });
export const updateCartItem = (cartItemId, quantity) =>
  api.put(`/api/cart/${cartItemId}`, { quantity });
export const removeCartItem = (cartItemId) =>
  api.delete(`/api/cart/${cartItemId}`);
