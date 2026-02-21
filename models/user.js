const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  ten: {      
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  matKhau: {       
    type: String,
    required: true
  },
  ngayTao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
