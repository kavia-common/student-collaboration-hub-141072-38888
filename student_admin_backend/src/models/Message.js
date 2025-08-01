const mongoose = require('mongoose');

/**
 * Message Schema
 * Supports individual and group messages.
 */
const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // for direct messages
  sentAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Message', MessageSchema);
