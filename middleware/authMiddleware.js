const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
 
    console.log('--- Incoming Request ---');
    console.log('Authorization Header:', req.header('Authorization'));

    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Extracted Token:', token);

    if (!token) {
      console.error('No token provided');
      return res.status(401).send({ error: 'Please authenticate. Token is missing.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
    if (!user) {
      console.error('User not found for provided token');
      return res.status(401).send({ error: 'Please authenticate. User not found.' });
    }

    console.log('Authenticated User:', user);

    req.token = token;
    req.user = user;
    
    next();
  } catch (err) {

    console.error('Authentication error:', err.message);
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;
