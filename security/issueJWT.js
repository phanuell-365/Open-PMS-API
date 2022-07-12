// jshint esversion:9

"use strict";

const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");

/**
 * Creates a JWT. The JWT is signed with the private key.
 * @param user The user to create the JWT for.
 * @returns {{expires: string, token: string}} The JWT.
 */
module.exports = (user) => {
  const PRV_KEY = fs.readFileSync(__dirname + "/private.pem", "utf8");

  const payload = {
    sub: user.id,
    iat: Date.now(),
  };

  const expiresIn = "1d";

  const signedToken = jsonwebtoken.sign(payload, PRV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};
