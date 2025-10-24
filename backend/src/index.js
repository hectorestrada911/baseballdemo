const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Baseball API is running' });
});

app.get('/api/players', (req, res) => {
  res.json({ message: 'Players endpoint - to be implemented' });
});

app.get('/api/stats', (req, res) => {
  res.json({ message: 'Stats endpoint - to be implemented' });
});

app.post('/api/upload', (req, res) => {
  res.json({ message: 'Upload endpoint - to be implemented' });
});

app.listen(PORT, () => {
  console.log(`Baseball API running on port ${PORT}`);
});
