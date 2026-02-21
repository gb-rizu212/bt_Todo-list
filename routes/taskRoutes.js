const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET /tasks - lấy tất cả task
router.get('/getAllTasks', taskController.layTatCaTask);

// GET /tasks/user/:ten - lấy task theo user
router.get('/user/:ten', taskController.layTaskTheoTenUser);

// GET /tasks/hom-nay - lấy task trong ngày
router.get('/hom-nay', taskController.layTaskHomNay);

// GET /tasks/chua-hoan-thanh 
router.get('/chua-hoan-thanh', taskController.layTaskChuaHoanThanh);

// GET /tasks/task-user/ho-nguyen 
router.get('/task-user/ho-nguyen', taskController.layTaskUserHoNguyen);

// POST /tasks - tạo task mới
router.post('/', taskController.taoTask);

module.exports = router;