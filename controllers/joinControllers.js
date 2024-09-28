const asyncHandler = require("express-async-handler");

const getJoinForm = asyncHandler(async (req, res) => {
    res.render("pages/join", { title: "Join", user: req.user });
});


module.exports = {
    getJoinForm,

};