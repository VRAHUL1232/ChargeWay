const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2108",
  database: "ev",
});

const promisePool = pool.promise();

promisePool.query('SELECT 1').then(()=> console.log("Connected")).catch((err)=> console.log(err));

module.exports = promisePool;
