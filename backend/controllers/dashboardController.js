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
    return res.status(200).json({ data: data })
  } catch (err) {
    console.log(err)
  }
}

const bookSlot = async (req, res) => {
  
}

const checkAvailableSlot = async (req,res) => {
  try {
    const {availableId, slots} = req.body;
    const response = await query.getCheckAvailableSlot(availableId, slots);
    if (response){
      return res.status(200).json({message: "Slots are available"});
    } else {
      return res.status(409).json({message: "The slot is not valid"});
    }
  } catch (error) {
    res.status(500).json({error: "Server is not responding."})
  }
}


module.exports = {
  stationData,
  availableSlot,
  bookSlot,
  checkAvailableSlot
};