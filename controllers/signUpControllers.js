const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getSignUpPage = asyncHandler(async (req, res) => {
    res.render("pages/signUp", { title: "Sign up" });
});

const createNewUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, username, password } = req.body;

    try {
        await db.insertNewUser({ firstName, lastName, username, password });
        res.redirect("/");
    } catch(err) {
        return next(err);
    }
    
});

module.exports = {
    getSignUpPage,
    createNewUser,

};