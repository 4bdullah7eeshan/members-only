const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const getJoinForm = asyncHandler(async (req, res) => {
    res.render("pages/join", { title: "Join", user: req.user });
});

const giveMembershipStatus = asyncHandler(async (req, res) => {
    const { passcode } = req.body;
    const userId = req.user.id;

    const correctPasscode = "Odin";

    if (passcode.toLowerCase() === correctPasscode.toLowerCase()) {
        await db.updateMembershipStatus(userId, true);
        return res.redirect("/");
    } else {
        return res.render("pages/join", {
            title: "Join",
            user: req.user,
            error: "Incorrect passcode. Please try again."
        });
    }
});


module.exports = {
    getJoinForm,
    giveMembershipStatus,

};