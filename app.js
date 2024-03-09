const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { Console } = require('console');
const rateLimit = require('express-rate-limit');
const PORT = 3000;

const dataPath = path.join(__dirname, 'items.json');
let jsonData = {};

// Load vehicle data from JSON file
try {
  const rawData = fs.readFileSync(dataPath);
  jsonData = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading data:', error);
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply to all routes - add before CORS
app.use(limiter);

// Add CORS headers middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace * with your domain
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/items', (req, res) => {
  console.log("Request " + req.method, req.url, req.hostname + req.ip);
  res.json(jsonData);
});


app.get('/item/:key', (req, res) => {
  console.log("Request " + req.method, req.url, req.hostname + req.ip);

  const { key } = req.params;
  if (jsonData[key]) {
    res.json(jsonData[key]);
    console.log(jsonData[key]);
  } else {
    res.status(404).json({ error: 'Item not found:' + key });
    console.log("NOT FOUND " + key);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});