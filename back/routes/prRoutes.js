// server/routes/prRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

router.post('/create-pr', async (req, res) => {
   console.log('Received data:', req.body);
  const { owner, repo, branch, filePath, code, commitMessage } = req.body;

  if (!owner || !repo || !filePath || !code || !commitMessage) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newBranch = `test-gen-${Date.now()}`;

  try {
    // Step 1: Get reference of main branch
    const refRes = await githubApi.get(`/repos/${owner}/${repo}/git/ref/heads/${branch}`);
    const baseSha = refRes.data.object.sha;

    // Step 2: Create new branch
    await githubApi.post(`/repos/${owner}/${repo}/git/refs`, {
      ref: `refs/heads/${newBranch}`,
      sha: baseSha,
    });

    // Step 3: Create new blob (file content)
    const blobRes = await githubApi.post(`/repos/${owner}/${repo}/git/blobs`, {
      content: code,
      encoding: 'utf-8',
    });

    // Step 4: Get tree of base branch
    const treeRes = await githubApi.get(`/repos/${owner}/${repo}/git/trees/${baseSha}`);
    const baseTreeSha = treeRes.data.sha;

    // Step 5: Create new tree
    const newTreeRes = await githubApi.post(`/repos/${owner}/${repo}/git/trees`, {
      base_tree: baseTreeSha,
      tree: [
        {
          path: filePath,
          mode: '100644',
          type: 'blob',
          sha: blobRes.data.sha,
        },
      ],
    });

    // Step 6: Create new commit
    const commitRes = await githubApi.post(`/repos/${owner}/${repo}/git/commits`, {
      message: commitMessage,
      tree: newTreeRes.data.sha,
      parents: [baseSha],
    });

    // Step 7: Update new branch to point to new commit
    await githubApi.patch(`/repos/${owner}/${repo}/git/refs/heads/${newBranch}`, {
      sha: commitRes.data.sha,
    });

    // Step 8: Create PR
    const prRes = await githubApi.post(`/repos/${owner}/${repo}/pulls`, {
      title: commitMessage,
      head: newBranch,
      base: branch,
      body: 'AI-generated test cases',
    });

    res.json({ pullRequestUrl: prRes.data.html_url });
  } catch (err) {
    console.error('Error creating PR:', err.message);
    res.status(500).json({ message: 'Failed to create PR' });
  }
});

module.exports = router;
