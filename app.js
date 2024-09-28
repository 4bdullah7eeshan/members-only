const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const signUpRouter = require("./routes/signUpRouter");


// Import routers here
const signUpRouter = require("./routes/signUpRouter");


const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// Use routers here
app.use("/sign-up", signUpRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Members Only Club running on port ${PORT}!`)
);
