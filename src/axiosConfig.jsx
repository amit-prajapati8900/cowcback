import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:2323',
  timeout: 10000,
});

// Automatically add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;