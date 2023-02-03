const auth = require("../middleware/auth");
const { registerUser, loginUser } = require("../controller/User");
const firstCookie = require("../middleware/cookies");
const express = require("express");
const route = express.Router();
route.post("/register", firstCookie, registerUser);
route.post("/login", loginUser);

module.exports = route;
