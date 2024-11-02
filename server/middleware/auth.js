const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    console.log('Auth middleware hit');

    // Check if Authorization header is present
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing. Please authenticate.' });
    }

    // Extract and verify the token
    const token = authHeader.replace('Bearer ', '');
    console.log('Token:', token);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth error:', error);

    // Customize error responses based on the error type
    if (error.name === 'TokenExpiredError') {
      return res.status(401).send({ error: 'Token expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({ error: 'Invalid token. Please authenticate.' });
    } else {
      return res.status(500).send({ error: 'Internal server error. Please try again.' });
    }
  }
};

module.exports = auth;