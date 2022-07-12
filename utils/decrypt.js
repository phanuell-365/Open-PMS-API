// jshint esversion:9

"use strict";

const crypto = require("crypto");

module.exports = {
  /**
   * Decrypts a message using a private key.
   * @param privateKey The private key to use for decryption.
   * @param encryptedMessage The encrypted message to decrypt.
   * @returns {Buffer} The decrypted message.
   */
  decryptWithPrivateKey(privateKey, encryptedMessage) {
    // const buffer = crypto.privateDecrypt(privateKey, encryptedMessage);

    return crypto.privateDecrypt(privateKey, encryptedMessage);
  },

  /**
   * Decrypts a message using a public key.
   * @param publicKey The public key to use for decryption.
   * @param encryptedMessage The encrypted message to decrypt.
   * @returns {Buffer} The decrypted message.
   */
  decryptWithPublicKey(publicKey, encryptedMessage) {
    // const buffer = crypto.publicDecrypt(publicKey, encryptedMessage);

    return crypto.publicDecrypt(publicKey, encryptedMessage);
  },
};
