// const mysql = require("mysql2");
require("dotenv").config();

// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// const promisePool = pool.promise();

// promisePool.query('SELECT 1').then(()=> console.log("Connected")).catch((err)=> console.log(err));

// module.exports = promisePool;

const {Pool} = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('connect', () => {
  console.log('Connected to Supabase PostgreSQL database')
})

pool.on('error', (err) => {
  console.error('Database connection error:', err)
})

module.exports = pool