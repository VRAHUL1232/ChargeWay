const { json } = require("express");
const pool = require("../config/db");

const getStations = async () => {
  try {
    const stationData = await pool.query(
      "SELECT * FROM station");
    return stationData.rows;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getStations,
};
