require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const auth = require("./middleware/auth");
const userApp = require("./routes/user");
const productRouter = require("./routes/product");
const loginCookie = require("./middleware/cookieLogin");
app.use(express.urlencoded({ extended: false }));

const connectDB = require("./db/connectDB");

app.use(express.json());
app.use("/register", express.static("public"));
app.use("/login", express.static("login-public"));
app.use("/api/v1/user", userApp);
app.use("/api/v1/product", auth, loginCookie, productRouter);

const start = async function () {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3500, () => {
      console.log(`Server has been hitted by server`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
