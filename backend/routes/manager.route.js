const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

router.get('/tables', managerController.getAllTables);
router.post('/table/open', managerController.openTable);
router.get('/payments/pending', managerController.getPendingPayments);
router.post('/payments/confirm', managerController.confirmPayment);
router.post('/table/merge', managerController.mergeTables);
router.post('/table/unmerge', managerController.unmergeTable);

// Quản lý món ăn
router.post('/menu/toggle-sold-out', managerController.toggleMenuItemSoldOut);
router.post('/menu/reset-all', managerController.resetAllMenuStatus);
router.post('/menu/add', managerController.addMenuItem);

module.exports = router;
