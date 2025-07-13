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

const checkAvailableSlot = async (req, res) => {
  try {
    const { availableId, slots } = req.body;
    const response = await query.getCheckAvailableSlot(availableId, slots);
    if (response) {
      return res.status(200).json({ message: "Slots are available" });
    } else {
      return res.status(409).json({ message: "The slot is not valid" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server is not responding." })
  }
}

function getDistanceKm(lat1, lon1, lat2, lon2) {
  lat1 = Number(lat1);
  lon1 = Number(lon1);
  lat2 = Number(lat2);
  lon2 = Number(lon2);
  const avgLat = (lat1 + lat2) / 2;
  const avgLatRad = avgLat * Math.PI / 180;
  const latDiff = (lat2 - lat1) * 111;
  const lonDiff = (lon2 - lon1) * 111 * Math.cos(avgLatRad);
  const distance = Math.sqrt(latDiff ** 2 + lonDiff ** 2);

  return distance.toFixed(1);
}

const getNearbyStations = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const stationData = await query.getNearbyStation();
    const newFormattedData = stationData.map((data) => {
      const newData = { ...data, distance: getDistanceKm(data.lat, data.lng, latitude, longitude) };
      return newData
    })
    const sortedStationData = newFormattedData.sort((a, b) => {
      return a.distance - b.distance
    })
    res.status(200).json({ message: "good", data: sortedStationData .slice(0,15)});
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  stationData,
  availableSlot,
  checkAvailableSlot,
  getNearbyStations
};