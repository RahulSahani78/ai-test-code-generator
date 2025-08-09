// src/services/aiService.js
import axios from 'axios';
import api from './api';

export const generateSummaries = (data) => {
  return api.post('/api/ai/generate-summary', data);
};


// src/services/aiService.js
export const generateTestCode = (data) => {
  return api.post('/api/ai/generate-code', data);
};
