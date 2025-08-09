// src/services/prService.js
import api from './api';


export const createPullRequest = (data) => {
  return api.post('/api/pr/create-pr', data);
};
