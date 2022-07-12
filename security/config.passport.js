// jshint esversion:9

"use strict";

const fs = require("fs");
const User = require("../models/users");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const PUB_KEY = fs.readFileSync(__dirname + "/public.pem", "utf8");

// the options object for passport jwt strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findByPk(payload.sub)

    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = (passport) => {
  passport.use(strategy);
};

// const passportJWTOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: PUB_KEY || "secret",
//   issuer: "http://localhost:4040",
//   audience: "http://localhost:4040",
//   algorithms: ["RS256"],
//   ignoreExpiration: false,
//   _passReqToCallback: false,
//   jsonWebTokenOptions: {
//     complete: false,
//     maxAge: "2d", // 2 days
//     clockTolerance: "",
//     nonce: "String here or OpenID Connect nonce",
//   },
// };
