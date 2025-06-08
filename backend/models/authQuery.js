const { json } = require("express");
const pool = require("../config/db");

const createTables = async () => {
  await pool
    .query(
      "CREATE TABLE IF NOT EXISTS AUTH(USERNAME VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL, EMAIL VARCHAR(255) NOT NULL PRIMARY KEY, ROLE VARCHAR(255) NOT NULL);"
    )
    .then(() => console.log("Table created Successfully"))
    .catch((err) => console.log("Error occured ,", err));
};

const createUser = async (username, email, password) => {

  try {
    const createdUser = await pool.query(
      "INSERT INTO auth (username,email,password,role) VALUES ($1,$2,$3,$4) RETURNING *",
      [username, email, password, "User"]
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUser = async (email, role) => {
  try {
    const user = await pool.query(
      "SELECT * FROM auth WHERE email=$1 AND role=$2",
      [email, role]
    );
    return user.rows[0];
  } catch (error) {
    throw new Error(error.message)
  }
};

module.exports = {
  createTables,
  createUser,
  findUser,
};
