const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Menu Routes
router.post('/menu/add', adminController.addMenuItem);
router.get('/menu/all', adminController.getAllMenuItems);
router.put('/menu/edit/:id', adminController.updateMenuItem);
router.delete('/menu/delete/:id', adminController.deleteMenuItem);

// Staff Routes
router.get('/staff/all', adminController.getAllStaff);
router.post('/staff/add', adminController.addStaff);
router.put('/staff/edit/:id', adminController.updateStaff);
router.delete('/staff/delete/:id', adminController.deleteStaff);

// Table Routes
router.post('/table/add', adminController.addTable);

// Stats Routes
router.get('/revenue', adminController.getRevenue);
router.get('/stats', adminController.getGeneralStats);

module.exports = router;
