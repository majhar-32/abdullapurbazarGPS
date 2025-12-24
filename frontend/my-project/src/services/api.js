import axios from 'axios';
import { getApiUrl } from '../utils/apiUtils';

const api = axios.create({
  baseURL: `${getApiUrl()}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Auto-attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/abgps-admin-portal-20@#25-s@cure-12-31#/login';
    }
    return Promise.reject(error);
  }
);

export default api;
