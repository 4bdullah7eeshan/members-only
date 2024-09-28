const { Router } = require("express");
const joinController = require("../controllers/joinControllers");

const joinRouter = Router();

joinRouter.get("/", joinController.getJoinForm);

module.exports = joinRouter;