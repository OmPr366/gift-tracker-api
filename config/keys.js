const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

console.log(process.env.CALLBACK_URL, " CVall back")
module.exports = {
    google: {
      clientID: process.env.CLIENT_ID | null,
      clientSecret: process.env.CLIENT_SECRET | null,
      callbackURL: process.env.CALLBACK_URL | null,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    },
  };
  