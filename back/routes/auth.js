const express = require('express');
const axios = require('axios');
const router = express.Router();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FRONTEND_URL = 'http://localhost:3000'; // change if deployed

// Step 1: Redirect user to GitHub login
router.get('/github', (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
  res.redirect(redirectUrl);
});

// Step 2: GitHub redirects here with ?code=...
router.get('/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Step 3: Exchange code for access token
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );

    const accessToken = response.data.access_token;

    // Redirect back to frontend with token
    res.redirect(`${FRONTEND_URL}/oauth-success?token=${accessToken}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
