const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/menu/add', adminController.addMenuItem);
router.get('/menu/all', adminController.getAllMenuItems);
router.post('/table/add', adminController.addTable);
router.put('/menu/edit/:id', adminController.updateMenuItem);
router.delete('/menu/delete/:id', adminController.deleteMenuItem);
router.get('/revenue', adminController.getRevenue);
router.get('/stats', adminController.getGeneralStats);

module.exports = router;
