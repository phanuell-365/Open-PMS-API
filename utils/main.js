// jshint esversion:9

"use strict";

const encrypt = require("./encrypt");
const decrypt = require("./decrypt");
const fs = require("fs");

const publicKey = fs.readFileSync(__dirname + "/public.pem", "utf8");
const privateKey = fs.readFileSync(__dirname + "/private.pem", "utf8");

console.log("The private key is:", privateKey);
console.log("The public key is:", publicKey);

console.log(
  "The encrypted message is:",
  encrypt.encryptWithPublicKey(publicKey, "Hello World")
);
console.log(
  "The decrypted message is:",
  decrypt
    .decryptWithPrivateKey(
      privateKey,
      encrypt.encryptWithPublicKey(publicKey, "Hello World")
    )
    .toString()
);

const encryptedMessage = encrypt.encryptWithPublicKey(
  publicKey,
  "Super secret message"
);

console.log("Encrypted message:", encryptedMessage.toString());

const decryptedMessage = decrypt.decryptWithPrivateKey(
  privateKey,
  encryptedMessage
);

console.log("Decrypted message:", decryptedMessage.toString());
