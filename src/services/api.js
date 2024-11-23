import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Mock server URL
  headers: {
    'Content-Type': 'application/json', // Default content type
    Accept: 'application/json', // Accept JSON responses
  },
});

export default api;
