import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // or your deployed backend URL
});

export default api;
