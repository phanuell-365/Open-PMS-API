// jshint esversion:9

"use strict";

const sequelize = require("../config/config.db");
const { Model, DataTypes } = require("sequelize");

class Sale extends Model {

}

Sale.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true

  },

  issueUnitQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Quantity is required"
      }
    }
  },

  issueUnitPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  totalPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  state: {
    type: DataTypes.ENUM,
    values: ["pending", "issued", "cancelled"],
    defaultValue: "pending"
  }

}, {
  // hooks: {
  //   beforeCreate(attributes, options) {
  //
  //     const issueUnitPrice = Number.parseInt(attributes.issueUnitPrice);
  //     console.log("issueUnitPrice", issueUnitPrice);
  //     attributes.totalPrice = attributes.issueUnitQuantity * issueUnitPrice;
  //   }
  // },
  sequelize,
  modelName: "Sale"
});

module.exports = Sale;
