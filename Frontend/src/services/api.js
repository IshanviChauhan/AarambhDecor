import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api' || 'http://localhost:4000/api',
});

export const getProducts = () => api.get('/product');

export default api;
