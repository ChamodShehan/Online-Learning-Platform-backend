const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor'], default: 'student' },
  tokens: [{ 
    token: {
      type: String, 
      required: true 
    } 
  }],
});

module.exports = mongoose.model('User', UserSchema);
