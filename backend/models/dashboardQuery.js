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

const FormattedDate = (dateObj) => {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');

  const formattedDate = `${yyyy}-${mm}-${dd}`;
  return formattedDate
}

const getAvailableStations = async (stationId) => {
  try {
    const availableSlot = await pool.query(`SELECT * FROM available where s_id=$1`, [stationId]);
    const currentDateTime = Date.now();

    const filteredAvailableSlot = availableSlot.rows.filter((data) => {
      const newDate = FormattedDate(data.av_book_date) + 'T' + data.av_start_time;
      const availableDateTime = new Date(newDate);
      if (currentDateTime < availableDateTime) {
        return true;
      }
      return false;
    });
    const sortedFilteredAvailableSlot = filteredAvailableSlot.sort((a,b)=> {
      const newDate1 = FormattedDate(a.av_book_date) + 'T' + a.av_start_time;
      const newDateTime1 = new Date(newDate1);
      const newDate2 = FormattedDate(b.av_book_date) + 'T' + b.av_start_time;
      const newDateTime2 = new Date(newDate2);
      return newDateTime1-newDateTime2;
    })
    console.log(sortedFilteredAvailableSlot)
    return sortedFilteredAvailableSlot;
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  getStations,
  getAvailableStations
};
