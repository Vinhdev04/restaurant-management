const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

// Danh sách đơn chờ thanh toán / chờ xác thực
router.get('/payments/pending', managerController.getPendingPayments);

// Quản lý bấm xác nhận thanh toán
router.post('/payments/confirm', managerController.confirmPayment);

// Lấy danh sách toàn bộ bàn (Để vẽ sơ đồ)
router.get('/tables', managerController.getAllTables);

// Quản lý mở bàn (Tạo mã PIN)
router.post('/table/open', managerController.openTable);
//Ghép bàn
router.post('/table/merge', managerController.mergeTables);

router.post('/table/unmerge', managerController.unmergeTable);

module.exports = router;