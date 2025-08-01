const Message = require('../models/Message');
const User = require('../models/User');
const Group = require('../models/Group');

/**
 * Message Controller for private/group messaging.
 */

// PUBLIC_INTERFACE
exports.send = async (req, res, next) => {
  /**
   * Send message to group or direct to user.
   * Accepts: content, group or to (user id)
   */
  try {
    const { content, group, to } = req.body;
    if (!content || (!group && !to)) {
      return res.status(400).json({ error: 'Message content and recipient group or user required.' });
    }
    const message = await Message.create({
      content,
      sender: req.user.uid,
      group,
      to,
      sentAt: new Date(),
      readBy: [req.user.uid]
    });
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.fetch = async (req, res, next) => {
  /**
   * Fetch messages for group or direct with a user
   */
  try {
    const { group, to } = req.query;
    let filter = {};
    if (group) filter.group = group;
    else if (to) {
      filter.$or = [
        { sender: req.user.uid, to },
        { sender: to, to: req.user.uid }
      ];
    }
    else return res.status(400).json({ error: 'Query group or to (userId) required.' });

    const messages = await Message.find(filter).sort('sentAt');
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
