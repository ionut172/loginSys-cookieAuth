const Login = require("../model/User");
const cookie = require("cookie-parser");
const e = require("express");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(401).json("Please provide data login");
  }
  let token = "";
  const addUser = await Login.create({
    name: name,
    email: email,
    password: password,
    token,
  });
  if (addUser) {
    addUser.token = addUser.createJWT();
    res.cookie(`${addUser.name}`, "registered");
    res.cookie("token", `${addUser.token}`);
  } else {
    return res.status(401).json({ msg: "Account not created" });
  }

  res.status(201).json({ msg: "Registered", data: addUser });
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(401).json({ msg: "Not logged. Provide good data." });
    }
    const findUser = await Login.findOne({ email: email });
    if (!findUser) {
      return res.status(401).json("Provide good data");
    }

    const verify = await findUser.verifyy(password).then(function (response) {
      if (!response) {
        return res.status(401).json("Password incorrect. Try again.");
      } else {
        findUser.token = findUser.createJWT();
        res.header("Authorization", `Bearer ${findUser.token}`);
        console.log("sunt pana aici");
        let cookie_Stuff = req.signedCookies.user;
        //But the user is logging in for the first time so there won't be any appropriate signed cookie for usage.
        if (!cookie_Stuff) {
          //True for our case
          let auth_Stuff = req.headers.authorization;
          if (!auth_Stuff) {
            //No authentication info given
            res.setHeader("Authorization", `Bearer ${findUser.token}`);
            res.cookie(`${findUser.name}`, "administrator");
            res.cookie("token", `${findUser.token}`, {
              expiry: new Date(Date.now() * 7 * 24 * 3600 * 1000),
              httpOnly: true,
            });
            console.log("am setat cookie-ul");

            return res.json(findUser);
          } else {
            step1 = new Buffer.from(auth_Stuff.split(" ")[1], "base64");
            //Extracting username:password from the encoding Authorization: Basic username:password
            step2 = step1.toString().split(":");
            //Extracting the username and password in an array
            if (step2[0] == "administrator" && step2[1] == "administrator") {
              //Correct username and password given
              console.log("WELCOME ADMIN");
              //Store a cookie with name=user and value=username

              res.send("Signed in the first time");
            } else {
              //Wrong authentication info, retry
              res.setHeader("Authorization", `Bearer ${findUser.token}`);
              res.sendStatus(401);
            }
          }
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
