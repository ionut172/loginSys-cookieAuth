const express = require("express");
const Login = require("../model/User");
const jwt = require("jsonwebtoken");
const auth = async function (req, res, next) {
  try {
    const tokenS = req.headers.cookie;
    console.log(tokenS);
    if (tokenS) {
      console.log("sau aici");
      const token = tokenS.split(" ")[1].split("=")[1].split(";")[0];

      if (!token) {
        return res.status(401).json({ msg: "Not good datas" });
      }
      const decoded = jwt.verify(token, "jwtsecret");
      if (!decoded) {
        return res.status(401).json({ msg: "Not token provided" });
      }
      console.log(decoded);
      req.user = decoded;
      return next();
    } else {
      console.log("aici");
      return res.status(401).json({ msg: "Not good datas" });
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = auth;
