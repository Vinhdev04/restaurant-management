const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chef.controller');

router.get('/pending', chefController.getPendingOrders);
router.get('/completed', chefController.getCompletedOrders);
router.post('/update-item-status', chefController.updateItemStatus);
router.post('/menu/toggle', chefController.toggleMenuItemSoldOut);

module.exports = router;
