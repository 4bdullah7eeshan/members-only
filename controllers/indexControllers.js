const asyncHandler = require("express-async-handler");
const db = require("../db/queries");


const getHomePage = asyncHandler(async (req, res) => {
    let messages;

    if (req.user && req.user.membership_status) {
        messages = await db.getAllMessagesWithUserDetails();
    } else {
        messages = await db.getAllMessagesWithoutUserDetails();
    }

    res.render("pages/index", { title: "Home", user: req.user, messages });
});


module.exports = {
    getHomePage,

};