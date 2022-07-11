// jshint esversion:9

"use strict";

const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const key = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      // cipher: "aes-256-cbc",
      // passphrase: "top secret",
    },
  });

  const publicKey = key.publicKey;
  const privateKey = key.privateKey;

  fs.writeFileSync(__dirname + "/public.pem", publicKey);
  fs.writeFileSync(__dirname + "/private.pem", privateKey);
}

genKeyPair();