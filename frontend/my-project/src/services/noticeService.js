import api from './api';

export const noticeService = {
  // Get all notices
  getAll: async () => {
    const response = await api.get('/notices');
    return response.data;
  },

  // Get notice by ID
  getById: async (id) => {
    const response = await api.get(`/notices/${id}`);
    return response.data;
  },

  // Get notices by category
  getByCategory: async (category) => {
    const response = await api.get(`/notices/category/${category}`);
    return response.data;
  },

  // Get urgent notices
  getUrgent: async () => {
    const response = await api.get('/notices/urgent');
    return response.data;
  },

  // Create notice
  create: async (data) => {
    const response = await api.post('/notices', data);
    return response.data;
  },

  // Update notice
  update: async (id, data) => {
    const response = await api.put(`/notices/${id}`, data);
    return response.data;
  },

  // Delete notice
  delete: async (id) => {
    await api.delete(`/notices/${id}`);
  },

  // Ticker-related methods
  getTickerNotices: async () => {
    const response = await api.get('/notices/ticker');
    return response.data;
  },

  getTickerSettings: async () => {
    const response = await api.get('/notices/ticker/settings');
    return response.data;
  },

  updateTickerSettings: async (settings) => {
    const response = await api.put('/notices/ticker/settings', settings);
    return response.data;
  },
};
