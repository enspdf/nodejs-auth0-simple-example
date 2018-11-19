const express = require("express");
const router = express.Router();
const secured = require("../middleware/secured");

router.get("/user", secured(), (req, res, next) => {
    const {
        _raw,
        _json,
        ...userProfile
    } = req.user;

    res.render("user", {
        userProfile: JSON.stringify(userProfile, null, 2),
        title: "Profile Page"
    });
});

module.exports = router;