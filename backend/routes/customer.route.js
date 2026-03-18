const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.post('/verify-pin', customerController.verifyTabletPin);
router.post('/order', customerController.placeOrder);

// Tablet yêu cầu thanh toán
router.post('/request-payment', customerController.requestPayment);

// Đường dẫn mới để Tablet gọi lấy dữ liệu cũ
router.get('/all-orders', customerController.getAllOrders);
router.get('/:tableId', customerController.getTableOrders);
module.exports = router;