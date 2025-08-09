// // src/services/githubService.js
// import axios from 'axios';
// import api from './api';
// export const getUserRepos = () => {
//   return api.get('/api/github/repos'); // Your backend should proxy this to GitHub API
// };

// // src/services/githubService.js
// export const getRepoFiles = (owner, repo, branch = 'main') => {
//   return api.get(`/api/github/files/${owner}/${repo}/${branch}`);
// };



// export const getPublicRepos = (username) => {
//   return api.get(`/api/github/public-repos/${username}`);
// };





import axios from 'axios';
import api from './api';

// 🔐 Helper to get Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem('githubToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 🔄 Authenticated requests to backend (which talks to GitHub API)
export const getUserRepos = () => {
  return api.get('/api/github/repos', getAuthHeaders());
};

export const getRepoFiles = (owner, repo, branch = 'main') => {
  return api.get(`/api/github/files/${owner}/${repo}/${branch}`, getAuthHeaders());
};

export const getPublicRepos = (username) => {
  return api.get(`/api/github/public-repos/${username}`, getAuthHeaders());
};
