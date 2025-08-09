// server/index.js
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// dotenv.config();

const githubRoutes = require('./routes/githubRoutes');
const aiRoutes = require('./routes/aiRoutes');
const prRoutes = require('./routes/prRoutes');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/github', githubRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/github', prRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Test Case Generator API running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
