// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content.trim();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error communicating with our Psychic:', error.message);
    res.status(500).json({ error: 'Error communicating with our Psychic' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
