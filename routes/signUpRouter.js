const { Router } = require("express");
const signUpController = require("../controllers/signUpControllers");

const signUpRouter = Router();

signUpRouter.get("/", signUpController.getSignUpPage);

module.exports = signUpRouter;