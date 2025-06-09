require("dotenv").config();

const {Pool} = require('pg')
const dns = require('dns');

dns.setDefaultResultOrder('ipv4first');

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