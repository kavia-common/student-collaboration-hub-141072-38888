const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'student_admin';

const connectDB = async () => {
  try {
    await mongoose.connect(`${MONGODB_URL}/${MONGODB_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('[MongoDB] Connected:', MONGODB_URL, MONGODB_DB);
  } catch (err) {
    console.error('[MongoDB] Connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
