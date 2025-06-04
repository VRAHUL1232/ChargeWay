const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const promisePool = pool.promise();

promisePool.query('SELECT 1').then(()=> console.log("Connected")).catch((err)=> console.log(err));

module.exports = promisePool;
