// jshint esversion:9

"use strict";

const decrypt = require("./decrypt");
const crypto = require("crypto");
const fs = require("fs");

// import the message that we receive from the sender
const receivedData = require("./signMessage").packageOfDataToSend;

// console.log("The value of receivedData is:", receivedData);

// create a hash of the received message
const hash = crypto.createHash(receivedData.algorithm);

// import the public key of the sender
const publicKey = fs.readFileSync(__dirname + "/public.pem", "utf8");

// decrypt the signed message using the public key of the sender
const decryptedMessage = decrypt.decryptWithPublicKey(
  publicKey,
  receivedData.signedAndEncryptedData
);

// convert the decrypted message to a string
const decryptedMessageString = decryptedMessage.toString();

// compare the hash of the received message with the hash of the decrypted message
const hashOfOriginal = hash.update(JSON.stringify(receivedData.originalData));
const hashOfOriginalHex = hash.digest("hex");

// if the hashes match, the message was not altered
if (hashOfOriginalHex === decryptedMessageString) {
  console.log("The message was not altered.");
} else {
  console.log("The message was altered.");
}
