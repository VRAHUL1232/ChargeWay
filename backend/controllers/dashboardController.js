const express = require("express");
const pool = require("../config/db");
const query = require("../models/dashboardQuery");
require("dotenv").config();

const app = express();

app.use(express.json());

const stationData = async (req, res) => {
  try {
    const data = await query.getStations();
    return res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

const availableSlot = async (req, res) => {
  try {
    const stationId = req.params.stationId;
    const data = await query.getAvailableStations(stationId);
    return res.status(200).json({data : data})
  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  stationData,
  availableSlot
};