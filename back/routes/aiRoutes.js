
const express = require('express');
const axios = require('axios');
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'http://localhost:3000',
  },
});

// ✅ Keep only this one: createSummaryPrompt
function createSummaryPrompt(files) {
  const codeList = files.map((file, index) => `File ${index + 1}: ${file.name || 'Unknown name'}\n${file.content}`).join('\n\n');

  return `
You are an expert in software testing.

Analyze the following source code files and suggest 3 to 5 possible test case summaries.

Each summary should describe:
- What needs to be tested
- The goal of the test
- Any edge cases or conditions worth testing

Respond in bullet points.

Files:
${codeList}
`;
}

// ✅ Utility: format prompt for generating test code
const createCodePrompt = (summary, files) => `
You are a test automation expert.

Write full test code for the following summary:
"${summary}"

Assume the following source files are under test:
${files.map(f => f.name || 'Unknown.js').join(', ')}

Output valid and executable test code in JavaScript (e.g. Jest or Mocha).
`;

// ✅ Endpoint: generate test case summaries
router.post('/generate-summary', async (req, res) => {
  const { files } = req.body;

  if (!files || !Array.isArray(files) || files.length === 0) {
    return res.status(400).json({ message: 'Files are required as a non-empty array' });
  }

  try {
    const prompt = createSummaryPrompt(files);

    const response = await openai.post('/chat/completions', {
      model: process.env.OPENROUTER_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    const summariesText = response.data.choices[0]?.message?.content || '';
    const summaries = summariesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line); // remove empty lines

    res.json(summaries);
  } catch (err) {
    console.error('Error generating summaries:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Failed to generate summaries' });
  }
});

// ✅ Endpoint: generate test code from summary
router.post('/generate-code', async (req, res) => {
  const { summary, files } = req.body;

  if (!summary || !files || !files.length) {
    return res.status(400).json({ message: 'Summary and files required' });
  }

  try {
    const prompt = createCodePrompt(summary, files);

    const response = await openai.post('/chat/completions', {
      model: process.env.OPENROUTER_MODEL || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const code = response.data.choices[0].message.content;

    res.json({ code });
  } catch (err) {
    console.error('Error generating code:', err.message);
    res.status(500).json({ message: 'Failed to generate code' });
  }
});

module.exports = router;
