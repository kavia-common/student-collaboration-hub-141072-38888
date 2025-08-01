const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Authentication Controller for registration, login, and user auth.
 */
const JWT_SECRET = process.env.JWT_SECRET || 'secret123'; // Should be changed in production

// PUBLIC_INTERFACE
exports.register = async (req, res, next) => {
  /**
   * Registers a new user.
   * Required fields: name, email, password, role
   */
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    // Only allow role from the enum
    const safeRole = ['student', 'teacher', 'admin'].includes(role) ? role : 'student';
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'User already exists.' });

    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ name, email, passwordHash: hash, role: safeRole });
    res.status(201).json({ message: 'User registered', user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.login = async (req, res, next) => {
  /**
   * User login endpoint
   * Required fields: email, password
   * Returns JWT token on success
   */
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ uid: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.me = async (req, res, next) => {
  /**
   * Get current user profile (self)
   */
  try {
    const userId = req.user.uid;
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json(user);
  } catch (err) {
    next(err);
  }
};
