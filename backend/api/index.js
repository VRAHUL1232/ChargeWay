const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT;
const HOSTIP = process.env.HOSTIP;
const query = require("../models/authQuery");
const authRoute = require("../routes/authRoute");
const dashboardRoute = require('../routes/dashboard')

query.createTables();

app.get("/", (req, res) => {
  res.send("Hello everyone");
});

app.use("/", authRoute);

app.use("/",dashboardRoute)

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:/api/${PORT}`);
});

module.exports = app