const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController')

router.post('/bookSlot',bookingController.handleQueuedProcess);

router.get('/getCurrentStation/:id', bookingController.getCurrentBookingData)

module.exports = router;