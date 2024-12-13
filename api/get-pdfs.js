// api/get-pdfs.js
const path = require('path');
const fs = require('fs');

module.exports = (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can specify your frontend domain here
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  const pdfDir = path.join(__dirname, '../public/pdfs');
  
  fs.readdir(pdfDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan files' });
    }
    
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    res.status(200).json(pdfFiles);
  });
};
