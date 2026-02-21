require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Đã kết nối MongoDB'))
  .catch(err => {
    console.error('Lỗi kết nối MongoDB:', err);
    process.exit(1);
  });

//định tuyến
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

//route mặc định
app.get('/', (req, res) => {
  res.send('API quản lý task đang chạy...');
});

//xử lý lỗi 404
app.use((req, res) => {
  res.status(404).json({ message: 'Không tìm thấy đường dẫn' });
});

//xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error('Lỗi server:', err.stack);
  res.status(500).json({ message: 'Đã xảy ra lỗi server' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});