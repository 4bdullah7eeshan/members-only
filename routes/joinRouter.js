const { Router } = require("express");
const joinController = require("../controllers/joinControllers");

const joinRouter = Router();

joinRouter.get("/", joinRouter.getJoinForm);

module.exports = joinRouter;