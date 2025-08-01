const mongoose = require('mongoose');

/**
 * Assignment Schema
 * - status: 'assigned', 'submitted', 'graded'
 */
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedAt: Date,
    files: [String],
    grade: String,
    feedback: String
  }]
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
