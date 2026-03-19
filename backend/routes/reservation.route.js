const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.post('/add', reservationController.createReservation);
router.get('/all', reservationController.getAllReservations);
router.put('/update-status/:id', reservationController.updateReservationStatus);
router.delete('/delete/:id', reservationController.deleteReservation);

module.exports = router;
