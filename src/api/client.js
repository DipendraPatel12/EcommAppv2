import axios from 'axios';

export const BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor: attach token if available
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: handle generic errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'Something went wrong. Please try again.';
    return Promise.reject(new Error(typeof message === 'string' ? message : 'Network error'));
  }
);

export default apiClient;
