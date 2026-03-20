const express = require('express');
const router = express.Router();
const managerController = require('../controllers/manager.controller');

router.get('/tables', managerController.getAllTables);
router.post('/table/open', managerController.openTable);
router.get('/payments/pending', managerController.getPendingPayments);
router.post('/payments/confirm', managerController.confirmPayment);
router.post('/table/merge', managerController.mergeTables);
router.post('/table/unmerge', managerController.unmergeTable);

module.exports = router;
