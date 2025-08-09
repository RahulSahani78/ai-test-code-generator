
const express = require('express');
const axios = require('axios');
const router = express.Router();

// 1. Get authenticated user's repositories using passed access token
router.get('/repos', async (req, res) => {
  const userToken = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!userToken) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const githubApi = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    const response = await githubApi.get('/user/repos');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching user repos:', err.message);
    res.status(500).json({ message: 'Failed to fetch user repositories' });
  }
});


// GET /api/github/files/:owner/:repo/:branch
router.get('/files/:owner/:repo/:branch', async (req, res) => {
  const { owner, repo, branch } = req.params;
  const userToken = req.headers.authorization?.split(' ')[1];

  if (!userToken) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    const githubApi = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    // Step 1: Get the tree SHA from the branch name
const branchRes = await githubApi.get(`/repos/${owner}/${repo}/branches/${branch}`);
    const treeSha = branchRes.data.commit.commit.tree.sha;

    // Step 2: Use the tree SHA to get all files
    const treeRes = await githubApi.get(`/repos/${owner}/${repo}/git/trees/${treeSha}?recursive=1`);

    const files = treeRes.data.tree
      .filter((item) => item.type === 'blob' && item.path.endsWith('.js'))
      .map((item) => ({
        path: item.path,
        url: item.url,
      }));

    res.json(files);
  } catch (err) {
    console.error('Error fetching repo files:', err.message);
    res.status(500).json({ message: 'Failed to fetch repository files' });
  }
});


// 3. Optional: Get public repositories of any GitHub user
router.get('/public-repos/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching public repos:', error.message);
    res.status(500).json({ message: 'Failed to fetch public repositories' });
  }
});

module.exports = router;
