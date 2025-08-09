import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ai-test-code-gen-backened.onrender.com', // or your deployed backend URL
});

export default api;
