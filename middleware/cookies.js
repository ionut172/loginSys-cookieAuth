const express = require("express");
const cookie = require("cookie-parser");
const firstCookie = (req, res, next) => {
  res.cookie("name", "express");
  next();
};
module.exports = firstCookie;
