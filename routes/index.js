const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index", {
        title: "Auth0 Webapp Sample NodeJS"
    });
});

module.exports = router;