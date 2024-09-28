const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const db = require("../db/queries");

const getSignUpPage = asyncHandler(async (req, res) => {
    res.render("pages/signUp", { title: "Sign up" });
});

const createNewUser = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) {
                return next(err); 
            }
            await db.insertNewUser({ firstName, lastName, username, hashedPassword });
            res.redirect("/");
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = {
    getSignUpPage,
    createNewUser,

};