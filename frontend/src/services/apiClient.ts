// frontend/src/services/apiClient.ts
/// <reference types="vite/client" />
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1', // Set in .env
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // if you are using httpOnly cookies for sessions
});

// Optional: Interceptors for handling auth tokens or global errors
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// apiClient.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized (e.g., redirect to login)
//       console.error("Unauthorized, redirecting to login...");
//       // window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;
