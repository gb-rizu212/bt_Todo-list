const User = require('../models/user');

//đăng ký user
exports.dangKy = async (req, res) => {
  try {
    const { ten, email, matKhau } = req.body;

    //kiểm tra email đtồn tại
    const userTonTai = await User.findOne({ email });
    if (userTonTai) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const user = new User({ ten, email, matKhau });
    await user.save();

    res.status(201).json({
      message: 'Đăng ký thành công',
      user: {
        id: user._id,
        ten: user.ten,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

//lấy tất cả user
exports.layTatCaUser = async (req, res) => {
  try {
    const users = await User.find().select('-matKhau'); //k trả về mk
    res.json(users);
  } catch (error) {
    console.error('Lỗi lấy user:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};