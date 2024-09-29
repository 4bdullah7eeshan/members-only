const express = require("express");
const path = require("node:path");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


const pool = require("./db/pool");



// Import routers here
const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const indexRouter = require("./routes/indexRouter");
const logOutRouter = require("./routes/logOutRouter");
const joinRouter = require("./routes/joinRouter");
const newMessageRouter = require("./routes/newMessageRouter");


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
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/sign-in", signInRouter);
app.use("/log-out", logOutRouter);
app.use("/join", joinRouter);
app.use("/new-message", newMessageRouter);

passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const user = rows[0];
  
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return done(null, false, { message: "Incorrect password" })
        }

        return done(null, user);
      } catch(err) {
        return done(err);
      }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
      const user = rows[0];
  
      done(null, user);
    } catch(err) {
      done(err);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Members Only Club running on port ${PORT}!`)
);
