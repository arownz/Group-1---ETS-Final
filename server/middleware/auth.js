const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    console.log('Auth middleware hit');
    console.log('Authorization header:', req.header('Authorization'));
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('Token:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = auth;