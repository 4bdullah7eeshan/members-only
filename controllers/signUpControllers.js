const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getSignUpPage = asyncHandler(async (req, res) => {
    res.render("pages/signUp", { title: "Sign up" });
});

module.exports = {
    getSignUpPage,

};