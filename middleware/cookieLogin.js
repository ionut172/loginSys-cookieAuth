const express = require("express");
const cookie = require("cookie-parser");
const welcomeHandler = (req, res, next) => {
  // if this request doesn't have any cookies, that means it isn't
  // authenticated. Return an error code.
  console.log(req.cookies);
  if (!req.cookies) {
    res.status(401).end();
    console.log("aici1");
    return;
  }

  // We can obtain the session token from the requests cookies, which come with every request
  const sessionToken = req.cookies["token"];
  console.log(sessionToken);
  if (!sessionToken) {
    console.log("aici2");
    // If the cookie is not set, return an unauthorized status
    res.status(401).end();
    return;
  }

  console.log(sessionToken);
  if (!sessionToken) {
    console.log("aici3");
    // If the session token is not present in session map, return an unauthorized error
    res.status(401).end();
    return;
  }

  // If all checks have passed, we can consider the user authenticated and
  // send a welcome message
  next();
};
module.exports = welcomeHandler;
