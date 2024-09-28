const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const { body, validationResult } = require("express-validator");

const db = require("../db/queries");

const getSignUpPage = asyncHandler(async (req, res) => {
    res.render("pages/signUp", { title: "Sign up" });
});

const validateSignUp = [
    body('first-name').trim().isLength({ min: 1 }).withMessage('First name is required'),
    body('last-name').trim().isLength({ min: 1 }).withMessage('Last name is required'),
    body('username').trim().isEmail().withMessage('Username must be a valid email')
        .custom(async (value) => {
            const user = await db.findUserByUsername(value);
            if (user) {
                throw new Error('Username already in use');
            }
            return true;
        }),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('confirm-password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    })
];

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