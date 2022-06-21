// custom package
const custommiddleware = require("./custommiddleware");
//global packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
// config starts
const url =
  "mongodb+srv://radhe:3!5Wr!e95!3k49J@cluster0.t0ienvm.mongodb.net/j1?retryWrites=true&w=majority";
const secret = "radhe@212221";

// connecttion to db in mongo
mongoose.connect(url, {});

const usersModel = new mongoose.model("users", {
  name: String,
  email: String,
  password: String,
});
const todosModel = new mongoose.model("todos", {
  title: String,
  status: Boolean,
});
// custom functions
function protectedMiddleware(req, res, next) {
  console.log(req.headers.authorization);
  if (true) {
    next();
  } else {
    res.json({ msg: "not authorized", status: false, data: null });
  }
}
// global middlewares
app.use(custommiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes starts
app.post("/login", (req, res) => {
  let { email, password } = req.body;
});
app.post("/signup", (req, res) => {});

app.get("/", protectedMiddleware, (req, res) => {});
app.post("/", protectedMiddleware, (req, res) => {});
app.patch("/:id", protectedMiddleware, (req, res) => {});
app.delete("/:id", protectedMiddleware, (req, res) => {});
