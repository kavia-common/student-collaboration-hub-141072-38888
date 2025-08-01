const mongoose = require('mongoose');

/**
 * User Schema
 * - role: 'student', 'teacher', 'admin'
 */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], required: true, default: 'student' },
  profile: {
    bio: String,
    avatarUrl: String,
  },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
