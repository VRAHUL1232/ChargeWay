const express = require('express');
const router = express.Router();

const dashboardController = require("../controllers/dashboardController")

router.get('/station',dashboardController.stationData);

router.get('/availableSlot/:stationId',dashboardController.availableSlot);

router.post('/checkAvailable',dashboardController.checkAvailableSlot);

router.get('/getNearbyStation', dashboardController.getNearbyStations)

module.exports = router;