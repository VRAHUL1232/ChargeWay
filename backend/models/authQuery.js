const pool = require('../config/db');

const createTables = async () => {
  pool
    .query(
      "CREATE TABLE IF NOT EXISTS AUTH(USERNAME VARCHAR(255) NOT NULL, PASSWORD VARCHAR(255) NOT NULL, EMAIL VARCHAR(255) NOT NULL PRIMARY KEY, ROLE VARCHAR(255));"
    )
    .then(()=> console.log("Table created Successfully"))
    .catch((err)=> console.log("Error occured ,", err));
};

const createUser = async (username, email, password)=> {
    await pool
    .query("INSERT INTO AUTH (username,email,password,role) VALUES (?,?,?,?)", [
      username,
      email,
      password,
      "user",
    ])
}

const findUser = async (email)=> {
    const user = await pool
    .query("SELECT * FROM AUTH WHERE EMAIL=? AND ROLE=?", [
      email,
      "user"
    ])
    return user;
}

module.exports = {
    createTables,
    createUser,
    findUser
}