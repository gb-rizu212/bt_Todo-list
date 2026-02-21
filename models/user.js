const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

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

//mã hóa mật khẩu
userSchema.pre('save', async function(next) {
  if (!this.isModified('matKhau')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.matKhau = await bcrypt.hash(this.matKhau, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.soSanhMatKhau = async function(matKhauNhap) {
  return await bcrypt.compare(matKhauNhap, this.matKhau);
};

module.exports = mongoose.model('User', userSchema);
