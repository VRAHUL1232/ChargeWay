const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const query = require("../models/authQuery");
require("dotenv").config();

const app = express();

app.use(express.json());

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await query.findUser(email, role);
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: `${role} Not Found!` });
    }
    const userPassword = user.password;
    if (!(await bcrypt.compare(password, userPassword))) {
      return res.status(401).json({ error: "Password is Incorrect." });
    }
    const token = jwt.sign({ email }, process.env.SECRETKEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server is not Available! Please try later." });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await query.findUser(email, "User");
    if (user) {
      return res.status(409).json({ error: "User already exists." });
    }
    await query.createUser(username, email, hashed);
    const token = jwt.sign({ email }, process.env.SECRETKEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({ token: token, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server is not Available! Please try later." });
  }
};

const logout = async (req, res) => {
  res.send("Logout Page");
};

module.exports = {
  login,
  register,
  logout,
};