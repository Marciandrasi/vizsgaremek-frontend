import api from './api';

export const checkout = (data) => api.post('/api/orders', data);
export const getMyOrders = () => api.get('/api/orders');
export const getOrderById = (id) => api.get(`/api/orders/${id}`);
