const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chef.controller');

// Lấy danh sách đơn đang chờ (Dùng cho lúc mới load trang bếp)
router.get('/pending', chefController.getPendingOrders);

// Lấy danh sách đơn đã hoàn thành toàn bộ món
router.get('/completed', chefController.getCompletedOrders);

// Cập nhật trạng thái từng món
router.put('/update-item-status', chefController.updateItemStatus);

//cập nhập món ăn (hết/còn)
router.put('/menu/toggle', chefController.toggleItemAvailability);

module.exports = router;