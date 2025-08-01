/**
 * JWT Authentication middleware for Express routes.
 * Adds 'user' property to req if authenticated.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// PUBLIC_INTERFACE
async function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing authorization.' });

  const token = authHeader.replace(/^Bearer\s/, '');
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized: Invalid token' });

    req.user = decoded;
    // Optionally attach user to request (sanitized)
    try {
      const currUser = await User.findById(decoded.uid).select('-passwordHash');
      if (!currUser) return res.status(401).json({ error: 'User not found' });
      req.currentUser = currUser;
      next();
    } catch (dbErr) {
      next(dbErr);
    }
  });
}

module.exports = { authenticateJWT };
