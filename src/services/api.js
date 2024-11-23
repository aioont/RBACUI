import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Mock server URL
  headers: {
    'Content-Type': 'application/json', 
    Accept: 'application/json', 
  },
});

export default api;
