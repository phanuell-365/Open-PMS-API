// jshint esversion:9

"use strict";

const sequelize = require("config.db");
const { Model, DataTypes } = require("sequelize");

class Supplier extends Model {}

Supplier.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: "Email is required",
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Phone number is required",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Supplier",
  }
);

module.exports = Supplier;
