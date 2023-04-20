const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../models/userSchema");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "256318582689-q93943i476q3ei2lthpp8mfcnp3ismvr.apps.googleusercontent.com",
      clientSecret: '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',
      callbackURL:
        "http://localhost:3000/auth/google/callback?redirect_url=http://127.0.0.1:5173/person",
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName } = profile;
      const user = await User.findOneAndUpdate(
        { googleId: id },
        { name: displayName },
        { upsert: true, new: true }
      );
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
