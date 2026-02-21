const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//đky user
router.post('/dangky', userController.dangKy);

//lấy dsach user
router.get('/', userController.layTatCaUser);

module.exports = router;