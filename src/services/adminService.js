import api from './api';

export const getAllUsers = () => api.get('/api/admin/users');
export const deleteUser = (id) => api.delete(`/api/admin/users/${id}`);
export const updateProfile = (data) => api.put('/api/users/me', data);
