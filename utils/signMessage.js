// jshint esversion:9

"use strict";

const crypto = require("crypto");
const hash = crypto.createHash("sha256");
const fs = require("fs");
const encrypt = require("./encrypt");

const data = {
  name: "John Doe",
  age: 30,
  description:
    "This is a test for the encryption module. And this is a long description.",
};

// const privateData = {
//   address: "123 Main St",
//   city: "New York",
//   state: "NY",
//   zip: "10001",
//   phone: "123-456-7890",
//   email: "johndoe@email.com",
// };

// String version of the data.
const myDataString = JSON.stringify(data);

//
hash.update(myDataString);

// Hash the data in hexadecimal format.
const hashedData = hash.digest("hex");

// get the private key
const privateKey = fs.readFileSync(__dirname + "/private.pem");

// store the signed message in a variable
const signedMessage = encrypt.encryptWithPrivateKey(privateKey, hashedData);

// provide the receiver with the signed message

module.exports = {
  packageOfDataToSend: {
    algorithm: "sha256",
    originalData: data,
    signedAndEncryptedData: signedMessage,
  },
};
