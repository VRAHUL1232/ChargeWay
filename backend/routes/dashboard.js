const express = require('express');
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");
router.get('/station',dashboardController.stationData);

module.exports = router;