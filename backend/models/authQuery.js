const { json } = require("express");
const pool = require("../config/db");

const createTables = async () => {
  await pool
    .query(
      "CREATE TABLE IF NOT EXISTS auth(id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, role VARCHAR(255) NOT NULL);"
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