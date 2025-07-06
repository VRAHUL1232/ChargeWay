const { json } = require("express");
const pool = require("../config/db");

const createTables = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS auth(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        username VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL UNIQUE, 
        role VARCHAR(255) NOT NULL);`
    );
    console.log("1")
    await pool.query(
      `CREATE TABLE IF NOT EXISTS station(
        s_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(255) NOT NULL, 
        address VARCHAR(512) NOT NULL, 
        lat REAL NOT NULL, 
        lng REAL NOT NULL, 
        ac1 BOOLEAN DEFAULT FALSE, 
        ac2 BOOLEAN DEFAULT FALSE, 
        dc1 BOOLEAN DEFAULT FALSE, 
        dc2 BOOLEAN DEFAULT FALSE, 
        power REAL DEFAULT 0, 
        review REAL DEFAULT 0, 
        phone_number VARCHAR(20) NOT NULL, 
        ac_type BOOLEAN DEFAULT FALSE, 
        dc_type BOOLEAN DEFAULT FALSE, 
        u_id INT NOT NULL,
        FOREIGN KEY (u_id) REFERENCES auth(id));`
    );
        console.log("2")
    console.log("created stations")
    await pool.query(`CREATE TABLE IF NOT EXISTS bookings(
      b_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
      s_id INT NOT NULL, 
      u_id INT NOT NULL, 
      start_time TIME NOT NULL, 
      end_time TIME NOT NULL, 
      book_date DATE NOT NULL, 
      slots INT NOT NULL, 
      amount REAL NOT NULL,
      time_stamp TIMESTAMP NOT NULL, 
      FOREIGN KEY (s_id) REFERENCES station(s_id),
      FOREIGN KEY (u_id) REFERENCES auth(id));`);
    console.log("3")
    await pool.query(`CREATE TABLE IF NOT EXISTS available(
        av_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
        s_id INT NOT NULL, 
        av_start_time TIME NOT NULL, 
        av_end_time TIME NOT NULL, 
        av_book_date DATE NOT NULL, 
        av_slots INT NOT NULL,
        cost INT NOT NULL,
        FOREIGN KEY (s_id) REFERENCES station(s_id),
        UNIQUE (s_id, av_book_date, av_start_time));`);
      console.log("created available")
  } catch (err) {
    console.log(err);
  }
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
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = {
  createTables,
  createUser,
  findUser,
};
