const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const query = require("../models/authQuery");
require('dotenv').config();

const app = express();

app.use(express.json());

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await query.findUser(email);
    if (!user && !(await bcrypt.compare(password,user.password))){
        res.send(401).json({error: "User not exist or password not correct"})
    }
    const token = jwt.sign({email},process.env.SECRETKEY,{expiresIn: '1h'});
    res.status(201).json({token});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to login" });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  query
    .createUser(username, email, password)
    .then(() => {
      res.status(201).json({ username, password, email });
    })
    .catch((err) => {
      res.status(500).json({ error: "registration failed" });
    });
};

const logout = async (req, res) => {
  res.send("Logout Page");
};

module.exports = {
  login,
  register,
  logout,
};
