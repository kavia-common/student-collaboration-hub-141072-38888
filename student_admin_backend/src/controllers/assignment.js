const Assignment = require('../models/Assignment');
const Group = require('../models/Group');

/**
 * Assignment CRUD Controller for teachers/admins.
 */
// PUBLIC_INTERFACE
exports.create = async (req, res, next) => {
  /**
   * Create assignment for a group (teacher/admin only)
   */
  try {
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const { title, description, dueDate, group } = req.body;
    if (!title || !group) return res.status(400).json({ error: 'Title and group are required.' });
    const assignment = await Assignment.create({
      title, description, dueDate, group,
      createdBy: req.user.uid
    });
    res.status(201).json(assignment);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.list = async (req, res, next) => {
  /**
   * List assignments, optionally filter by group
   */
  try {
    const { group } = req.query;
    let filter = {};
    if (group) filter.group = group;
    const assignments = await Assignment.find(filter).populate('group', 'name');
    res.json(assignments);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.get = async (req, res, next) => {
  /**
   * Get details about specific assignment
   */
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.submit = async (req, res, next) => {
  /**
   * Student submits assignment work
   */
  try {
    const assignmentId = req.params.id;
    const userId = req.user.uid;
    const { files } = req.body; // array of file URLs/names
    const submission = {
      student: userId,
      files,
      submittedAt: new Date(),
    };
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
    // Replace old submission
    assignment.submissions = assignment.submissions.filter(s => String(s.student) !== userId);
    assignment.submissions.push(submission);
    await assignment.save();
    res.json({ message: 'Assignment submitted.' });
  } catch (err) {
    next(err);
  }
};

// PUBLIC_INTERFACE
exports.grade = async (req, res, next) => {
  /**
   * Grade a student's assignment (teacher/admin only)
   */
  try {
    if (!['admin', 'teacher'].includes(req.user.role)) return res.status(403).json({ error: 'Forbidden' });
    const assignmentId = req.params.id;
    const { studentId, grade, feedback } = req.body;
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    const sub = assignment.submissions.find(s => String(s.student) === studentId);
    if (!sub) return res.status(404).json({ error: 'Submission not found.' });
    sub.grade = grade;
    sub.feedback = feedback;
    await assignment.save();
    res.json({ message: 'Assignment graded.' });
  } catch (err) {
    next(err);
  }
};
