// jshint esversion:9

"use strict";

const crypto = require("crypto");

module.exports = {
  /**
   * Encrypts a message with a private key. This is a one-way encryption. For data encryption.
   * @param publicKey The public key to use for encryption.
   * @param message The message to encrypt.
   * @returns {Buffer} The encrypted message.
   */
  encryptWithPublicKey(publicKey, message) {
    const buffer = Buffer.from(message, "utf8");

    return crypto.publicEncrypt(publicKey, buffer);
  },

  /**
   * Encrypts a message with a private key. This is a one-way encryption.
   * This enables for digital signatures.
   * @param privateKey The private key to use for encryption.
   * @param message The message to encrypt.
   * @returns {Buffer} The encrypted message.
   */
  encryptWithPrivateKey(privateKey, message) {
    const buffer = Buffer.from(message, "utf8");

    return crypto.privateEncrypt(privateKey, buffer);
  },
};
