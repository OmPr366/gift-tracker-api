const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send("test");
});

// Authenticate user with Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Accept Google response and return JWT to client
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    console.log("USer ID  Connecting :- ")
    console.log("USer ID :- ",req.user.id)
    const token = jwt.sign({ userId: req.user.id }, keys.jwt.secret, {
      expiresIn: "1h",
    });
    res.redirect(
      `${req.query.redirect_url}?token=${token}&user=${req.user.id}`
    );
  }
);

// Logout current user
router.get("/logout", (req, res) => {
  req.logout();
  res.status(204).end();
});

module.exports = router;
