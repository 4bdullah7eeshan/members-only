const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

// Import routers here


const app = express();
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(bodyParser.json());

app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

// Use routers here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Members Only Club running on port ${PORT}!`)
);
