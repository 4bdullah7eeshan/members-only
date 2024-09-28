const { Router } = require("express");
const passport = require("passport");

const logOutController = require("../controllers/logOutControllers");

const logOutRouter = Router();

logOutRouter.get("/", logOutController.logOut);


module.exports = logOutRouter;