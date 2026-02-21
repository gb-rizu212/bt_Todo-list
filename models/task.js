const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tieuDe: {          
    type: String,
    required: true,
    trim: true
  },
  moTa: {           
    type: String,
    trim: true,
    default: ''
  },
  daHoanThanh: {     
    type: Boolean,
    default: false
  },
  thoiGianHoanThanh: { 
    type: Date,
    default: null
  },
  nguoiDungId: {     
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ngayTao: {
    type: Date,
    default: Date.now
  },
  ngayCapNhat: {
    type: Date,
    default: Date.now
  }
});

// Cập nhật ngày sửa mỗi khi save
taskSchema.pre('save', function(next) {
  this.ngayCapNhat = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema);
