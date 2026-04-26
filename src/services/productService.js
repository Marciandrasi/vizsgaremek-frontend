import api from './api';

export const getAllProducts = () => api.get('/api/products');
export const getProductById = (id) => api.get(`/api/products/${id}`);
export const createProduct = (formData) =>
  api.post('/api/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateProduct = (id, formData) =>
  api.put(`/api/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);
