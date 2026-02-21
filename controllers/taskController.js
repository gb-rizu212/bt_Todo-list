const Task = require('../models/task');
const User = require('../models/user');

//lấy tất cả các task 
exports.layTatCaTask = async (req, res) => {
  try {
    const tasks = await Task.find().populate('nguoiDungId', 'ten email');
    res.json(tasks);
  } catch (error) {
    console.error('Lỗi lấy tất cả task:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

//lấy task theo usser
exports.layTaskTheoTenUser = async (req, res) => {
  try {
    const { ten } = req.params;

    //tìm tất cả user 
    const users = await User.find({ ten: ten });
    if (users.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với tên này' });
    }

    //lấy danh sách id
    const userIds = users.map(u => u._id);

    //tìm task
    const tasks = await Task.find({ nguoiDungId: { $in: userIds } })
      .populate('nguoiDungId', 'ten email');

    res.json(tasks);
  } catch (error) {
    console.error('Lỗi lấy task theo tên user:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

//lấy task được tạo trong ngày
exports.layTaskHomNay = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0); //00:00:00 hnay
    const end = new Date();
    end.setHours(23, 59, 59, 999); //23:59:59 hnay

    const tasks = await Task.find({
      ngayTao: { $gte: start, $lte: end }
    }).populate('nguoiDungId', 'ten email');

    res.json(tasks);
  } catch (error) {
    console.error('Lỗi lấy task hôm nay:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

//lấy task k hoàn thành
exports.layTaskChuaHoanThanh = async (req, res) => {
  try {
    const tasks = await Task.find({ daHoanThanh: false })
      .populate('nguoiDungId', 'ten email');
    res.json(tasks);
  } catch (error) {
    console.error('Lỗi lấy task chưa hoàn thành:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

//lấy task của user có họ "Nguyễn" 
exports.layTaskUserHoNguyen = async (req, res) => {
  try {
    //k phân biệt hoa thường\
    const users = await User.find({ ten: { $regex: /^Nguyễn/i } });
    const userIds = users.map(u => u._id);

    if (userIds.length === 0) {
      return res.json([]); //k có user nào họ Nguyễn
    }

    const tasks = await Task.find({ nguoiDungId: { $in: userIds } })
      .populate('nguoiDungId', 'ten email');

    res.json(tasks);
  } catch (error) {
    console.error('Lỗi lấy task user họ Nguyễn:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
//tạo task mới cho một user 
exports.taoTask = async (req, res) => {
  try {
    const { tieuDe, moTa, nguoiDungId } = req.body;

    //kt user tồn tại
    const user = await User.findById(nguoiDungId);
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    const task = new Task({ tieuDe, moTa, nguoiDungId });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.error('Lỗi tạo task:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};