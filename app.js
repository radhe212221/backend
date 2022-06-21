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
mongoose.connect(url);

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
  // console.log(req.headers.authorization);
  let status = false;
  let resp = null;
  let token = req?.headers?.authorization?.split(" ")[1];
  jwt.verify(token, secret, (err, data) => {
    if (data) {
      resp = data;
      status = true;
    }
  });
  if (status) {
    // next();
    res.json({ msg: "good user", data: resp });
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
  usersModel
    .findOne({ email, password })
    .then((d) => {
      jwt.sign({ id: d?._id }, secret, (err, token) => {
        if (err) return res.json({ status: false, data: null, error: err });
        return res.json({ status: true, data: { name:d?.name, token }, error: null });
      });
    })
    .catch((err) => res.json({ status: false, data: null, error: err }));
});
app.post("/signup", (req, res) => {
  let { email } = req.body;
  usersModel
    .findOne({ email })
    .then((d) => {
      if (d)
        return res.json({
          status: false,
          data: null,
          error: "user already exists",
        });

      return usersModel
        .create(req.body)
        .then((data) => res.json({ status: true, data, error: null }))
        .catch((err) => res.json({ status: false, data: null, error: err }));
    })
    .catch((err) => res.json({ status: false, data: null, error: err }));
});

app.get("/", protectedMiddleware, (req, res) => {});
app.post("/", protectedMiddleware, (req, res) => {});
app.patch("/:id", protectedMiddleware, (req, res) => {});
app.delete("/:id", protectedMiddleware, (req, res) => {});

app.listen(4000, () => console.log("server started"));
