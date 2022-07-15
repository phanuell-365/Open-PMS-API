// jshint esversion:9

"use strict";

module.exports = {
  /**
   * Output the information about the user.
   */
  user(_user, print = false) {
    const userObj = _user.toJSON();

    const userVal = {
      id: userObj.id,
      email: userObj.email,
      username: userObj.username,
      phone: userObj.phone,
      role: userObj.role
    };

    if (print) {
      console.log(userVal);
    }

    return userVal;
  }
};
