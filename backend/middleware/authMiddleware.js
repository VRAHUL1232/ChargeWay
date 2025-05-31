const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
require('dotenv').config()

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) return res.status(401).send("Token missing");

    jwt.verify(token, process.env.SECRETKEY, (err, user) => {
      if (err) return res.status(403).send("Invalid token");
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ error: "Error occured" + err });
  }
};

module.exports = {
  authenticate,
};
