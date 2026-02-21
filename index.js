require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối MongoDB'))
  .catch(err => console.error('Lỗi kết nối:', err));

async function createSampleData() {
  try {
    //xóa dữ liệu cũ 
    await User.deleteMany({});
    await Task.deleteMany({});

    //tạo user
    const user = new User({
      ten: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      matKhau: '123456' // trong thực tế nên hash
    });
    await user.save();
    console.log('Đã tạo user:', user.ten);

    // tạo task 
    const task1 = new Task({
      tieuDe: 'Học MongoDB',
      moTa: 'Tìm hiểu về mongoose và thiết kế collection',
      nguoiDungId: user._id
    });
    await task1.save();
    console.log('Đã tạo task:', task1.tieuDe);

    const task2 = new Task({
      tieuDe: 'Viết báo cáo',
      moTa: 'Hoàn thành báo cáo cuối kỳ',
      nguoiDungId: user._id
    });
    await task2.save();
    console.log('Đã tạo task:', task2.tieuDe);

    //đánh dấu hoàn thành
    task2.daHoanThanh = true;
    task2.thoiGianHoanThanh = new Date();
    await task2.save();
    console.log('Task "Viết báo cáo" đã hoàn thành lúc:', task2.thoiGianHoanThanh);

    return { user, task1, task2 };
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu:', error);
  }
}

//hiển thị tất cả các task 
async function showUserTasks(userId) {
  try {
    const tasks = await Task.find({ nguoiDungId: userId }).populate('nguoiDungId', 'ten email');
    console.log('\nDanh sách công việc:');
    tasks.forEach(task => {
      console.log(`- ${task.tieuDe} (${task.daHoanThanh ? 'Done' : 'Chưa'}) ${
        task.thoiGianHoanThanh ? 'lúc ' + task.thoiGianHoanThanh.toLocaleString() : ''
      }`);
    });
  } catch (error) {
    console.error('Lỗi khi lấy task:', error);
  }
}

//cập nhật trạng thái done
async function markTaskDone(taskId) {
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      console.log('Không tìm thấy task');
      return;
    }
    task.daHoanThanh = true;
    task.thoiGianHoanThanh = new Date();
    await task.save();
    console.log(`Task "${task.tieuDe}" đã được đánh dấu hoàn thành.`);
  } catch (error) {
    console.error('Lỗi cập nhật task:', error);
  }
}

//chạy thao tác mẫu
(async () => {
  const data = await createSampleData();
  if (data) {
    await showUserTasks(data.user._id);

    // Thử đánh dấu task1 done
    await markTaskDone(data.task1._id);
    await showUserTasks(data.user._id);
  }
  mongoose.disconnect();
})();