const { Router } = require("express");
const newMessageController = require("../controllers/newMessageControllers");

const newMessageRouter = Router();

newMessageRouter.get("/", newMessageController.getNewMessageForm);

module.exports = newMessageRouter;