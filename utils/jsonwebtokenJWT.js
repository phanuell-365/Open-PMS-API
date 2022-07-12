// jshint esversion:9

"use strict";

const jwt = require("jsonwebtoken");
const fs = require("fs");

// import the private and public keys
const publicKey = fs.readFileSync(__dirname + "/public.pem", "utf8");
const privateKey = fs.readFileSync(__dirname + "/private.pem", "utf8");

// create a payload object
const payloadObj = {
  sub: "1234567890",
  name: "John Doe",
  admin: true,
  iat: 1516239022,
};

// create a JWT
const token = jwt.sign(payloadObj, privateKey, { algorithm: "RS256" });

// print the JWT
console.log("The token is:", token);

// verify the JWT
jwt.verify(token, publicKey, { algorithm: "RS256" }, (err, decoded) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("Decoded:", decoded);
  }
});
