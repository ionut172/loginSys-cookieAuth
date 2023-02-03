const express = require("express");
const route = express.Router();
const productApp = require("../controller/Product");
route.get("/", productApp);
module.exports = route;
