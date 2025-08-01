const mongoose = require('mongoose');

/**
 * Notification Schema
 */
const NotificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['message', 'assignment', 'group', 'system', 'general'], default: 'general' },
  message: { type: String, required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', NotificationSchema);
