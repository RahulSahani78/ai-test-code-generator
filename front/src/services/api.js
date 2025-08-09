import axios from 'axios';

const api = axios.create({
  baseURL: prprocess.env.REACT_APP_BACKEND_URL, // or your deployed backend URL
});

export default api;
