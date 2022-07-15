// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");

class User extends Model {

  static createPasswordHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static validatePassword(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: [10, 10],
      validate: {
        notNull: {
          msg: "Phone number is required"
        }
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "pharmacist", "salesperson"],
      allowNull: false,
      defaultValue: "pharmacist"
    }
  },
  {
    hooks: {
      beforeCreate(attributes, options) {
        attributes.id = attributes.id || DataTypes.UUIDV4();

        attributes.password = (() => {
          const salt = bcrypt.genSaltSync(10);
          return bcrypt.hashSync(attributes.password, salt);
        })();
      }
    },
    sequelize,
    modelName: "User"
  }
);

module.exports = User;
