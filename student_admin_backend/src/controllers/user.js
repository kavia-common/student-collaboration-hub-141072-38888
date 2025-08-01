const User = require('../models/User');
const Group = require('../models/Group');

// PUBLIC_INTERFACE
exports.list = async (req, res, next) => {
  /**
   * List all users (admin only).
   */
  try {
    // Only admin/teacher
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.profile = async (req, res, next) => {
  /**
   * Get another user's profile
   */
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-passwordHash');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.updateProfile = async (req, res, next) => {
  /**
   * Update own user's profile.
   */
  try {
    const updates = req.body;
    const userId = req.user.uid;
    const user = await User.findByIdAndUpdate(userId, { profile: updates.profile }, { new: true, select: '-passwordHash' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.delete = async (req, res, next) => {
  /**
   * Delete a user (admin only).
   */
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
};
