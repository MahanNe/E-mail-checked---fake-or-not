const express = require('express');
const emailDomainCheck = require('email-domain-check');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to check if the email domain is invalid or disposable
app.get('/', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: 'Email parameter is missing.' });
  }

  try {
    const result = await emailDomainCheck(email);
    res.json({ isValid: result.isValid, isDisposable: result.isDisposable });
  } catch (error) {
    console.error('Error checking email domain:', error);
    res.status(500).json({ error: 'An error occurred while checking the email domain.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
