const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const { findUser } = require("../models/authQuery");
require("dotenv").config();

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

const isVerified = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    const role = req.headers["role"];
    console.log("role",role);
    if (!token)
      return res
        .status(401)
        .json({ message: "Token Not Found", isAuth: false });

    jwt.verify(token, process.env.SECRETKEY, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized token" });
      }
      console.log(user);
      const newUser = await findUser(user.email,role);
      console.log(newUser);
      if (!newUser){
        return res.status(401).json({ message: "User Not Found!" });
      }
      return res.status(200).json({ message: "Verified", isAuth: true }); 
    });
  } catch (err) {
    return res.status(500).json({ message: err, isAuth: false });
  }
};

module.exports = {
  authenticate,
  isVerified,
};
