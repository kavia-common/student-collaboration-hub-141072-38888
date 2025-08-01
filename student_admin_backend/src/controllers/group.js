const Group = require('../models/Group');
const User = require('../models/User');

// PUBLIC_INTERFACE
exports.create = async (req, res, next) => {
  /**
   * Create a new group (teacher/admin only)
   */
  try {
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const { name, description, members } = req.body;
    const group = await Group.create({
      name, description,
      members: members || [],
      createdBy: req.user.uid
    });
    res.status(201).json(group);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.list = async (req, res, next) => {
  /**
   * List all groups
   */
  try {
    const groups = await Group.find().populate('members', 'name email role');
    res.json(groups);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.get = async (req, res, next) => {
  /**
   * Get info about a group.
   */
  try {
    const group = await Group.findById(req.params.id).populate('members', 'name email role');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.addMember = async (req, res, next) => {
  /**
   * Add a user to group (teacher/admin only)
   */
  try {
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    group.members.push(userId);
    await group.save();
    res.json(group);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.removeMember = async (req, res, next) => {
  /**
   * Remove a user from group (teacher/admin only)
   */
  try {
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    const { userId } = req.params;
    group.members.pull(userId);
    await group.save();
    res.json(group);
  } catch (err) {
    next(err);
  }
};
