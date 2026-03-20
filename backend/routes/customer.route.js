const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

router.post('/verify-pin', customerController.verifyPin);
router.post('/order', customerController.placeOrder);
router.get('/:tableId', customerController.getOrdersByTable);
router.post('/request-payment', customerController.requestPayment);

module.exports = router;
