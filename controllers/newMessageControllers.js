const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getNewMessageForm = asyncHandler(async (req, res) => {
    res.render("pages/newMessage", { title: "New Message", user: req.user });
});

const createNewMessage = asyncHandler(async (req, res) => {
    const { title, text } = req.body;
    const userId = req.user.id;
    await db.insertNewMessage({ title, text, userId });
    res.redirect("/");
});


module.exports = {
    getNewMessageForm,
    createNewMessage,

};