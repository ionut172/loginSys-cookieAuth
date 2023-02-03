const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const userModel = mongoose.Schema({
  name: {
    type: String,
    maxlength: 10,
    minlength: 2,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    maxlength: 40,
    minlength: 2,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    maxlength: 50,
    minlength: 2,
    required: true,
  },
  token: {
    type: String,
  },
});
userModel.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userModel.methods.createJWT = function () {
  return jwt.sign({ id: this._id, name: this.name }, "jwtsecret", {
    expiresIn: "30d",
  });
};
userModel.methods.verifyy = function (candPass) {
  const isMatch = bcrypt.compare(candPass, this.password);
  return isMatch;
};
module.exports = mongoose.model("Login", userModel);
