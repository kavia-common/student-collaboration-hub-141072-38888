const Notification = require('../models/Notification');

/**
 * Notification Controller - get and mark notifications as read
 */

// PUBLIC_INTERFACE
exports.list = async (req, res, next) => {
  /**
   * List notifications for the authenticated user.
   */
  try {
    const notifications = await Notification.find({ to: req.user.uid }).sort('-createdAt');
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.markRead = async (req, res, next) => {
  /**
   * Mark a notification as read.
   */
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found.' });
    notification.read = true;
    await notification.save();
    res.json(notification);
  } catch (err) {
    next(err);
  }
};
