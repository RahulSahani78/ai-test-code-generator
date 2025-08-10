// // src/services/prService.js
// import api from './api';


// export const createPullRequest = (data) => {
//   return api.post('/api/pr/create-pr', data);
// };


import api from './api';

export const createPullRequest = async (data, retries = 2) => {
  let lastError = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`📤 Creating PR (Attempt ${attempt}):`, data);
      const res = await api.post('/api/pr/create-pr', data);
      console.log("✅ PR Created:", res.data);
      return res;
    } catch (err) {
      lastError = err;
      console.error(`❌ Attempt ${attempt} failed:`, err.response?.data || err.message);

      if (attempt < retries) {
        console.warn(`⏳ Retrying in 2 seconds... (${attempt}/${retries - 1} retries left)`);
        await new Promise(res => setTimeout(res, 2000));
      }
    }
  }

  throw lastError;
};
