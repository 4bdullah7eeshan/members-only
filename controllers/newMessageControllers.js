const asyncHandler = require("express-async-handler");

const getNewMessageForm = asyncHandler(async (req, res) => {
    res.render("pages/newMessage", { title: "New Message", user: req.user });
});


module.exports = {
    getNewMessageForm,

};