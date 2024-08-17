const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

module.exports = mongoose.model('Course', CourseSchema);
